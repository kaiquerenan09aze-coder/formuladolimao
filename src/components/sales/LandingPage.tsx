import { useState, useEffect } from 'react';
import { UserData } from '@/types/quiz';
import { Button } from '@/components/ui/button';
 import { Check, Star, Lock, Flame, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import testimonial1 from '@/assets/testimonial-1.jpeg';
import testimonial2 from '@/assets/testimonial-2.jpeg';
 import heroSpecialist from '@/assets/hero-specialist.png';

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

      {/* Hero Image Section - Now at the top */}
      <section className="px-4 py-8 bg-card">
        <div className="max-w-3xl mx-auto rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center bg-card">
          <img 
            src={heroSpecialist} 
            alt="Especialista apresentando a Fórmula do Limão"
            className="w-full h-auto object-contain max-h-[500px] md:max-h-none"
          />
        </div>
      </section>

      {/* Hero Text Section */}
      <section className="bg-forest relative overflow-hidden text-primary-foreground pt-12 pb-12 px-4 text-center">
        <div className="absolute inset-0 gradient-forest pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight">
            {userData.name ? `${userData.name}, ` : ''}EMAGREÇA{' '}
            <span className="text-lime-glow underline">ATÉ {weightToLose}KG</span> EM APENAS 28 DIAS COM A FÓRMULA DO LIMÃO
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="bg-lime-glow/15 px-4 py-2 rounded-full text-xs font-bold border border-lime-glow/25">🔥 REDUZ A FOME</span>
            <span className="bg-lime-glow/15 px-4 py-2 rounded-full text-xs font-bold border border-lime-glow/25">💪 SECA GORDURA LOCALIZADA</span>
            <span className="bg-lime-glow/15 px-4 py-2 rounded-full text-xs font-bold border border-lime-glow/25">⚡ ATIVA O METABOLISMO</span>
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

      {/* Trust + Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-forest text-3xl font-display font-bold mb-4">GARANTA SEU ACESSO AGORA</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Junte-se a milhares de mulheres que já transformaram seus corpos</p>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-primary" />, label: "Compra 100% Segura" },
              { icon: <Lock className="w-6 h-6 text-primary" />, label: "Dados Protegidos" },
              { icon: <Star className="w-6 h-6 text-gold fill-gold" />, label: "+12.000 Alunas" },
              { icon: <Check className="w-6 h-6 text-primary" />, label: "Garantia de 30 dias" },
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-secondary rounded-2xl p-4 text-center">
                {badge.icon}
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Single Complete Plan */}
          <div className="border-4 border-primary rounded-[2.5rem] p-8 md:p-10 space-y-6 relative overflow-hidden shadow-card bg-lime-light">
            <div className="gradient-primary text-primary-foreground font-bold text-xs px-4 py-1 rounded-full w-fit uppercase mb-4">
              OFERTA ESPECIAL
            </div>
            <h3 className="text-2xl font-display font-bold text-forest">Plano Completo + Bônus Exclusivos</h3>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Protocolo Completo do Truque do Limão</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Planilha de Acompanhamento</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Técnica de Renovação Hormonal</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Chás Noturnos Detox</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Método Corpo em Ação</li>
            </ul>
            <div className="pt-6 border-t border-primary/20 text-center space-y-2">
              <div className="text-muted-foreground line-through text-lg">De R$ 397,00</div>
              <div className="text-muted-foreground text-sm font-bold uppercase tracking-wide">Por apenas:</div>
              <div className="text-primary text-2xl font-display font-bold">
                5x de <span className="text-5xl md:text-6xl">R$ 5,58</span>
              </div>
              <div className="text-muted-foreground text-base">
                ou <span className="text-primary font-bold text-lg">R$ 27,90</span> à vista
              </div>
            </div>
            <Button asChild className="w-full py-6 gradient-primary text-primary-foreground font-bold text-lg uppercase shadow-button">
              <a href="https://pay.kirvano.com/dde02282-b271-4865-ba52-5480a1106025" target="_blank" rel="noopener noreferrer">
                Quero Começar Agora! <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <p className="text-center text-muted-foreground text-xs flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Pagamento seguro • Acesso imediato após a compra
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-forest relative overflow-hidden text-primary-foreground py-16 px-4">
        <div className="absolute inset-0 gradient-forest pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center uppercase">
            POR QUE SOMOS DIFERENTES?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-primary-foreground/10">
                  <th className="py-4 font-bold text-primary-foreground/50 uppercase text-xs">Alternativa</th>
                  <th className="py-4 font-bold text-primary-foreground/50 uppercase text-xs">Custo Estimado</th>
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
                <tr className="bg-lime-glow/15 rounded-xl">
                  <td className="py-5 px-4 text-xl font-display font-bold text-lime-glow">🍋 Fórmula do Limão</td>
                  <td className="py-5 px-4 text-2xl font-display font-bold text-lime-glow">R$ 27,90</td>
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
        <Button asChild className="w-full py-6 gradient-primary text-primary-foreground font-bold text-lg uppercase shadow-button animate-pulse-soft">
          <a href="https://pay.kirvano.com/dde02282-b271-4865-ba52-5480a1106025" target="_blank" rel="noopener noreferrer">
            Garantir minha vaga agora! <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
