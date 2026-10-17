import React from 'react'

export default function FoodGrid({ diet, doshaColor }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Favour</h3>
        <div className="flex flex-wrap gap-1.5">
          {diet.favor.map((food) => (
            <span key={food} className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
              ✓ {food}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">Reduce / Avoid</h3>
        <div className="flex flex-wrap gap-1.5">
          {diet.avoid.map((food) => (
            <span key={food} className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
              ✗ {food}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
        <p className="text-xs text-amber-800"><strong>Timing:</strong> {diet.timing}</p>
        <p className="text-xs text-amber-700 mt-1"><strong>Main meal:</strong> {diet.mainMeal}</p>
      </div>
    </div>
  )
}
