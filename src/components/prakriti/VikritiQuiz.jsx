import React, { useState } from 'react'
import { VIKRITI_QUESTIONS, scoreVikriti } from '../../data/vikritiQuiz'
import useAppStore from '../../store/useAppStore'

export default function VikritiQuiz({ onDone }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const setVikriti = useAppStore((s) => s.setVikriti)

  const question = VIKRITI_QUESTIONS[step]
  const totalSteps = VIKRITI_QUESTIONS.length
  const progress = Math.round((step / totalSteps) * 100)

  function selectOption(optionIndex) {
    const newAnswers = { ...answers, [question.id]: optionIndex }
    setAnswers(newAnswers)
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      setVikriti(scoreVikriti(newAnswers))
      onDone?.()
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
          Vikriti · Current State
        </span>
        <span className="text-xs text-stone-400">{step + 1} / {totalSteps}</span>
      </div>

      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-orange-400 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="text-xl font-semibold text-stone-800 mb-1">{question.question}</h2>
      <p className="text-xs text-stone-400 mb-5 italic">Think about how you've felt in the last 2–4 weeks</p>

      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => selectOption(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all hover:border-orange-400 hover:bg-orange-50 ${
              answers[question.id] === i ? 'border-orange-500 bg-orange-50' : 'border-stone-200 bg-white'
            }`}
          >
            <span className="text-sm text-stone-700">{option.label}</span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 text-sm text-stone-400 hover:text-stone-600"
        >
          ← Back
        </button>
      )}
    </div>
  )
}
