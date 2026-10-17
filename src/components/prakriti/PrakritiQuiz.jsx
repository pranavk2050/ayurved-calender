import React, { useState } from 'react'
import { PRAKRITI_QUESTIONS, scorePrakriti } from '../../data/prakritiQuiz'
import useAppStore from '../../store/useAppStore'

export default function PrakritiQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const setPrakriti = useAppStore((s) => s.setPrakriti)

  const question = PRAKRITI_QUESTIONS[step]
  const totalSteps = PRAKRITI_QUESTIONS.length
  const progress = Math.round((step / totalSteps) * 100)

  function selectOption(optionIndex) {
    const newAnswers = { ...answers, [question.id]: optionIndex }
    setAnswers(newAnswers)
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      setPrakriti(scorePrakriti(newAnswers))
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-stone-400 mb-1">
          <span>{question.category}</span>
          <span>{step + 1} / {totalSteps}</span>
        </div>
        <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-stone-800 mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => selectOption(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all hover:border-amber-400 hover:bg-amber-50 ${
              answers[question.id] === i ? 'border-amber-500 bg-amber-50' : 'border-stone-200 bg-white'
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
