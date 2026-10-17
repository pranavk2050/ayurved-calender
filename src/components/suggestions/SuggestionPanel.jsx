import React, { useState } from 'react'
import { SUGGESTIONS } from '../../data/suggestions'
import { DOSHAS } from '../../data/doshas'
import FoodGrid from './FoodGrid'
import RoutineList from './RoutineList'
import PracticeCard from './PracticeCard'

const TABS = [
  { id: 'diet', label: '🥗 Diet' },
  { id: 'routine', label: '🌅 Routine' },
  { id: 'yoga', label: '🧘 Yoga' },
  { id: 'mindfulness', label: '🕊 Mind' },
]

export default function SuggestionPanel({ doshaId }) {
  const [activeTab, setActiveTab] = useState('diet')
  const data = SUGGESTIONS[doshaId]
  const dosha = DOSHAS[doshaId]
  if (!data) return null

  return (
    <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex border-b border-stone-100">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 text-stone-800'
                : 'text-stone-400 hover:text-stone-600'
            }`}
            style={activeTab === tab.id ? { borderColor: dosha.color } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'diet' && <FoodGrid diet={data.diet} doshaColor={dosha.color} />}
        {activeTab === 'routine' && <RoutineList routine={data.routine} doshaColor={dosha.color} />}
        {activeTab === 'yoga' && <PracticeCard type="yoga" data={data.yoga} doshaColor={dosha.color} />}
        {activeTab === 'mindfulness' && <PracticeCard type="mindfulness" data={data.mindfulness} doshaColor={dosha.color} />}
      </div>
    </div>
  )
}
