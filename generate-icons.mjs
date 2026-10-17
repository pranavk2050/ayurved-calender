// Generates minimal valid PNG files for PWA icons (solid amber square)
import { writeFileSync } from 'fs'
import { createHash } from 'crypto'

function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (const byte of buf) {
    crc ^= byte
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0)
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

function u32be(n) {
  const b = Buffer.alloc(4); b.writeUInt32BE(n); return b
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const lenBytes = u32be(data.length)
  const crcVal = crc32(Buffer.concat([typeBytes, data]))
  return Buffer.concat([lenBytes, typeBytes, data, u32be(crcVal)])
}

function deflateRaw(data) {
  // zlib with no compression (BTYPE=00)
  const blocks = []
  for (let i = 0; i < data.length; i += 65535) {
    const slice = data.slice(i, i + 65535)
    const last = i + 65535 >= data.length ? 1 : 0
    const hdr = Buffer.alloc(5)
    hdr[0] = last
    hdr.writeUInt16LE(slice.length, 1)
    hdr.writeUInt16LE(~slice.length & 0xFFFF, 3)
    blocks.push(hdr, slice)
  }
  const raw = Buffer.concat(blocks)
  // adler32
  let s1 = 1, s2 = 0
  for (const b of data) { s1 = (s1 + b) % 65521; s2 = (s2 + s1) % 65521 }
  const adler = Buffer.alloc(4); adler.writeUInt32BE((s2 << 16) | s1)
  return Buffer.concat([Buffer.from([0x78, 0x01]), raw, adler])
}

function makePng(size, r, g, b) {
  const sig = Buffer.from([137,80,78,71,13,10,26,10])

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // color type: RGB
  // compression, filter, interlace = 0

  // Image data: each row prefixed with filter byte 0
  const rowSize = size * 3
  const raw = Buffer.alloc(size * (rowSize + 1))
  for (let y = 0; y < size; y++) {
    raw[y * (rowSize + 1)] = 0 // filter none
    for (let x = 0; x < size; x++) {
      const off = y * (rowSize + 1) + 1 + x * 3
      raw[off] = r; raw[off+1] = g; raw[off+2] = b
    }
  }

  const idat = deflateRaw(raw)

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// Amber: #f59e0b → rgb(245, 158, 11)
writeFileSync('public/pwa-192.png', makePng(192, 245, 158, 11))
writeFileSync('public/pwa-512.png', makePng(512, 245, 158, 11))
console.log('Icons written: public/pwa-192.png, public/pwa-512.png')
