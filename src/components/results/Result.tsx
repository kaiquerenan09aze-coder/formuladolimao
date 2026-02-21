import { UserData } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ResultProps {
  userData: UserData;
  onContinue: () => void;
}

interface HorizontalBarProps {
  title: string;
  labels: string[];
  percent: number;
  markerLabel: string;
}

const HorizontalBar = ({ title, labels, percent, markerLabel }: HorizontalBarProps) => (
  <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
    <p className="text-muted-foreground font-bold text-sm">{title}</p>
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div
        className="relative h-5 rounded-full overflow-hidden"
        style={{
          background:
            'linear-gradient(to right, hsl(0, 84%, 60%), hsl(48, 100%, 55%), hsl(82, 77%, 45%))',
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-forest shadow-lg transition-all duration-700"
          style={{ left: `${percent}%` }}
        />
      </div>
      <div className="relative h-6">
        <div
          className="absolute -translate-x-1/2 text-center"
          style={{ left: `${percent}%` }}
        >
          <span className="text-[10px] font-bold text-destructive uppercase whitespace-nowrap">
            ▲ {markerLabel}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Result = ({ userData, onContinue }: ResultProps) => {
  const heightInMeters = (userData.height || 165) / 100;
  const bmi = (userData.currentWeight || 70) / (heightInMeters * heightInMeters);

  const getBMILabel = (value: number) => {
    if (value < 18.5) return 'Abaixo do peso';
    if (value < 25) return 'Normal';
    if (value < 30) return 'Sobrepeso';
    if (value < 35) return 'Obesidade leve';
    return 'Obesidade';
  };

  // BMI percent on bar (15-40 range mapped to 0-100%)
  const bmiPercent = Math.min(Math.max(((bmi - 15) / 25) * 100, 5), 95);

  // Metabolism percentage based on age and activity level
  const getMetabolismPercent = () => {
    const age = Number(userData.age) || 35;
    const activity = userData.activityLevel;
    let base = 40;
    if (age >= 50) base = 22;
    else if (age >= 40) base = 30;
    else if (age >= 30) base = 38;
    if (activity === 'very-active') base += 15;
    else if (activity === 'moderate') base += 10;
    else if (activity === 'light') base += 5;
    return Math.min(Math.max(base, 15), 85);
  };

  const metabolismPercent = getMetabolismPercent();

  // Tendência de Acúmulo Corporal (based on BMI + targetArea)
  const getAcumuloPercent = () => {
    let base = 33;
    if (bmi >= 30) base = 75;
    else if (bmi >= 25) base = 55;
    else if (bmi >= 22) base = 40;
    const targetArea = String(userData.targetArea || '');
    if (targetArea.includes('full-body')) base += 10;
    if (targetArea.includes('belly') && targetArea.includes('thighs')) base += 5;
    return Math.min(Math.max(base, 10), 90);
  };

  // Índice de Resposta Metabólica (based on bodyType + activity + age)
  const getRespostaPercent = () => {
    const age = Number(userData.age) || 35;
    let base = 50;
    const bodyType = String(userData.bodyType || '');
    if (bodyType.includes('easy-gain')) base -= 15;
    if (bodyType.includes('no-energy')) base -= 10;
    if (bodyType.includes('plateau')) base -= 12;
    if (bodyType.includes('fluctuates')) base -= 8;
    if (bodyType.includes('hunger')) base -= 5;
    if (age >= 50) base -= 10;
    else if (age >= 40) base -= 5;
    const activity = userData.activityLevel;
    if (activity === 'very-active') base += 20;
    else if (activity === 'moderate') base += 12;
    else if (activity === 'light') base += 5;
    return Math.min(Math.max(base, 8), 92);
  };

  const getAgeLabel = () => {
    const age = Number(userData.age);
    if (!age) return '';
    return `${age}`;
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center">
      <div className="bg-forest w-full py-6 flex justify-center sticky top-0 z-10">
        <h1 className="text-primary-foreground text-xl font-display font-bold">
          FÓRMULA DO <span className="text-lime">LIMÃO</span> 🍋
        </h1>
      </div>

      <main className="w-full max-w-lg px-4 py-8 space-y-6">
        {/* Diagnóstico Personalizado */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-lime/15 px-4 py-2 rounded-full border border-lime/20 mb-4">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              📊 Diagnóstico Personalizado
            </span>
          </div>
          <h2 className="text-forest text-lg sm:text-xl font-display font-bold leading-tight">
            {userData.name ? `${userData.name}, a` : 'A'}nalisando suas respostas, vimos que hoje você está com{' '}
            <span className="text-primary">{userData.currentWeight || 70}kg</span>
            {getAgeLabel() && (
              <> e tem <span className="text-primary">{getAgeLabel()} anos</span></>
            )}.
          </h2>
        </div>

        {/* 1 - Metabolism Bar */}
        <HorizontalBar
          title={`1 - Seu metabolismo está operando em aproximadamente ${metabolismPercent}% da sua capacidade ideal:`}
          labels={['Muito Lento', 'Lento', 'Moderado', 'Ativo', 'Acelerado']}
          percent={metabolismPercent}
          markerLabel={`VOCÊ ESTÁ AQUI (${metabolismPercent}%)`}
        />

        {/* 2 - IMC */}
        <HorizontalBar
          title="2 - Seu Índice de Massa Corporal atual:"
          labels={['Abaixo', 'Normal', 'Sobrepeso', 'Obesidade']}
          percent={bmiPercent}
          markerLabel={`IMC ${bmi.toFixed(1)} — ${getBMILabel(bmi)}`}
        />

        {/* 3 - Tendência de Acúmulo Corporal */}
        <HorizontalBar
          title="3 - Tendência de Acúmulo Corporal:"
          labels={['Baixa', 'Moderada', 'Elevada']}
          percent={getAcumuloPercent()}
          markerLabel="VOCÊ ESTÁ AQUI"
        />

        {/* 4 - Índice de Resposta Metabólica */}
        <HorizontalBar
          title="4 - Índice de Resposta Metabólica:"
          labels={['Lenta', 'Instável', 'Equilibrada', 'Otimizada']}
          percent={getRespostaPercent()}
          markerLabel="VOCÊ ESTÁ AQUI"
        />

        <Button
          onClick={onContinue}
          className="w-full py-5 md:py-6 gradient-primary text-primary-foreground font-display font-bold text-sm sm:text-base md:text-xl shadow-button animate-bounce-subtle whitespace-normal leading-tight"
        >
          <span className="flex items-center justify-center gap-2 flex-wrap">
            QUERO DESTRAVAR MEU METABOLISMO <ArrowRight className="w-5 h-5 flex-shrink-0" />
          </span>
        </Button>
      </main>
    </div>
  );
};

export default Result;
