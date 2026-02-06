import { UserData } from '@/types/quiz';
import BMIChart from './BMIChart';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';

interface ResultProps {
  userData: UserData;
  onContinue: () => void;
}

const Result = ({ userData, onContinue }: ResultProps) => {
  const heightInMeters = (userData.height || 165) / 100;
  const bmi = (userData.currentWeight || 70) / (heightInMeters * heightInMeters);

  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center">
      <div className="bg-forest w-full py-6 flex justify-center sticky top-0 z-10">
        <h1 className="text-primary-foreground text-xl font-display font-bold">
          FÓRMULA DO <span className="text-lime">LIMÃO</span> 🍋
        </h1>
      </div>

      <main className="w-full max-w-lg px-4 py-8 space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-forest text-2xl font-display font-bold leading-tight">
            {userData.name}, veja como a Fórmula do Limão está transformando vidas!
          </h2>
        </div>

        <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-xl flex items-start gap-4">
          <AlertTriangle className="text-destructive w-5 h-5 mt-1 flex-shrink-0" />
          <div>
            <p className="text-destructive font-bold uppercase text-sm">
              Alerta: Metabolismo Lento Detectado
            </p>
          </div>
        </div>

        <div className="bg-card rounded-3xl p-8 shadow-card text-center space-y-4">
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
            Seu Índice Corporal Atual:
          </p>
          <BMIChart bmi={bmi} />
          <div className="pt-4 border-t border-border">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Seu corpo entrou em{' '}
              <span className="text-destructive font-bold">"Estado de Estocagem"</span>. 
              Infelizmente, isso significa que você acumula gordura 3x mais rápido que uma 
              pessoa normal, principalmente na barriga.
            </p>
          </div>
        </div>

        <div className="bg-gold/10 border-2 border-gold/30 rounded-3xl p-6 text-center space-y-3">
          <p className="text-gold-dark font-bold">⚠️ O que isso significa?</p>
          <p className="text-gold-dark/80 text-sm">
            Se nada for feito HOJE, a tendência é você ganhar mais{' '}
            <span className="font-bold">4 a 6kg</span> nas próximas semanas.
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
