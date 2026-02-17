import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizIntroProps {
  onStart: () => void;
}

const symptoms = [
  "Fome descontrolada.",
  "Intestino preso.",
  "Inchaço todo dia.",
  "Cansaço constante.",
  "Dificuldade para emagrecer.",
];

const QuizIntro = ({ onStart }: QuizIntroProps) => {
  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-forest pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-glow/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-lg text-center space-y-8 animate-fade-in">

        {/* Symptom Checklist */}
        <div className="space-y-3 flex flex-col items-center">
          {symptoms.map((symptom, index) => (
            <div
              key={symptom}
              className="flex items-center gap-3 animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 180}ms`, animationFillMode: 'forwards' }}
            >
              <CheckCircle2 className="w-7 h-7 text-lime-glow flex-shrink-0" fill="currentColor" strokeWidth={0} />
              <span className="text-primary-foreground font-display font-bold text-lg sm:text-xl">
                {symptom}
              </span>
            </div>
          ))}
        </div>

        {/* Main Headline */}
        <div className="space-y-2">
          <h2 className="text-primary-foreground text-3xl md:text-4xl font-display font-bold leading-tight">
            Seu corpo pode estar
          </h2>
          <h2 className="text-lime-glow text-3xl md:text-4xl font-display font-bold leading-tight">
            em outro ritmo.
          </h2>
          <p className="text-primary-foreground/80 text-base mt-2">
            Descubra o que está travando hoje.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Button
            onClick={onStart}
            className={cn(
              "w-full py-7 px-8 rounded-2xl",
              "bg-gradient-to-r from-lime to-lime-glow",
              "text-forest font-display font-bold text-xl uppercase tracking-wide",
              "shadow-button hover:shadow-glow transition-all duration-300",
              "hover:scale-[1.02] active:scale-[0.98]"
            )}
          >
            🍋 Quero Entender Meu Corpo
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          {/* Trust badge - below button */}
          <div className="mt-4 flex items-center justify-center gap-2 text-primary-foreground/40 text-xs">
            <Lock className="w-3 h-3 text-gold" />
            <span>Suas informações estão 100% seguras</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-primary-foreground/30 text-xs">
          © 2025 Fórmula do Limão. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default QuizIntro;
