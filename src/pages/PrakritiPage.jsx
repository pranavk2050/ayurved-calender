import React, { useState } from 'react'
import useAppStore from '../store/useAppStore'
import PrakritiQuiz from '../components/prakriti/PrakritiQuiz'
import PrakritiResult from '../components/prakriti/PrakritiResult'
import VikritiQuiz from '../components/prakriti/VikritiQuiz'
import VikritiResult from '../components/prakriti/VikritiResult'

const TABS = [
  {
    id: 'prakriti',
    label: 'Prakriti',
    sublabel: 'Birth constitution',
    description: 'Your Prakriti is your fixed, lifelong Ayurvedic constitution — determined at conception. It explains your natural tendencies and the doshas you are inherently prone to.',
  },
  {
    id: 'vikriti',
    label: 'Vikriti',
    sublabel: 'Current imbalance',
    description: 'Vikriti is your current state of imbalance — how you feel right now, over the last 2–4 weeks. It changes with seasons, stress, diet, and lifestyle. Reassess it regularly.',
  },
]

export default function PrakritiPage() {
  const [activeTab, setActiveTab] = useState('prakriti')
  const prakritiComplete = useAppStore((s) => s.prakritiComplete)
  const vikritiComplete = useAppStore((s) => s.vikritiComplete)

  const tab = TABS.find((t) => t.id === activeTab)

  return (
    <div>
      <h1 className="text-xl font-semibold text-stone-800 mb-1">Constitution & Balance</h1>
      <p className="text-sm text-stone-500 mb-5">
        Two assessments — your permanent constitution (Prakriti) and your current imbalance (Vikriti).
        Together they personalise your dosha guidance.
      </p>

      {/* Tab switcher */}
      <div className="flex rounded-xl border border-stone-200 bg-stone-50 p-1 mb-6 max-w-sm">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              activeTab === t.id
                ? 'bg-white shadow text-stone-800'
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <span>{t.label}</span>
            {((t.id === 'prakriti' && prakritiComplete) || (t.id === 'vikriti' && vikritiComplete)) && (
              <span className="ml-1.5 text-xs text-green-500">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab description */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 mb-6 text-sm text-amber-800 leading-relaxed">
        <strong>{tab.sublabel}:</strong> {tab.description}
      </div>

      {/* Tab content */}
      {activeTab === 'prakriti' && (
        prakritiComplete ? <PrakritiResult /> : <PrakritiQuiz />
      )}
      {activeTab === 'vikriti' && (
        vikritiComplete ? <VikritiResult /> : <VikritiQuiz onDone={() => {}} />
      )}
    </div>
  )
}
