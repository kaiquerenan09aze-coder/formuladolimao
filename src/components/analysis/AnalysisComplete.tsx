import { Button } from '@/components/ui/button';
import { Droplet, Flame, Zap, ArrowRight } from 'lucide-react';
import scheduleImage from '@/assets/schedule-infographic.png';

interface AnalysisCompleteProps {
  onContinue: () => void;
}

const AnalysisComplete = ({ onContinue }: AnalysisCompleteProps) => {
  const phases = [
    {
      icon: Droplet,
      title: 'Fase de Limpeza',
      description: 'Eliminação de toxinas acumuladas no organismo em até 72h',
      color: 'text-lime',
      bgColor: 'bg-lime/20',
    },
    {
      icon: Flame,
      title: 'Choque Térmico',
      description: 'Ativação do metabolismo para queima acelerada de gordura',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20',
    },
    {
      icon: Zap,
      title: 'Energia Inesgotável',
      description: 'Disposição renovada e vitalidade durante todo o dia',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-300/20',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1d3305' }}>
      {/* Header with Progress */}
      <div className="w-full px-4 pt-6 pb-4">
        <div className="flex justify-center mb-4">
          <h1 className="text-white text-xl font-display font-bold tracking-tight">
            FÓRMULA DO <span className="text-lime">LIMÃO</span> 🍋
          </h1>
        </div>
        <div className="w-full max-w-lg mx-auto">
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-lime transition-all duration-500 ease-out"
              style={{ width: '90%' }}
            />
          </div>
          <p className="text-center text-white/60 text-sm mt-2">
            90% concluído
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-lg mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-lime/20 px-4 py-2 rounded-full">
              <span className="text-lime text-sm font-bold uppercase tracking-wider">
                ✓ Análise Concluída
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-display font-bold leading-tight">
              Veja como a <span className="text-lime">Fórmula do Limão</span> vai agir no seu metabolismo
            </h2>
          </div>

          {/* Infographic - 3 Phases */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-lime via-orange-400 to-yellow-300 opacity-50" />
            
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div
                  key={phase.title}
                  className="relative flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-lime/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 ${phase.bgColor} rounded-xl flex items-center justify-center`}>
                    <phase.icon className={`w-8 h-8 ${phase.color}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white/50 text-xs font-bold">
                        FASE {index + 1}
                      </span>
                    </div>
                    <h3 className="text-white font-display font-bold text-lg mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Image */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <p className="text-white/60 text-xs text-center uppercase tracking-wider mb-3">
              Seu cronograma personalizado
            </p>
            <img 
              src={scheduleImage} 
              alt="Cronograma da Fórmula do Limão"
              className="w-full rounded-xl"
            />
          </div>

          {/* Benefits Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: '72h', label: 'Desintoxicação' },
              { value: '14 dias', label: 'Resultados' },
              { value: '3x', label: 'Mais energia' },
            ].map((stat) => (
              <div key={stat.label} className="bg-lime/10 rounded-xl p-3 text-center">
                <p className="text-lime font-display font-bold text-xl">{stat.value}</p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="sticky bottom-0 p-4 bg-gradient-to-t from-[#1d3305] via-[#1d3305] to-transparent pt-8">
        <div className="max-w-lg mx-auto">
          <Button
            onClick={onContinue}
            className="w-full py-6 bg-lime hover:bg-lime-dark text-forest font-display font-bold text-lg shadow-button animate-pulse-soft uppercase tracking-wide"
          >
            REVELAR MEU CRONOGRAMA <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-center text-white/40 text-xs mt-3">
            🔒 Plano exclusivo baseado nas suas respostas
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisComplete;
