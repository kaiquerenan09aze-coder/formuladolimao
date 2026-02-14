import { QuizStep } from '@/types/quiz';

export const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: "Você sente que emagrecer ficou mais difícil depois dos 30?",
    type: 'select',
    fieldName: 'weightGoal',
    options: [
      { label: "Sim, muito mais difícil", value: "much-harder", icon: "😔" },
      { label: "Um pouco mais difícil", value: "little-harder", icon: "😕" },
      { label: "Não sei dizer", value: "unsure", icon: "🤔" },
      { label: "Não", value: "no", icon: "❌" },
    ]
  },
  {
    id: 2,
    question: "Você já pensou que o problema era falta de disciplina?",
    type: 'select',
    fieldName: 'satisfaction',
    options: [
      { label: "Sim, já me culpei por isso", value: "blamed-myself", icon: "😞" },
      { label: "Muitas vezes", value: "many-times", icon: "😔" },
      { label: "Talvez", value: "maybe", icon: "🤷" },
      { label: "Não", value: "no", icon: "❌" },
    ]
  },
  {
    id: 3,
    question: "Qual dessas situações mais parece com você hoje?",
    type: 'select',
    fieldName: 'bodyType',
    options: [
      { label: "Ganho peso fácil, mesmo comendo pouco", value: "easy-gain", icon: "🍞" },
      { label: "Me sinto sem energia a maior parte do tempo", value: "no-energy", icon: "😴" },
      { label: "Emagreci antes, mas agora não consigo mais", value: "plateau", icon: "📉" },
      { label: "Meu peso oscila constantemente", value: "fluctuates", icon: "⚖️" },
    ]
  },
  {
    id: 4,
    question: "Qual é sua faixa etária?",
    type: 'select',
    fieldName: 'age',
    options: [
      { label: "30–39 anos", value: "30-39", icon: "✨" },
      { label: "40–49 anos", value: "40-49", icon: "💫" },
      { label: "50+ anos", value: "50+", icon: "🌙" },
    ]
  },
  {
    id: 5,
    question: "Como isso afeta sua vida hoje?",
    type: 'select',
    fieldName: 'lifeImpact',
    options: [
      { label: "Autoestima", value: "self-esteem", icon: "😔" },
      { label: "Roupas não servem mais", value: "clothes", icon: "👗" },
      { label: "Cansaço constante", value: "fatigue", icon: "😴" },
      { label: "Preocupação com saúde", value: "health", icon: "🏥" },
    ]
  },
  {
    id: 6,
    question: "O que você já tentou para emagrecer?",
    type: 'select',
    fieldName: 'obstacle',
    options: [
      { label: "Dietas restritivas", value: "diets", icon: "🥗" },
      { label: "Exercícios intensos", value: "exercise", icon: "🏋️" },
      { label: "Suplementos", value: "supplements", icon: "💊" },
      { label: "Já tentei de tudo e nada funciona", value: "everything", icon: "🤷" },
    ]
  },
  {
    id: 7,
    question: "Onde você mais acumula gordura?",
    type: 'select',
    fieldName: 'targetArea',
    options: [
      { label: "Barriga", value: "belly", icon: "🎯" },
      { label: "Coxas/quadril", value: "thighs", icon: "🦵" },
      { label: "Braços", value: "arms", icon: "💪" },
      { label: "Corpo todo", value: "full-body", icon: "🧍" },
    ]
  },
  {
    id: 8,
    question: "Qual é o seu peso atual? (kg)",
    type: 'number',
    fieldName: 'currentWeight',
    placeholder: "Ex: 75"
  },
  {
    id: 9,
    question: "Qual é sua altura? (cm)",
    type: 'number',
    fieldName: 'height',
    placeholder: "Ex: 165"
  },
  {
    id: 10,
    question: "Qual peso você gostaria de alcançar? (kg)",
    type: 'number',
    fieldName: 'desiredWeight',
    placeholder: "Ex: 60"
  },
  {
    id: 11,
    question: "Qual é seu nível de atividade física?",
    type: 'select',
    fieldName: 'activityLevel',
    options: [
      { label: "Sedentária", value: "sedentary", icon: "🛋️" },
      { label: "Levemente ativa", value: "light", icon: "🚶" },
      { label: "Moderadamente ativa", value: "moderate", icon: "🏃" },
      { label: "Muito ativa", value: "very-active", icon: "🏅" },
    ]
  },
];
