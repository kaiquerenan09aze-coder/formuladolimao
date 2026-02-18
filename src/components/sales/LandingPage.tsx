import { useState, useEffect, useCallback } from 'react';
import { UserData } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Check, Star, Lock, Flame, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Clock, TrendingUp, Droplets, Zap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import testimonial1 from '@/assets/testimonial-1.jpeg';
import testimonial2 from '@/assets/testimonial-2.jpeg';
import testimonial3 from '@/assets/testimonial-3.jpeg';
import testimonial4 from '@/assets/testimonial-4.jpeg';
import formulaVideo from '@/assets/formula-video.mp4';

interface LandingPageProps {
  userData: UserData;
}

const CHECKOUT_URL = "https://pay.kirvano.com/dde02282-b271-4865-ba52-5480a1106025";

const LandingPage = ({ userData }: LandingPageProps) => {
  const [timeLeft, setTimeLeft] = useState(1200);
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    { name: "Gabriela Lyra - MG", text: "Eu achava que nunca ia conseguir, mas em 30 dias eu eliminei 7kg só com o truque do limão!", image: testimonial1 },
    { name: "Lorena Dias - SP", text: "Em 30 dias eu eliminei 10kg! A fórmula funciona de verdade.", image: testimonial2 },
    { name: "Camila Souza - RJ", text: "Resultado incrível! Meu corpo mudou completamente em poucas semanas.", image: testimonial3 },
    { name: "Fernanda Lima - PR", text: "Eu não acreditava, mas os resultados apareceram rápido. Recomendo demais!", image: testimonial4 }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

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
      </div>

      {/* Hero */}
      <section className="bg-forest relative overflow-hidden text-primary-foreground pt-10 pb-10 px-4 text-center">
        <div className="absolute inset-0 gradient-forest pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-lime-glow/15 px-4 py-2 rounded-full border border-lime-glow/20 mb-2">
            <span className="text-lime-glow text-xs sm:text-sm font-bold uppercase tracking-wider">
              🎉 Parabéns
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-display font-bold leading-[1.1] tracking-tight uppercase">
            Seu perfil indica alto potencial de resposta metabólica
          </h1>
          <p className="text-lime-glow font-display font-bold text-base sm:text-lg md:text-xl">
            "Veja resultados visíveis nas primeiras semanas com um protocolo estruturado."
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
            <span className="bg-lime-glow/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border border-lime-glow/25">🔥 REDUZ A FOME</span>
            <span className="bg-lime-glow/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border border-lime-glow/25">💪 SECA GORDURA</span>
            <span className="bg-lime-glow/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold border border-lime-glow/25">⚡ ATIVA METABOLISMO</span>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel + Video */}
      <section className="bg-secondary py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest mb-8 uppercase text-center">
            Histórias reais de transformação!
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">

            {/* Carousel */}
            <div className="w-full md:w-1/2 relative">
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="min-w-full px-2">
                      <div className="bg-card p-5 sm:p-6 rounded-3xl shadow-card space-y-4">
                        <div className="flex justify-between items-center mb-2">
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
                    </div>
                  ))}
                </div>
              </div>
              {/* Navigation */}
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-card rounded-full shadow-card flex items-center justify-center z-10"
              >
                <ChevronLeft className="w-4 h-4 text-forest" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-card rounded-full shadow-card flex items-center justify-center z-10"
              >
                <ChevronRight className="w-4 h-4 text-forest" />
              </button>
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      i === currentSlide ? "bg-primary w-6" : "bg-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Video + CTA */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <div className="rounded-3xl overflow-hidden shadow-card bg-card">
                <video
                  autoPlay
                  loop
                  playsInline
                  controls
                  src={formulaVideo}
                  className="w-full rounded-3xl"
                  preload="auto"
                />
              </div>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 px-6 gradient-primary text-primary-foreground font-bold text-base uppercase shadow-button rounded-xl flex flex-col items-center justify-center text-center gap-1 leading-tight"
              >
                <span>Saiba mais sobre</span>
                <span className="flex items-center gap-2">a fórmula do limão <ArrowRight className="w-5 h-5 flex-shrink-0" /></span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Trust + Pricing */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-forest text-2xl sm:text-3xl font-display font-bold mb-4">GARANTA SEU ACESSO AGORA</h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg">Junte-se a milhares de mulheres que já transformaram seus corpos</p>

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
          <div className="border-4 border-primary rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 space-y-6 relative overflow-hidden shadow-card bg-lime-light">
            <div className="gradient-primary text-primary-foreground font-bold text-xs px-4 py-1 rounded-full w-fit uppercase mb-4">
              OFERTA ESPECIAL
            </div>
            <h3 className="text-2xl font-display font-bold text-forest">Plano Personalizado do Truque do Limão</h3>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Estratégia Anti-Inchaço</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Ajuste Hormonal Natural</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Ativação Diária do Corpo</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Diminuição da compulsão por doce</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Apoio ao funcionamento intestinal</li>
              <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> Mais constância no emagrecimento</li>
            </ul>
            <div className="pt-6 border-t border-primary/20 text-center space-y-2">
              <div className="text-muted-foreground line-through text-lg">De R$ 197,00</div>
              <div className="text-muted-foreground text-sm font-bold uppercase tracking-wide">Por apenas:</div>
              <div className="text-primary text-xl sm:text-2xl font-display font-bold">
                5x de <span className="text-4xl sm:text-5xl md:text-6xl">R$ 5,58</span>
              </div>
              <div className="text-muted-foreground text-base">
                ou <span className="text-primary font-bold text-lg">R$ 27,90</span> à vista
              </div>
            </div>
            <Button asChild className="w-full py-6 gradient-primary text-primary-foreground font-bold text-lg uppercase shadow-button">
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                Quero Começar Agora! <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <p className="text-center text-muted-foreground text-xs flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Pagamento seguro • Acesso imediato após a compra
            </p>
          </div>
        </div>
      </section>

      {/* Benefits & Timeline */}
      <section className="bg-forest relative overflow-hidden text-primary-foreground py-12 sm:py-16 px-4">
        <div className="absolute inset-0 gradient-forest pointer-events-none" />
        <div className="relative max-w-lg mx-auto space-y-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold leading-tight text-center">
            A <span className="text-lime-glow">Fórmula do Limão</span> combina ingredientes naturais como limão e outros componentes estratégicos que ajudam a:
          </h2>

          {/* Checklist */}
          <div className="space-y-3">
            {[
              'Controle da fome emocional',
              'Redução do inchaço acumulado',
              'Estímulo natural da queima de gordura',
              'Reorganização metabólica progressiva',
              'Estratégia prática que pode ser aplicada em casa',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <Check className="w-5 h-5 text-lime-glow flex-shrink-0" />
                <span className="text-primary-foreground text-sm sm:text-base font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* 6 Benefits Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: Clock, label: '72h', description: 'Início da Ativação' },
              { icon: TrendingUp, label: '14 dias', description: 'Mudança Visível' },
              { icon: Flame, label: 'Controle da Fome', description: 'Redução natural do apetite emocional' },
              { icon: Droplets, label: 'Redução do Inchaço', description: 'Diminuição da retenção líquida' },
              { icon: Zap, label: 'Energia Estável', description: 'Disposição durante o dia inteiro' },
              { icon: Settings, label: 'Metabolismo Ativo', description: 'Queima de gordura otimizada' },
            ].map((benefit) => (
              <div key={benefit.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center space-y-1">
                <benefit.icon className="w-5 h-5 text-lime-glow mx-auto" />
                <p className="text-lime-glow font-display font-bold text-sm">{benefit.label}</p>
                <p className="text-primary-foreground/50 text-[11px] leading-tight">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 sm:py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto bg-secondary p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] border-2 border-dashed border-border">
          <ShieldCheck className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-forest mb-4 sm:mb-6">RISCO ZERO POR 30 DIAS</h2>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            Se você não ficar satisfeita em 30 dias, devolvemos 100% do seu dinheiro, sem questionar. 
            Seu risco é zero.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur-md border-t border-border md:hidden z-40">
        <Button asChild className="w-full py-6 gradient-primary text-primary-foreground font-bold text-lg uppercase shadow-button animate-pulse-soft">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
            Garantir minha vaga agora! <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
