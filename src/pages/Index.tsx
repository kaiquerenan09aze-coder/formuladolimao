import { useState, useCallback } from 'react';
import { AppState, UserData } from '@/types/quiz';
import { quizSteps } from '@/data/quizSteps';
import QuizHeader from '@/components/quiz/QuizHeader';
import QuizCard from '@/components/quiz/QuizCard';
import CalculatingScreen from '@/components/calculating/CalculatingScreen';
import ResultsScreen from '@/components/results/ResultsScreen';
import SalesPage from '@/components/sales/SalesPage';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('quiz');
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({});

  const handleAnswer = useCallback((fieldName: keyof UserData, value: string | number) => {
    setUserData(prev => ({ ...prev, [fieldName]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < quizSteps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setAppState('calculating');
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleCalculatingComplete = useCallback(() => {
    setAppState('result');
  }, []);

  const handleContinueToSales = useCallback(() => {
    setAppState('sales_page');
  }, []);

  // Render based on app state
  if (appState === 'calculating') {
    return (
      <CalculatingScreen
        userName={userData.name || ''}
        onComplete={handleCalculatingComplete}
      />
    );
  }

  if (appState === 'result') {
    return (
      <ResultsScreen
        userData={userData}
        onContinue={handleContinueToSales}
      />
    );
  }

  if (appState === 'sales_page') {
    return <SalesPage userData={userData} />;
  }

  // Quiz state
  const currentQuizStep = quizSteps[currentStep - 1];

  return (
    <div className="min-h-screen gradient-hero">
      <QuizHeader />
      <main className="py-8">
        <QuizCard
          step={currentQuizStep}
          currentStep={currentStep}
          totalSteps={quizSteps.length}
          userData={userData}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
        />
      </main>
    </div>
  );
};

export default Index;
