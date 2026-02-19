import { useState } from 'react';
import { quizSteps } from '@/data/quizSteps';
import { UserData } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface QuizProps {
  onComplete: (data: UserData) => void;
}

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userData, setUserData] = useState<UserData>({});
  const [inputValue, setInputValue] = useState("");
  const [sliderValue, setSliderValue] = useState(70);

  // Bio step state
  const [bioAge, setBioAge] = useState(35);
  const [bioWeight, setBioWeight] = useState(75);
  const [bioHeight, setBioHeight] = useState(165);

  const step = quizSteps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / quizSteps.length) * 100;

  const handleNext = (value: string | number) => {
    const updatedData = { ...userData, [step.fieldName]: value };
    setUserData(updatedData);
    setInputValue("");
    setSliderValue(step.fieldName === 'height' ? 165 : step.fieldName === 'desiredWeight' ? 60 : 70);
    
    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(updatedData);
    }
  };

  const handleBioNext = () => {
    const updatedData = {
      ...userData,
      age: bioAge,
      currentWeight: bioWeight,
      height: bioHeight,
    };
    setUserData(updatedData);

    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      onComplete(updatedData);
    }
  };

  const isWeightField = step.fieldName === 'desiredWeight';
  const getSliderConfig = () => {
    return { min: 40, max: 150, default: 60, unit: 'kg' };
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
      </div>

      <div className="w-full max-w-lg animate-fade-in flex-1">
        <h2 className="text-primary-foreground text-2xl md:text-3xl font-display font-bold text-center mb-8">
          {step.type === 'bio' && userData.name
            ? `Ótimo, ${userData.name}! Agora me conta um pouco mais sobre você 💚`
            : step.question}
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

        {/* Bio step: idade + peso + altura juntos */}
        {step.type === 'bio' && (
          <div className="space-y-6">
            {/* Idade */}
            <div className="bg-card rounded-2xl p-5 border-b-4 border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-foreground font-bold text-base">🎂 Idade</span>
                <span className="text-primary font-display font-bold text-2xl">
                  {bioAge} <span className="text-muted-foreground text-sm font-normal">anos</span>
                </span>
              </div>
              <Slider
                value={[bioAge]}
                onValueChange={(vals) => setBioAge(vals[0])}
                min={18}
                max={80}
                step={1}
                className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-4 [&_[role=slider]]:border-lime [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-button [&_.relative]:h-2 [&_[data-orientation=horizontal]_.absolute]:bg-lime"
              />
              <div className="flex justify-between mt-1 text-muted-foreground text-xs">
                <span>18</span>
                <span>80</span>
              </div>
            </div>

            {/* Peso atual */}
            <div className="bg-card rounded-2xl p-5 border-b-4 border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-foreground font-bold text-base">⚖️ Peso atual</span>
                <span className="text-primary font-display font-bold text-2xl">
                  {bioWeight} <span className="text-muted-foreground text-sm font-normal">kg</span>
                </span>
              </div>
              <Slider
                value={[bioWeight]}
                onValueChange={(vals) => setBioWeight(vals[0])}
                min={40}
                max={180}
                step={1}
                className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-4 [&_[role=slider]]:border-lime [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-button [&_.relative]:h-2 [&_[data-orientation=horizontal]_.absolute]:bg-lime"
              />
              <div className="flex justify-between mt-1 text-muted-foreground text-xs">
                <span>40</span>
                <span>180</span>
              </div>
            </div>

            {/* Altura */}
            <div className="bg-card rounded-2xl p-5 border-b-4 border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-foreground font-bold text-base">📏 Altura</span>
                <span className="text-primary font-display font-bold text-2xl">
                  {bioHeight} <span className="text-muted-foreground text-sm font-normal">cm</span>
                </span>
              </div>
              <Slider
                value={[bioHeight]}
                onValueChange={(vals) => setBioHeight(vals[0])}
                min={140}
                max={200}
                step={1}
                className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:border-4 [&_[role=slider]]:border-lime [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-button [&_.relative]:h-2 [&_[data-orientation=horizontal]_.absolute]:bg-lime"
              />
              <div className="flex justify-between mt-1 text-muted-foreground text-xs">
                <span>140</span>
                <span>200</span>
              </div>
            </div>

            <Button
              onClick={handleBioNext}
              className={cn(
                "w-full py-6 gradient-primary text-primary-foreground font-display font-bold text-xl",
                "shadow-button transition-all uppercase tracking-wide"
              )}
            >
              Continuar
            </Button>
          </div>
        )}

        {step.type === 'number' && isWeightField && (
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-primary-foreground text-6xl sm:text-7xl font-display font-bold">
                {sliderValue}
              </span>
              <span className="text-primary-foreground/60 text-2xl font-display ml-1">
                {getSliderConfig().unit}
              </span>
            </div>

            <div className="px-4">
              <Slider
                value={[sliderValue]}
                onValueChange={(vals) => setSliderValue(vals[0])}
                min={getSliderConfig().min}
                max={getSliderConfig().max}
                step={1}
                className="[&_[role=slider]]:h-7 [&_[role=slider]]:w-7 [&_[role=slider]]:border-4 [&_[role=slider]]:border-lime [&_[role=slider]]:bg-white [&_[role=slider]]:shadow-button [&_.relative]:h-3 [&_[data-orientation=horizontal]_.absolute]:bg-lime"
              />
              <div className="flex justify-between mt-2 text-primary-foreground/40 text-xs font-bold">
                <span>{getSliderConfig().min}</span>
                <span>{getSliderConfig().max}</span>
              </div>
            </div>

            <Button
              onClick={() => handleNext(sliderValue)}
              className={cn(
                "w-full py-6 gradient-primary text-primary-foreground font-display font-bold text-xl",
                "shadow-button transition-all uppercase tracking-wide"
              )}
            >
              Continuar
            </Button>
          </div>
        )}

        {step.type === 'input' && (
          <div className="space-y-6">
            {step.fieldName === 'name' && (
              <p className="text-primary-foreground/60 text-center text-base -mt-4">
                Vamos personalizar seu plano especialmente para você ✨
              </p>
            )}
            <input 
              type="text"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && inputValue && handleNext(inputValue)}
              placeholder={step.placeholder}
              className={cn(
                "w-full p-5 rounded-2xl text-center text-xl font-bold",
                "bg-card text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-4 focus:ring-lime/50"
              )}
            />
            <Button
              disabled={!inputValue}
              onClick={() => handleNext(inputValue)}
              className={cn(
                "w-full py-6 gradient-primary text-primary-foreground font-display font-bold text-xl",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "shadow-button transition-all uppercase tracking-wide"
              )}
            >
              {step.fieldName === 'name' ? '✨ Começar meu quiz' : 'Continuar'}
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
