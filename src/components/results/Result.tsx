import { UserData } from '@/types/quiz';
import BMIChart from './BMIChart';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ResultProps {
  userData: UserData;
  onContinue: () => void;
}

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

  // Calculate metabolism percentage based on age and activity level
  const getMetabolismPercent = () => {
    const age = userData.age;
    const activity = userData.activityLevel;
    let base = 40;
    if (age === '50+') base = 22;
    else if (age === '40-49') base = 30;
    else if (age === '30-39') base = 38;
    if (activity === 'very-active') base += 15;
    else if (activity === 'moderate') base += 10;
    else if (activity === 'light') base += 5;
    return Math.min(Math.max(base, 15), 85);
  };

  const metabolismPercent = getMetabolismPercent();

  const getMetabolismLabel = (pct: number) => {
    if (pct < 25) return 'MUITO LENTO';
    if (pct < 40) return 'LENTO';
    if (pct < 55) return 'MODERADO';
    if (pct < 70) return 'ATIVO';
    return 'ACELERADO';
  };

  const getAgeLabel = () => {
    const age = userData.age;
    if (age === '30-39') return '30–39';
    if (age === '40-49') return '40–49';
    if (age === '50+') return '50+';
    return '';
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
              <> aos <span className="text-primary">{getAgeLabel()} anos</span></>
            )}.
          </h2>
        </div>

        {/* 1 - Metabolism Bar */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
          <p className="text-muted-foreground font-bold text-sm">
            1 - Seu metabolismo está operando em aproximadamente <span className="text-primary font-bold">{metabolismPercent}%</span> da sua capacidade ideal:
          </p>
          
          <div className="space-y-2">
            {/* Labels */}
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
              <span>Muito Lento</span>
              <span>Lento</span>
              <span>Moderado</span>
              <span>Ativo</span>
              <span>Acelerado</span>
            </div>
            {/* Bar */}
            <div className="relative h-5 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, hsl(0, 84%, 60%), hsl(48, 100%, 55%), hsl(82, 77%, 45%))' }}>
              {/* Indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-forest shadow-lg transition-all duration-700"
                style={{ left: `${metabolismPercent}%` }}
              />
            </div>
            {/* You are here label */}
            <div className="relative h-6">
              <div 
                className="absolute -translate-x-1/2 text-center"
                style={{ left: `${metabolismPercent}%` }}
              >
                <span className="text-[10px] font-bold text-destructive uppercase whitespace-nowrap">
                  ▲ VOCÊ ESTÁ AQUI ({metabolismPercent}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 - IMC */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card text-center space-y-4">
          <p className="text-muted-foreground font-bold text-sm">
            2 - Seu Índice de Massa Corporal atual:
          </p>
          <BMIChart bmi={bmi} />
          <div className="pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Classificação: <span className="font-bold">{getBMILabel(bmi)}</span>
            </p>
          </div>
        </div>

        {/* Solution Block */}
        <div className="bg-primary/15 border-2 border-primary/30 rounded-3xl p-6 text-center space-y-3">
          <p className="text-primary font-display font-bold text-lg sm:text-xl">
            Mas isso tem solução.
          </p>
          <p className="text-foreground font-bold text-sm">
            Você precisa ativar o <span className="text-primary">Protocolo de Reativação Metabólica Feminina</span>:
          </p>
        </div>

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
