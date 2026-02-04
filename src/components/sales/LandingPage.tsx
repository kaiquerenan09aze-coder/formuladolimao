import { useState, useEffect } from 'react';
import { UserData } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Check, Star, Play, Lock, Clock, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import testimonial1 from '@/assets/testimonial-1.jpeg';
import testimonial2 from '@/assets/testimonial-2.jpeg';

interface LandingPageProps {
  userData: UserData;
}

const LandingPage = ({ userData }: LandingPageProps) => {
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimerStyles = () => {
    if (timeLeft < 300) return "bg-destructive animate-pulse"; 
    if (timeLeft < 600) return "bg-destructive/90";
    return "bg-destructive/80";
  };

  const formatTimeParts = (seconds: number) => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      min: m.toString().padStart(2, '0'),
      sec: s.toString().padStart(2, '0')
    };
  };

  const { min, sec } = formatTimeParts(timeLeft);
  const weightToLose = (userData.currentWeight || 70) - (userData.desiredWeight || 60);

  return (
    <div className="bg-card min-h-screen pb-24">
      {/* Urgency Header */}
      <div className={cn(
        getTimerStyles(),
        "text-destructive-foreground py-3 px-4 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 sticky top-0 z-50 transition-colors duration-500 shadow-lg"
      )}>
        <div className="flex items-center gap-2">
          <Flame className={cn("w-4 h-4", timeLeft < 300 ? "text-gold" : "text-destructive-foreground")} />
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest">A oferta expira em breve:</span>
        </div>
        
        <div className="flex items-center gap-1 font-mono">
          <div className="flex flex-col items-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 text-2xl font-bold tabular-nums border border-white/20 min-w-[3rem] text-center">
              {min}
            </div>
            <span className="text-[10px] uppercase font-bold opacity-70">Min</span>
          </div>
          
          <div className="text-2xl font-bold mb-4">:</div>
          
          <div className="flex flex-col items-center">
            <div className={cn(
              "bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1 text-2xl font-bold tabular-nums border border-white/20 min-w-[3rem] text-center",
              timeLeft % 2 === 0 ? "scale-100" : "scale-105",
              "transition-transform duration-100"
            )}>
              {sec}
            </div>
            <span className="text-[10px] uppercase font-bold opacity-70">Seg</span>
          </div>
        </div>

        {timeLeft < 300 && (
          <div className="hidden lg:block bg-card text-destructive px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter animate-bounce">
            Últimas vagas!
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="bg-forest text-primary-foreground pt-12 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight">
            {userData.name ? `${userData.name}, ` : ''}EMAGREÇA{' '}
            <span className="text-lime underline">ATÉ {weightToLose}KG</span> EM APENAS 28 DIAS COM A FÓRMULA DO LIMÃO
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-lime/20 px-4 py-2 rounded-full text-xs font-bold border border-lime/30">🔥 REDUZ A FOME</span>
            <span className="bg-lime/20 px-4 py-2 rounded-full text-xs font-bold border border-lime/30">💪 SECA GORDURA LOCALIZADA</span>
            <span className="bg-lime/20 px-4 py-2 rounded-full text-xs font-bold border border-lime/30">⚡ ATIVA O METABOLISMO</span>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-4 -mt-12 mb-16">
        <div className="max-w-3xl mx-auto bg-foreground rounded-3xl aspect-video shadow-2xl overflow-hidden relative group">
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-8xl">🍋</span>
          </div>
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center pl-2 hover:scale-110 transition-transform shadow-button">
              <Play className="w-8 h-8 text-primary-foreground fill-current" />
            </button>
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-primary-foreground/70 text-sm">
            Toque no play para assistir
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-forest mb-12 uppercase">
            Histórias reais de transformação!
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: "Gabriela Lyra - MG", text: "Eu achava que nunca ia conseguir, mas em 30 dias eu eliminei 7kg só com o truque do limão!", image: testimonial1 },
              { name: "Lorena Dias - SP", text: "Em 30 dias eu eliminei 10kg! A fórmula funciona de verdade.", image: testimonial2 }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-3xl shadow-card space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex text-gold gap-1 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold" />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-xs">{testimonial.name}</span>
                </div>
                <img 
                  src={testimonial.image} 
                  alt={`Transformação de ${testimonial.name}`}
                  className="w-full rounded-xl object-cover"
                />
                <p className="text-muted-foreground text-sm italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-forest text-3xl font-display font-bold mb-12">ESCOLHA SEU PLANO</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <div className="border-4 border-border rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden group hover:border-lime/50 transition-all bg-card">
              <div className="bg-muted text-muted-foreground font-bold text-xs px-4 py-1 rounded-full w-fit uppercase mb-4">
                Plano Básico
              </div>
              <h3 className="text-2xl font-display font-bold text-forest">Protocolo Truque do Limão</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Protocolo Completo</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Planilha de Acompanhamento</li>
              </ul>
              <div className="pt-6 border-t border-border">
                <div className="text-muted-foreground line-through text-lg">De R$ 197,00</div>
                <div className="text-forest text-5xl font-display font-bold">
                  R$ 14,97 <span className="text-sm font-normal">à vista</span>
                </div>
              </div>
              <Button className="w-full py-6 bg-forest text-primary-foreground font-bold text-lg uppercase">
                Quero o Plano Básico
              </Button>
            </div>

            {/* Complete Plan */}
            <div className="border-4 border-primary rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden shadow-card bg-lime-light">
              <div className="gradient-primary text-primary-foreground font-bold text-xs px-4 py-1 rounded-full w-fit uppercase mb-4">
                MAIS VENDIDO
              </div>
              <h3 className="text-2xl font-display font-bold text-forest">Plano Completo + Bônus</h3>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Protocolo Completo</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Planilha de Acompanhamento</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Técnica de Renovação Hormonal</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Chás Noturnos Detox</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Método Corpo em Ação</li>
              </ul>
              <div className="pt-6 border-t border-primary/20">
                <div className="text-muted-foreground line-through text-lg">De R$ 397,00</div>
                <div className="text-primary text-5xl font-display font-bold">
                  R$ 27,90 <span className="text-sm font-normal text-muted-foreground">mais vantajoso</span>
                </div>
              </div>
              <Button className="w-full py-6 gradient-primary text-primary-foreground font-bold text-lg uppercase shadow-button">
                Quero o Plano Completo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-forest text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center uppercase">
            POR QUE SOMOS DIFERENTES?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-foreground/10">
                  <th className="py-4 font-bold text-primary-foreground/60 uppercase text-xs">Alternativa</th>
                  <th className="py-4 font-bold text-primary-foreground/60 uppercase text-xs">Custo Estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-primary-foreground/5">
                  <td className="py-5 text-lg">Medicamentos de Farmácia</td>
                  <td className="py-5 font-bold text-destructive">R$ 3.000,00</td>
                </tr>
                <tr className="border-b border-primary-foreground/5">
                  <td className="py-5 text-lg">Nutricionista</td>
                  <td className="py-5 font-bold text-destructive">R$ 500,00 / mês</td>
                </tr>
                <tr className="border-b border-primary-foreground/5">
                  <td className="py-5 text-lg">Academia + Personal</td>
                  <td className="py-5 font-bold text-destructive">R$ 1.300,00 / mês</td>
                </tr>
                <tr className="bg-lime/20">
                  <td className="py-5 px-4 text-xl font-display font-bold text-lime">🍋 Fórmula do Limão</td>
                  <td className="py-5 px-4 text-2xl font-display font-bold text-lime">R$ 27,90</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto bg-secondary p-12 rounded-[3rem] border-2 border-dashed border-border">
          <ShieldCheck className="w-24 h-24 mx-auto mb-8 text-primary" />
          <h2 className="text-3xl font-display font-bold text-forest mb-6">RISCO ZERO POR 30 DIAS</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Se você não eliminar ao menos 5kg em 30 dias, eu devolvo 100% do seu dinheiro, sem questionar. 
            Seu risco é zero. Seu resultado é garantido.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur-md border-t border-border md:hidden z-40">
        <Button className="w-full py-6 gradient-primary text-primary-foreground font-bold text-lg uppercase shadow-button animate-pulse-soft">
          Garantir minha vaga agora! <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
