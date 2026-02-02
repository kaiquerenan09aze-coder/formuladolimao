import { UserData } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultsScreenProps {
  userData: UserData;
  onContinue: () => void;
}

const ResultsScreen = ({ userData, onContinue }: ResultsScreenProps) => {
  const { currentWeight, height, desiredWeight, name } = userData;
  
  // Calculate BMI
  const heightInMeters = (height || 165) / 100;
  const bmi = (currentWeight || 70) / (heightInMeters * heightInMeters);
  const weightToLose = (currentWeight || 70) - (desiredWeight || 60);
  
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-500' };
    if (bmi < 25) return { label: 'Peso normal', color: 'text-primary' };
    if (bmi < 30) return { label: 'Sobrepeso', color: 'text-gold-dark' };
    return { label: 'Obesidade', color: 'text-destructive' };
  };

  const bmiCategory = getBMICategory(bmi);

  // Estimate weeks to reach goal (0.5-1kg per week is healthy)
  const weeksToGoal = Math.ceil(weightToLose / 0.75);

  return (
    <div className="min-h-screen gradient-hero py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-lime-light px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🍋</span>
            <span className="font-semibold text-primary">Fórmula do Limão</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-forest mb-2">
            Parabéns, {name || 'visitante'}!
          </h1>
          <p className="text-muted-foreground">
            Seu plano personalizado está pronto
          </p>
        </div>

        {/* BMI Card */}
        <div className="bg-card rounded-2xl p-6 shadow-card mb-6 animate-slide-up">
          <h3 className="font-display font-semibold text-lg mb-4 text-center">
            Seu Índice de Massa Corporal (IMC)
          </h3>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-5xl font-bold text-gradient">{bmi.toFixed(1)}</p>
              <p className={cn("font-semibold mt-1", bmiCategory.color)}>
                {bmiCategory.label}
              </p>
            </div>
          </div>

          {/* BMI Scale */}
          <div className="relative h-3 rounded-full mb-2 overflow-hidden" style={{ background: 'linear-gradient(to right, hsl(200, 70%, 60%), hsl(120, 60%, 50%), hsl(45, 90%, 55%), hsl(0, 70%, 55%))' }}>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-card border-2 border-forest rounded-full shadow-lg transition-all duration-500"
              style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 shadow-card text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-3xl font-bold text-primary">{weightToLose}kg</p>
            <p className="text-sm text-muted-foreground">Meta para perder</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-3xl font-bold text-gold">{weeksToGoal} sem</p>
            <p className="text-sm text-muted-foreground">Tempo estimado</p>
          </div>
        </div>

        {/* Personalized Message */}
        <div className="bg-lime-light border border-primary/20 rounded-2xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex gap-4">
            <span className="text-4xl">🎯</span>
            <div>
              <h4 className="font-display font-semibold text-forest mb-2">
                Seu plano é possível!
              </h4>
              <p className="text-sm text-muted-foreground">
                Com a <strong className="text-primary">Fórmula do Limão</strong>, você pode alcançar 
                seu peso ideal de <strong>{desiredWeight}kg</strong> de forma saudável e natural. 
                Milhares de pessoas já transformaram suas vidas!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onContinue}
          className={cn(
            "w-full py-6 text-lg font-display font-bold",
            "gradient-gold text-accent-foreground",
            "shadow-gold hover:opacity-90 transition-all duration-300",
            "animate-bounce-subtle"
          )}
        >
          Quero Começar Agora! 🍋
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          ⚡ Oferta especial por tempo limitado
        </p>
      </div>
    </div>
  );
};

export default ResultsScreen;
