import { UserData } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, TrendingUp, Flame, Droplets, Zap, Settings } from 'lucide-react';
import { Check } from 'lucide-react';

interface AnalysisCompleteProps {
  userData: UserData;
  onContinue: () => void;
}

const AnalysisComplete = ({ userData, onContinue }: AnalysisCompleteProps) => {
  const benefits = [
    { icon: Clock, label: '72h', description: 'Início da Ativação' },
    { icon: TrendingUp, label: '14 dias', description: 'Mudança Visível' },
    { icon: Flame, label: 'Controle da Fome', description: 'Redução natural do apetite emocional' },
    { icon: Droplets, label: 'Redução do Inchaço', description: 'Diminuição da retenção líquida' },
    { icon: Zap, label: 'Energia Estável', description: 'Disposição durante o dia inteiro' },
    { icon: Settings, label: 'Metabolismo Ativo', description: 'Queima de gordura otimizada' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-forest relative overflow-hidden">
      <div className="absolute inset-0 gradient-forest pointer-events-none" />
      
      {/* Header */}
      <div className="relative w-full px-4 pt-6 pb-4">
        <div className="flex justify-center mb-4">
          <h1 className="text-white text-xl font-display font-bold tracking-tight">
            FÓRMULA DO <span className="text-lime-glow">LIMÃO</span> 🍋
          </h1>
        </div>
        <div className="w-full max-w-lg mx-auto">
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-lime to-lime-glow transition-all duration-500 ease-out"
              style={{ width: '90%' }}
            />
          </div>
          <p className="text-center text-white/50 text-sm mt-2">90% concluído</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-display font-bold leading-tight">
              A <span className="text-lime-glow">Fórmula do Limão</span> combina ingredientes naturais como limão e outros componentes estratégicos que ajudam a:
            </h2>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            {[
              'Controle da fome emocional',
              'Redução do inchaço acumulado',
              'Estímulo natural da queima de gordura',
              'Reorganização metabólica progressiva',
              'Estratégia prática que pode ser aplicada em casa',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 card-glow rounded-xl p-4">
                <Check className="w-5 h-5 text-lime-glow flex-shrink-0" />
                <span className="text-white text-sm sm:text-base font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* 6 Benefits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {benefits.map((benefit) => (
              <div key={benefit.label} className="card-glow rounded-xl p-3 text-center space-y-1">
                <benefit.icon className="w-5 h-5 text-lime-glow mx-auto" />
                <p className="text-lime-glow font-display font-bold text-sm">{benefit.label}</p>
                <p className="text-white/50 text-[11px] leading-tight">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative sticky bottom-0 p-4 bg-gradient-to-t from-forest via-forest to-transparent pt-8">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={onContinue}
            className="w-full py-6 bg-gradient-to-r from-lime to-lime-glow hover:from-lime-glow hover:to-lime text-forest font-display font-bold text-base sm:text-lg shadow-button animate-pulse-soft uppercase tracking-wide"
          >
            👉 REVELAR MEU PLANO PERSONALIZADO <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-center text-white/30 text-xs mt-3">
            🔒 Plano exclusivo baseado nas suas respostas
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisComplete;
