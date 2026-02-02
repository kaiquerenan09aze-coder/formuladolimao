import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CalculatingScreenProps {
  userName: string;
  onComplete: () => void;
}

const loadingSteps = [
  { text: "Analisando seu perfil...", duration: 1500 },
  { text: "Calculando seu IMC...", duration: 1500 },
  { text: "Criando plano personalizado...", duration: 1500 },
  { text: "Preparando suas recomendações...", duration: 1000 },
];

const CalculatingScreen = ({ userName, onComplete }: CalculatingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let totalTime = 0;
    const totalDuration = loadingSteps.reduce((acc, step) => acc + step.duration, 0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
        }
        return Math.min(newProgress, 100);
      });
    }, totalDuration / 100);

    loadingSteps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, totalTime);
      totalTime += step.duration;
    });

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated Lemon Icon */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto relative animate-float">
            <div className="absolute inset-0 gradient-primary rounded-full opacity-20 animate-pulse-soft" />
            <div className="absolute inset-2 bg-lime rounded-full flex items-center justify-center">
              <span className="text-6xl">🍋</span>
            </div>
          </div>
          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold rounded-full" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-forest mb-2">
          Aguarde, {userName || 'visitante'}!
        </h2>
        <p className="text-muted-foreground mb-8">
          Estamos preparando seu plano personalizado
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-primary mt-2">{progress}%</p>
        </div>

        {/* Current step */}
        <div className="h-8">
          {loadingSteps.map((step, index) => (
            <p
              key={index}
              className={cn(
                "text-muted-foreground transition-all duration-300",
                currentStep === index ? "opacity-100" : "opacity-0 absolute"
              )}
            >
              {step.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatingScreen;
