import { useState, useEffect } from 'react';
import { QuizStep, UserData } from '@/types/quiz';
import QuizOption from './QuizOption';
import QuizInput from './QuizInput';
import ProgressBar from './ProgressBar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  step: QuizStep;
  currentStep: number;
  totalSteps: number;
  userData: UserData;
  onAnswer: (fieldName: keyof UserData, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
}

const QuizCard = ({
  step,
  currentStep,
  totalSteps,
  userData,
  onAnswer,
  onNext,
  onBack
}: QuizCardProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 50);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const currentValue = userData[step.fieldName];
  const canProceed = currentValue !== undefined && currentValue !== '';

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <ProgressBar current={currentStep} total={totalSteps} />
      
      <div className={cn(
        "bg-card rounded-2xl p-6 md:p-8 shadow-card transition-all duration-500",
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      )}>
        <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-6 text-center">
          {step.question}
        </h2>

        <div className="space-y-3 mb-8">
          {step.type === 'select' && step.options?.map((option) => (
            <QuizOption
              key={option.value}
              label={option.label}
              icon={option.icon}
              isSelected={currentValue === option.value}
              onClick={() => onAnswer(step.fieldName, option.value)}
            />
          ))}

          {(step.type === 'input' || step.type === 'number') && (
            <QuizInput
              type={step.type === 'number' ? 'number' : 'text'}
              value={currentValue}
              onChange={(val) => onAnswer(step.fieldName, val)}
              placeholder={step.placeholder}
            />
          )}
        </div>

        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className={cn(
              "flex-1 gradient-primary text-primary-foreground font-semibold",
              "hover:opacity-90 transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              canProceed && "shadow-button"
            )}
          >
            {currentStep === totalSteps ? 'Ver Resultado' : 'Continuar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
