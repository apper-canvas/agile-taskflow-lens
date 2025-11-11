import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({ 
  className,
  checked,
  onChange,
  label,
  ...props 
}, ref) => {
  return (
    <label className="flex items-center cursor-pointer group">
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200",
            checked 
              ? "bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-600" 
              : "border-slate-300 group-hover:border-indigo-400",
            className
          )}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <ApperIcon name="Check" className="w-3 h-3 text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && (
        <span className="ml-3 text-sm text-slate-700 group-hover:text-slate-900">
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;