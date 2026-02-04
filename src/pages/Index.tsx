import { useState, useCallback } from 'react';
import { AppState, UserData } from '@/types/quiz';
import Quiz from '@/components/quiz/Quiz';
import Calculating from '@/components/calculating/Calculating';
import AnalysisComplete from '@/components/analysis/AnalysisComplete';
import Result from '@/components/results/Result';
import LandingPage from '@/components/sales/LandingPage';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('quiz');
  const [userData, setUserData] = useState<UserData>({});

  const handleQuizComplete = useCallback((data: UserData) => {
    setUserData(data);
    setAppState('calculating');
  }, []);

  const handleCalculatingComplete = useCallback(() => {
    setAppState('analysis');
  }, []);

  const handleAnalysisComplete = useCallback(() => {
    setAppState('result');
  }, []);

  const handleContinueToSales = useCallback(() => {
    setAppState('sales_page');
  }, []);

  // Render based on app state
  if (appState === 'quiz') {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  if (appState === 'calculating') {
    return (
      <Calculating
        userData={userData}
        onComplete={handleCalculatingComplete}
      />
    );
  }

  if (appState === 'analysis') {
    return <AnalysisComplete onContinue={handleAnalysisComplete} />;
  }

  if (appState === 'result') {
    return (
      <Result
        userData={userData}
        onContinue={handleContinueToSales}
      />
    );
  }

  // Sales page
  return <LandingPage userData={userData} />;
};

export default Index;
