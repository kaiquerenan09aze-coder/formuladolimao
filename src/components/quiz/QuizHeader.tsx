const QuizHeader = () => {
  return (
    <header className="w-full py-4 px-4 bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
      <div className="max-w-xl mx-auto flex items-center justify-center gap-2">
        <span className="text-3xl">🍋</span>
        <h1 className="font-display font-bold text-xl text-forest">
          Fórmula do Limão
        </h1>
      </div>
    </header>
  );
};

export default QuizHeader;
