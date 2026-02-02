import { cn } from "@/lib/utils";

interface QuizInputProps {
  type: 'text' | 'number';
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

const QuizInput = ({ type, value, onChange, placeholder }: QuizInputProps) => {
  return (
    <div className="w-full">
      <input
        type={type}
        value={value ?? ''}
        onChange={(e) => {
          const val = type === 'number' ? Number(e.target.value) : e.target.value;
          onChange(val);
        }}
        placeholder={placeholder}
        className={cn(
          "w-full p-4 text-lg rounded-xl border-2 border-border",
          "bg-card text-foreground placeholder:text-muted-foreground",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "transition-all duration-300"
        )}
      />
    </div>
  );
};

export default QuizInput;
