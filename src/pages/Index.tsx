import { useState, useCallback } from 'react';
import { AppState, UserData } from '@/types/quiz';
 import QuizIntro from '@/components/intro/QuizIntro';
import Quiz from '@/components/quiz/Quiz';
import Calculating from '@/components/calculating/Calculating';
import AnalysisComplete from '@/components/analysis/AnalysisComplete';
import Result from '@/components/results/Result';
import LandingPage from '@/components/sales/LandingPage';

const Index = () => {
   const [appState, setAppState] = useState<AppState>('intro');
  const [userData, setUserData] = useState<UserData>({});

   const handleStartQuiz = useCallback(() => {
     setAppState('quiz');
   }, []);
 
  const handleQuizComplete = useCallback((data: UserData) => {
    setUserData(data);
    setAppState('calculating');
  }, []);

  const handleCalculatingComplete = useCallback(() => {
    setAppState('result');
  }, []);

  const handleContinueToSales = useCallback(() => {
    setAppState('sales_page');
  }, []);

  // Render based on app state
   if (appState === 'intro') {
     return <QuizIntro onStart={handleStartQuiz} />;
   }
 
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
