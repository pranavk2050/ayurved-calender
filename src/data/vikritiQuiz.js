// Vikriti = current state of imbalance (vs Prakriti = birth constitution).
// Questions are symptom-based ("how have you felt in the last 2–4 weeks").

export const VIKRITI_QUESTIONS = [
  {
    id: 'v1',
    category: 'Digestion',
    question: 'Over the last 2–4 weeks, my digestion has been...',
    options: [
      { label: 'Irregular — bloating, gas, or constipation', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Overactive — acid, heartburn, loose stools', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Slow and heavy — feeling full for a long time', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v2',
    category: 'Energy',
    question: 'My energy levels recently have been...',
    options: [
      { label: 'Erratic — bursts of energy followed by exhaustion', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Intense but burning out — I push too hard', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Low and heavy — hard to get motivated', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v3',
    category: 'Sleep',
    question: 'My sleep over the last few weeks has been...',
    options: [
      { label: 'Disturbed — light, interrupted, or anxious dreams', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Restless — hot, vivid dreams, waking 1–3am', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Excessive — sleeping too much, hard to wake', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v4',
    category: 'Emotions',
    question: 'My dominant emotional state recently has been...',
    options: [
      { label: 'Anxious, worried, or scattered', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Irritable, frustrated, or critical', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Withdrawn, sad, or unmotivated', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v5',
    category: 'Skin',
    question: 'My skin recently has been...',
    options: [
      { label: 'Dry, flaky, or rough', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Red, inflamed, or breaking out', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Oily, congested, or pale', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v6',
    category: 'Mind',
    question: 'My mental clarity recently has been...',
    options: [
      { label: 'Scattered — hard to focus, mind races', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Sharp but obsessive — over-analysing', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Foggy, slow, or dull', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v7',
    category: 'Appetite',
    question: 'My appetite recently has been...',
    options: [
      { label: 'Variable — sometimes very hungry, sometimes none', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Intense — very hungry, irritable if I skip meals', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Low — I have to remind myself to eat', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v8',
    category: 'Body',
    question: 'Physically, I have recently been experiencing...',
    options: [
      { label: 'Joint stiffness, dryness, cold hands/feet', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Heat, inflammation, or burning sensations', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Heaviness, congestion, or swelling', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v9',
    category: 'Stress Response',
    question: 'When I face stress or pressure, I tend to...',
    options: [
      { label: 'Freeze, become indecisive, or feel overwhelmed', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'React sharply or become controlling', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Shut down, withdraw, or comfort eat', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v10',
    category: 'Voice & Throat',
    question: 'My voice and throat recently have been...',
    options: [
      { label: 'Dry, hoarse, or cracking', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Sore, inflamed, or sharp', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Congested, mucousy, or muffled', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v11',
    category: 'Thirst',
    question: 'My thirst recently has been...',
    options: [
      { label: 'Variable and often forgetting to drink', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'High — I feel hot and thirsty often', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Low — I rarely feel thirsty', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'v12',
    category: 'Overall',
    question: 'Overall, the word that best describes how I have felt recently is...',
    options: [
      { label: 'Ungrounded — restless, unsteady, or fearful', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Overheated — intense, reactive, or impatient', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Stagnant — heavy, slow, or stuck', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
]

export function scoreVikriti(answers) {
  const totals = { VATA: 0, PITTA: 0, KAPHA: 0 }
  for (const [questionId, optionIndex] of Object.entries(answers)) {
    const question = VIKRITI_QUESTIONS.find((q) => q.id === questionId)
    if (!question) continue
    const option = question.options[optionIndex]
    if (!option) continue
    totals.VATA += option.scores.VATA
    totals.PITTA += option.scores.PITTA
    totals.KAPHA += option.scores.KAPHA
  }
  const total = totals.VATA + totals.PITTA + totals.KAPHA
  if (total === 0) return { VATA: 33, PITTA: 33, KAPHA: 34 }
  return {
    VATA: Math.round((totals.VATA / total) * 100),
    PITTA: Math.round((totals.PITTA / total) * 100),
    KAPHA: Math.round((totals.KAPHA / total) * 100),
  }
}

export function dominantVikriti(vikriti) {
  return Object.entries(vikriti).sort((a, b) => b[1] - a[1])[0][0]
}
