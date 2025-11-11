import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "All Tasks", count: null },
    { key: "active", label: "Active", count: null },
    { key: "completed", label: "Completed", count: null }
  ];

  return (
    <div className="flex gap-2">
      {filters.map((filter) => (
        <motion.button
          key={filter.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            activeFilter === filter.key
              ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200"
              : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
          )}
        >
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};

export default FilterButtons;