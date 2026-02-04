import { useState, useEffect } from 'react';
import { UserData } from '@/types/quiz';
import socialProofImage from '@/assets/social-proof.jpeg';

interface CalculatingProps {
  userData: UserData;
  onComplete: () => void;
}

const Calculating = ({ userData, onComplete }: CalculatingProps) => {
  const [progress, setProgress] = useState(0);

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

  return (
    <div className="min-h-screen bg-forest flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 border-4 border-lime border-t-transparent rounded-full animate-spin mb-8"></div>
      <h2 className="text-primary-foreground text-3xl font-display font-bold mb-4">
        Preparando seu plano, {userData.name || 'visitante'}...
      </h2>
      <div className="w-full max-w-sm bg-forest/50 h-3 rounded-full overflow-hidden mb-12">
        <div 
          className="h-full bg-lime transition-all duration-100" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <div className="bg-card rounded-3xl p-6 shadow-2xl max-w-md animate-pulse">
        <p className="text-forest font-bold mb-4">Enquanto analisamos, veja este resultado:</p>
        <img 
          src={socialProofImage} 
          alt="Resultado de transformação" 
          className="w-full rounded-xl object-cover"
        />
        <p className="text-muted-foreground text-sm mt-3 italic">"Resultado real de uma de nossas alunas"</p>
      </div>
    </div>
  );
};

export default Calculating;
