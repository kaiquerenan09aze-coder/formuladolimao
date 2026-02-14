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

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center">
      <div className="bg-forest w-full py-6 flex justify-center sticky top-0 z-10">
        <h1 className="text-primary-foreground text-xl font-display font-bold">
          FÓRMULA DO <span className="text-lime">LIMÃO</span> 🍋
        </h1>
      </div>

      <main className="w-full max-w-lg px-4 py-8 space-y-6">
        {/* Diagnóstico */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-lime/15 px-4 py-2 rounded-full border border-lime/20 mb-4">
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              🔎 Análise concluída
            </span>
          </div>
          <h2 className="text-forest text-xl sm:text-2xl font-display font-bold leading-tight">
            Com base nas suas respostas, identificamos indícios de que seu metabolismo pode estar mais lento do que o ideal.
          </h2>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Seu corpo pode estar em um <span className="text-destructive font-bold">"estado de estocagem"</span>, acumulando gordura mais rápido do que deveria — principalmente na região abdominal.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Isso <span className="font-bold">não significa falta de esforço</span>. Significa que seu metabolismo pode não estar recebendo os estímulos corretos para o momento que você vive hoje.
          </p>
        </div>

        {/* Mini Relatório */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card text-center space-y-4">
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
            📊 Seu índice corporal atual:
          </p>
          <BMIChart bmi={bmi} />
          <div className="pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Classificação: <span className="font-bold">{getBMILabel(bmi)}</span>
            </p>
          </div>
        </div>

        <div className="bg-gold/10 border-2 border-gold/30 rounded-3xl p-6 text-center space-y-3">
          <p className="text-gold-dark/80 text-sm">
            Se nada for ajustado, a tendência é que o peso continue aumentando gradualmente nas próximas semanas.
          </p>
          <p className="text-gold-dark font-bold text-sm">
            Mas a boa notícia é: <span className="text-primary">isso pode ser revertido.</span>
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
