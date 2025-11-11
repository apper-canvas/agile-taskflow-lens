import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "default", 
  size = "sm",
  className,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium transition-all duration-200";
  
  const variants = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700",
    high: "bg-gradient-to-r from-red-100 to-red-200 text-red-700 shadow-sm shadow-red-100",
    medium: "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 shadow-sm shadow-amber-100",
    low: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-sm shadow-blue-100",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-700"
  };
  
  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;