import { UserData } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Star, Clock, Shield, Users } from 'lucide-react';

interface SalesPageProps {
  userData: UserData;
}

const benefits = [
  "Acelera o metabolismo naturalmente",
  "Elimina gordura localizada",
  "Reduz inchaço e retenção de líquidos",
  "Aumenta a energia e disposição",
  "100% natural, sem efeitos colaterais",
  "Resultados visíveis em 7 dias",
];

const testimonials = [
  {
    name: "Maria Silva",
    age: 42,
    result: "Perdi 12kg em 2 meses",
    text: "Incrível! Nunca imaginei que seria tão fácil. A Fórmula do Limão mudou minha vida!",
  },
  {
    name: "Ana Santos",
    age: 35,
    result: "Perdi 8kg em 5 semanas",
    text: "Finalmente encontrei algo que funciona. Recomendo para todas as minhas amigas!",
  },
  {
    name: "Carla Oliveira",
    age: 28,
    result: "Perdi 6kg em 3 semanas",
    text: "Simples, prático e eficiente. Minha barriga sumiu!",
  },
];

const SalesPage = ({ userData }: SalesPageProps) => {
  const { name, desiredWeight, currentWeight } = userData;
  const weightToLose = (currentWeight || 70) - (desiredWeight || 60);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Banner */}
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6 animate-pulse-soft">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">Oferta expira em 24 horas!</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-forest mb-4 leading-tight">
            {name ? `${name}, ` : ''}Descubra o Segredo Natural para{' '}
            <span className="text-gradient">Perder {weightToLose}kg</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A Fórmula do Limão é o método comprovado que já ajudou mais de{' '}
            <strong className="text-forest">47.000 brasileiras</strong> a alcançarem o corpo dos sonhos
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">47.000+ clientes</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-sm font-medium">4.9/5 avaliações</span>
            </div>
            <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Garantia de 30 dias</span>
            </div>
          </div>

          {/* Lemon visual */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 gradient-primary rounded-full opacity-20 animate-pulse-soft" />
            <div className="absolute inset-4 bg-lime rounded-full flex items-center justify-center shadow-card">
              <span className="text-8xl animate-float">🍋</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-forest mb-8">
            Por que a Fórmula do Limão funciona?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-background p-4 rounded-xl animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 gradient-hero">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-forest mb-8">
            O que nossas clientes dizem
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 text-sm">"{testimonial.text}"</p>
                <div className="border-t pt-3">
                  <p className="font-semibold text-foreground">{testimonial.name}, {testimonial.age}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 px-4 bg-forest text-primary-foreground">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-lime-light font-medium mb-2">Oferta Especial</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Comece Sua Transformação Hoje
          </h2>
          
          <div className="bg-card text-foreground rounded-2xl p-8 shadow-card mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-muted-foreground line-through text-xl">R$ 197,00</span>
              <span className="bg-destructive text-destructive-foreground text-sm font-bold px-2 py-1 rounded">
                -70%
              </span>
            </div>
            <p className="text-5xl font-display font-extrabold text-primary mb-2">
              R$ 67,00
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              ou 12x de R$ 6,58
            </p>
            
            <Button
              className={cn(
                "w-full py-6 text-lg font-display font-bold",
                "gradient-gold text-accent-foreground",
                "shadow-gold hover:opacity-90 transition-all duration-300",
                "animate-bounce-subtle"
              )}
            >
              QUERO EMAGRECER AGORA! 🍋
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Garantia de 30 dias ou seu dinheiro de volta</span>
            </div>
          </div>

          <p className="text-lime-light/80 text-sm">
            ⚡ Mais de 200 pessoas estão vendo esta página agora
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Fórmula do Limão. Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Este produto não substitui orientação médica profissional.
        </p>
      </footer>
    </div>
  );
};

export default SalesPage;
