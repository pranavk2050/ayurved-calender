// 20-question Prakriti assessment. Each option scores V/P/K points.
// Final result is { VATA: 0-40, PITTA: 0-40, KAPHA: 0-40 } normalized to %.

export const PRAKRITI_QUESTIONS = [
  {
    id: 'q1',
    category: 'Body Frame',
    question: 'My natural body frame is...',
    options: [
      { label: 'Thin and lean — I find it hard to gain weight', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Medium and muscular — moderate build', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Large or stocky — I gain weight easily', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q2',
    category: 'Skin',
    question: 'My skin tends to be...',
    options: [
      { label: 'Dry, rough, or thin — prone to cracking', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Warm, reddish, or prone to rashes and acne', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Thick, smooth, oily — soft and moist', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q3',
    category: 'Hair',
    question: 'My hair is naturally...',
    options: [
      { label: 'Dry, frizzy, or thin — prone to split ends', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Fine, straight, oily — prone to early greying', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Thick, wavy, lustrous — tends to be oily', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q4',
    category: 'Digestion',
    question: 'My digestion is typically...',
    options: [
      { label: 'Irregular — sometimes great, sometimes poor. Gas and bloating', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Strong — I get very hungry and irritable if I miss a meal', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Slow but steady — I can skip meals without much discomfort', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q5',
    category: 'Hunger',
    question: 'My appetite is...',
    options: [
      { label: 'Variable — sometimes very hungry, sometimes not at all', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Strong and consistent — I must eat on time', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Mild — I can often go without eating for long periods', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q6',
    category: 'Sleep',
    question: 'My sleep is usually...',
    options: [
      { label: 'Light and interrupted — I wake easily and have vivid dreams', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Moderate — I sleep well but wake refreshed after 6–7 hours', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Deep and long — hard to wake up, love to sleep', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q7',
    category: 'Energy',
    question: 'My energy throughout the day is...',
    options: [
      { label: 'In bursts — high then suddenly depleted', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Moderate and purposeful — I work intensely', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Slow to start but sustained — I have great stamina', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q8',
    category: 'Temperature Preference',
    question: 'I prefer environments that are...',
    options: [
      { label: 'Warm — I dislike cold and wind', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Cool — I dislike heat and feel best in temperate climates', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Warm and dry — I dislike cold and damp', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q9',
    category: 'Mind / Thinking',
    question: 'My mind tends to be...',
    options: [
      { label: 'Quick, creative, imaginative — many ideas but hard to focus', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Sharp, analytical, and decisive — I like problem-solving', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Steady and methodical — I think slowly but remember everything', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q10',
    category: 'Memory',
    question: 'My memory works like this...',
    options: [
      { label: 'Quick to learn, quick to forget', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Accurate and detail-oriented', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Slow to learn but retains information long-term', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q11',
    category: 'Speech',
    question: 'My speaking style is...',
    options: [
      { label: 'Fast, talkative, and enthusiastic — I jump between topics', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Clear, precise, and persuasive — I get to the point', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Slow, deliberate, and melodic — I think before speaking', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q12',
    category: 'Emotions Under Stress',
    question: 'When stressed, I tend to feel...',
    options: [
      { label: 'Anxious, fearful, or overwhelmed', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Irritable, angry, or critical', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Withdrawn, sad, or resistant to change', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q13',
    category: 'Relationships',
    question: 'In relationships, I am typically...',
    options: [
      { label: 'Enthusiastic and changeable — lots of friends, not always deep', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Loyal but intense — high standards for myself and others', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Devoted and nurturing — I form deep, long-lasting bonds', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q14',
    category: 'Exercise Tolerance',
    question: 'My exercise tolerance is...',
    options: [
      { label: 'Low — I tire quickly but love variety and movement', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Moderate — competitive and goal-oriented', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'High — slow to start but great endurance once moving', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q15',
    category: 'Weather Sensitivity',
    question: 'My health is most affected by...',
    options: [
      { label: 'Cold, dry, or windy weather', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Hot, humid weather or intense sunlight', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Cold, damp, or cloudy weather', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q16',
    category: 'Bowel Movement',
    question: 'My bowel habits are typically...',
    options: [
      { label: 'Irregular, hard, or constipated', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Regular, loose, or prone to diarrhea when stressed', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Slow, bulky, and regular — once a day in the morning', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q17',
    category: 'Decision Making',
    question: 'When making decisions, I...',
    options: [
      { label: 'Change my mind frequently — hard to commit', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Decide quickly and confidently', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Take my time but stick with my decision once made', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q18',
    category: 'Finances',
    question: 'With money, I tend to...',
    options: [
      { label: 'Spend impulsively on experiences and variety', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Spend on quality and status items', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Save carefully — I am cautious with spending', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q19',
    category: 'Learning Style',
    question: 'I learn best by...',
    options: [
      { label: 'Listening, discussing, moving around', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Reading, researching, and analysing', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Practice and repetition — I learn by doing', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
  {
    id: 'q20',
    category: 'Physical Features',
    question: 'My joints and physical structure are...',
    options: [
      { label: 'Prominent, crackling — thin layer of flesh over bones', scores: { VATA: 2, PITTA: 0, KAPHA: 0 } },
      { label: 'Moderate — neither prominent nor padded', scores: { VATA: 0, PITTA: 2, KAPHA: 0 } },
      { label: 'Well-padded, large, and sturdy', scores: { VATA: 0, PITTA: 0, KAPHA: 2 } },
    ],
  },
]

export function scorePrakriti(answers) {
  const totals = { VATA: 0, PITTA: 0, KAPHA: 0 }
  for (const [questionId, optionIndex] of Object.entries(answers)) {
    const question = PRAKRITI_QUESTIONS.find((q) => q.id === questionId)
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

export function dominantDosha(prakriti) {
  return Object.entries(prakriti).sort((a, b) => b[1] - a[1])[0][0]
}
