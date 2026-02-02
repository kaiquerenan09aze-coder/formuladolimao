import { QuizStep } from '@/types/quiz';

export const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: "Qual é o seu principal objetivo?",
    type: 'select',
    fieldName: 'weightGoal',
    options: [
      { label: "Perder peso rapidamente", value: "rapid", icon: "🔥" },
      { label: "Emagrecer de forma saudável", value: "healthy", icon: "🌿" },
      { label: "Definir o corpo", value: "define", icon: "💪" },
      { label: "Manter o peso atual", value: "maintain", icon: "⚖️" },
    ]
  },
  {
    id: 2,
    question: "Qual é a sua faixa etária?",
    type: 'select',
    fieldName: 'age',
    options: [
      { label: "18-29 anos", value: "18-29", icon: "🌟" },
      { label: "30-39 anos", value: "30-39", icon: "✨" },
      { label: "40-49 anos", value: "40-49", icon: "💫" },
      { label: "50+ anos", value: "50+", icon: "🌙" },
    ]
  },
  {
    id: 3,
    question: "Como você descreveria seu tipo de corpo atual?",
    type: 'select',
    fieldName: 'bodyType',
    options: [
      { label: "Tenho muita gordura acumulada", value: "high-fat", icon: "🔴" },
      { label: "Tenho gordura moderada", value: "moderate-fat", icon: "🟡" },
      { label: "Tenho pouca gordura", value: "low-fat", icon: "🟢" },
      { label: "Estou no peso ideal", value: "ideal", icon: "💚" },
    ]
  },
  {
    id: 4,
    question: "Qual área do corpo você mais deseja melhorar?",
    type: 'select',
    fieldName: 'targetArea',
    options: [
      { label: "Barriga e abdômen", value: "belly", icon: "🎯" },
      { label: "Coxas e quadril", value: "thighs", icon: "🦵" },
      { label: "Braços", value: "arms", icon: "💪" },
      { label: "Corpo inteiro", value: "full-body", icon: "🧍" },
    ]
  },
  {
    id: 5,
    question: "Qual é o seu nome?",
    type: 'input',
    fieldName: 'name',
    placeholder: "Digite seu nome"
  },
  {
    id: 6,
    question: "Como o excesso de peso afeta sua vida?",
    type: 'select',
    fieldName: 'lifeImpact',
    options: [
      { label: "Baixa autoestima", value: "self-esteem", icon: "😔" },
      { label: "Problemas de saúde", value: "health", icon: "🏥" },
      { label: "Falta de energia", value: "energy", icon: "😴" },
      { label: "Dificuldade com roupas", value: "clothes", icon: "👗" },
    ]
  },
  {
    id: 7,
    question: "O que já tentou para emagrecer?",
    type: 'select',
    fieldName: 'obstacle',
    options: [
      { label: "Dietas restritivas", value: "diets", icon: "🥗" },
      { label: "Exercícios intensos", value: "exercise", icon: "🏋️" },
      { label: "Remédios/Suplementos", value: "supplements", icon: "💊" },
      { label: "Nunca tentei seriamente", value: "never", icon: "🤷" },
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
    question: "Qual é a sua altura? (cm)",
    type: 'number',
    fieldName: 'height',
    placeholder: "Ex: 165"
  },
  {
    id: 10,
    question: "Qual peso você deseja alcançar? (kg)",
    type: 'number',
    fieldName: 'desiredWeight',
    placeholder: "Ex: 60"
  },
  {
    id: 11,
    question: "Qual é o seu nível de atividade física?",
    type: 'select',
    fieldName: 'activityLevel',
    options: [
      { label: "Sedentário(a)", value: "sedentary", icon: "🛋️" },
      { label: "Levemente ativo(a)", value: "light", icon: "🚶" },
      { label: "Moderadamente ativo(a)", value: "moderate", icon: "🏃" },
      { label: "Muito ativo(a)", value: "very-active", icon: "🏅" },
    ]
  },
];
