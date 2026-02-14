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
      title: 'Fase 1 – Reequilíbrio',
      description: 'Eliminação de toxinas e reequilíbrio do organismo para preparar seu corpo',
      color: 'text-lime-glow',
      bgColor: 'bg-lime-glow/20',
    },
    {
      icon: Flame,
      title: 'Fase 2 – Ativação Metabólica',
      description: 'Ativação do metabolismo para queima acelerada de gordura de forma natural',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/20',
    },
    {
      icon: Zap,
      title: 'Fase 3 – Estabilização e Energia',
      description: 'Estabilização do peso e energia renovada durante todo o dia',
      color: 'text-yellow-300',
      bgColor: 'bg-yellow-300/20',
    },
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
            <div className="inline-flex items-center gap-2 bg-lime-glow/15 px-4 py-2 rounded-full border border-lime-glow/20">
              <span className="text-lime-glow text-sm font-bold uppercase tracking-wider">
                ✓ Análise Concluída
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-display font-bold leading-tight">
              Foi por isso que estruturamos um protocolo simples, dividido em <span className="text-lime-glow">3 fases</span>
            </h2>
          </div>

          {/* 3 Phases */}
          <div className="relative">
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-lime via-orange-400 to-yellow-300 opacity-50" />
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div
                  key={phase.title}
                  className="relative flex items-start gap-4 card-glow rounded-2xl p-5 hover:border-lime-glow/40 transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`flex-shrink-0 w-16 h-16 ${phase.bgColor} rounded-xl flex items-center justify-center border border-white/5`}>
                    <phase.icon className={`w-8 h-8 ${phase.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-display font-bold text-lg mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Image */}
          <div className="card-glow rounded-2xl p-4">
            <p className="text-white/50 text-xs text-center uppercase tracking-wider mb-3">
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
              { value: '72h', label: 'Reequilíbrio' },
              { value: '14 dias', label: 'Resultados' },
              { value: '3x', label: 'Mais energia' },
            ].map((stat) => (
              <div key={stat.label} className="card-glow rounded-xl p-3 text-center">
                <p className="text-lime-glow font-display font-bold text-xl">{stat.value}</p>
                <p className="text-white/50 text-xs">{stat.label}</p>
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
            className="w-full py-6 bg-gradient-to-r from-lime to-lime-glow hover:from-lime-glow hover:to-lime text-forest font-display font-bold text-lg shadow-button animate-pulse-soft uppercase tracking-wide"
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
