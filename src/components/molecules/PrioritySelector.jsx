import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const PrioritySelector = ({ value, onChange, label }) => {
  const priorities = [
    { value: "low", label: "Low Priority", color: "blue", icon: "ArrowDown" },
    { value: "medium", label: "Medium Priority", color: "amber", icon: "Minus" },
    { value: "high", label: "High Priority", color: "red", icon: "ArrowUp" }
  ];

  const getColorClasses = (color, isSelected = false) => {
    const colors = {
      blue: isSelected ? "bg-blue-100 text-blue-700 border-blue-300" : "text-blue-600 hover:bg-blue-50",
      amber: isSelected ? "bg-amber-100 text-amber-700 border-amber-300" : "text-amber-600 hover:bg-amber-50",
      red: isSelected ? "bg-red-100 text-red-700 border-red-300" : "text-red-600 hover:bg-red-50"
    };
    return colors[color];
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => onChange(priority.value)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all duration-200",
              value === priority.value 
                ? getColorClasses(priority.color, true)
                : "border-slate-200 hover:border-slate-300 " + getColorClasses(priority.color)
            )}
          >
            <ApperIcon 
              name={priority.icon} 
              className="w-4 h-4" 
            />
            <span className="font-medium">{priority.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;