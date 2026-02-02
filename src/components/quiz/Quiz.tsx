import { useState } from 'react';
import { quizSteps } from '@/data/quizSteps';
import { UserData } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';

interface QuizProps {
  onComplete: (data: UserData) => void;
}

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const [inputValue, setInputValue] = useState("");

  const step = quizSteps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / quizSteps.length) * 100;

  const handleNext = (value: string | number) => {
    const updatedData = { ...userData, [step.fieldName]: value };
    setUserData(updatedData);
    setInputValue("");
    
    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(updatedData);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center p-4">
      {/* Header */}
      <div className="w-full max-w-lg mb-8">
        <div className="flex justify-center mb-6">
          <h1 className="text-primary-foreground text-2xl font-display font-bold tracking-tight">
            FÓRMULA DO <span className="text-lime">LIMÃO</span> 🍋
          </h1>
        </div>
        <div className="w-full bg-forest/50 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-lime transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-primary-foreground/60 text-sm mt-2">
          Pergunta {currentStepIndex + 1} de {quizSteps.length}
        </p>
      </div>

      <div className="w-full max-w-lg animate-fade-in flex-1">
        <h2 className="text-primary-foreground text-2xl md:text-3xl font-display font-bold text-center mb-8">
          {step.question}
        </h2>

        {step.type === 'select' && (
          <div className="space-y-4">
            {step.options?.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleNext(opt.value)}
                className={cn(
                  "w-full bg-card p-5 rounded-2xl flex items-center justify-between",
                  "group hover:bg-lime-light transition-colors border-b-4 border-border"
                )}
              >
                <div className="flex items-center gap-4">
                  {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                  <span className="text-foreground font-bold text-lg">{opt.label}</span>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center group-hover:border-primary">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>
        )}

        {(step.type === 'input' || step.type === 'number') && (
          <div className="space-y-6">
            <input 
              type={step.type === 'number' ? 'number' : 'text'}
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={step.placeholder}
              className={cn(
                "w-full p-5 rounded-2xl text-center text-xl font-bold",
                "bg-card text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-4 focus:ring-lime/50"
              )}
            />
            <Button
              disabled={!inputValue}
              onClick={() => handleNext(step.type === 'number' ? Number(inputValue) : inputValue)}
              className={cn(
                "w-full py-6 gradient-primary text-primary-foreground font-display font-bold text-xl",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "shadow-button transition-all uppercase tracking-wide"
              )}
            >
              Continuar
            </Button>
          </div>
        )}
      </div>

      <div className="mt-auto py-8 text-center">
        <p className="text-primary-foreground/40 text-sm">
          © 2025 Fórmula do Limão. Todos os direitos reservados.
        </p>
        <div className="flex items-center justify-center gap-2 text-primary-foreground/60 text-xs mt-2">
          <Lock className="w-3 h-3 text-gold" /> Ambiente 100% Seguro
        </div>
      </div>
    </div>
  );
};

export default Quiz;
