import { cn } from "@/lib/utils";

interface QuizOptionProps {
  label: string;
  icon?: string;
  isSelected: boolean;
  onClick: () => void;
}

const QuizOption = ({ label, icon, isSelected, onClick }: QuizOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left",
        "flex items-center gap-4 hover:shadow-soft",
        isSelected
          ? "border-primary bg-lime-light shadow-soft"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      {icon && (
        <span className="text-2xl flex-shrink-0">{icon}</span>
      )}
      <span className={cn(
        "font-medium transition-colors",
        isSelected ? "text-forest" : "text-foreground"
      )}>
        {label}
      </span>
      <div className={cn(
        "ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
        isSelected
          ? "border-primary bg-primary"
          : "border-muted-foreground/30"
      )}>
        {isSelected && (
          <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default QuizOption;
