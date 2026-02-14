import { useState, useEffect } from 'react';
import { UserData } from '@/types/quiz';
import socialProofImage from '@/assets/social-proof.jpeg';

interface CalculatingProps {
  userData: UserData;
  onComplete: () => void;
}

const Calculating = ({ userData, onComplete }: CalculatingProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Analisando suas respostas…');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(old => {
        if (old >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return old + 2;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 40) {
      setStatusText('Analisando suas respostas…');
    } else if (progress < 70) {
      setStatusText('⏳ Detectando padrões metabólicos…');
    } else {
      setStatusText('90% concluído…');
    }
  }, [progress]);

  return (
    <div className="min-h-screen bg-forest relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 gradient-forest pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 border-4 border-lime-glow border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-primary-foreground text-2xl sm:text-3xl font-display font-bold mb-2">
          {statusText}
        </h2>
        <p className="text-primary-foreground/60 text-sm mb-6">
          Estamos analisando suas respostas…
        </p>
        <div className="w-full max-w-sm bg-white/10 h-3 rounded-full overflow-hidden mb-12">
          <div 
            className="h-full bg-gradient-to-r from-lime to-lime-glow transition-all duration-100" 
            style={{ width: `${progress}%` }} 
          />
        </div>

        <div className="card-glow rounded-3xl p-6 shadow-2xl max-w-md">
          <p className="text-lime-glow font-bold mb-4">Enquanto analisamos, veja este resultado:</p>
          <img 
            src={socialProofImage} 
            alt="Resultado de transformação" 
            className="w-full rounded-xl object-cover"
          />
          <p className="text-white/50 text-sm mt-3 italic">"Resultado real de uma de nossas alunas"</p>
        </div>
      </div>
    </div>
  );
};

export default Calculating;
