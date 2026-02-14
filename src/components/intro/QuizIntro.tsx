import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro = ({ onStart }: QuizIntroProps) => {
  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-forest pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-glow/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-lg text-center space-y-8 animate-fade-in">
        {/* Brand */}
        <div className="mb-12">
          <h1 className="text-primary-foreground text-2xl font-display font-bold tracking-tight">
            FÓRMULA DO <span className="text-lime-glow">LIMÃO</span> 🍋
          </h1>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h2 className="text-primary-foreground text-2xl md:text-3xl font-display font-bold leading-tight">
            Se você sente que seu corpo não responde mais como antes…
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            mesmo tentando se cuidar…
          </p>
          <p className="text-lime-glow text-lg font-bold leading-relaxed">
            isso pode não ser falta de força de vontade.
          </p>
        </div>

        {/* Subheadline */}
        <div className="space-y-3">
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Descubra em 2 minutos o que pode estar travando seu metabolismo hoje.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-6">
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
            👉 Quero Entender Meu Corpo
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
