import { motion } from "framer-motion";
import { format, isToday, isPast, isThisWeek } from "date-fns";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/atoms/Checkbox";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    if (isToday(date)) return "Today";
    if (isPast(date)) return "Overdue";
    if (isThisWeek(date)) return format(date, "EEEE");
    return format(date, "MMM d");
  };

  const getDueDateColor = (dueDate) => {
    if (!dueDate) return "text-slate-500";
    
    const date = new Date(dueDate);
    if (isPast(date) && !task.completed) return "text-red-600";
    if (isToday(date)) return "text-amber-600";
    return "text-slate-600";
  };

  const getPriorityBadgeVariant = (priority) => {
    const variants = {
      high: "high",
      medium: "medium", 
      low: "low"
    };
    return variants[priority] || "default";
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.Id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.Id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 group",
        task.completed 
          ? "border-green-200 bg-green-50/50" 
          : "border-slate-100 hover:shadow-md hover:border-slate-200"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="pt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-semibold text-lg mb-2 transition-all duration-200",
            task.completed 
              ? "line-through text-slate-500" 
              : "text-slate-800 group-hover:text-slate-900"
          )}>
            {task.title}
          </h3>
          
          {task.description && (
            <p className={cn(
              "text-slate-600 mb-4 leading-relaxed",
              task.completed && "line-through text-slate-400"
            )}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant={getPriorityBadgeVariant(task.priority)}>
              {task.priority} priority
            </Badge>
            
            {task.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium",
                getDueDateColor(task.dueDate)
              )}>
                <ApperIcon name="Calendar" className="w-4 h-4" />
                {formatDueDate(task.dueDate)}
              </div>
            )}
            
            <div className="text-xs text-slate-400">
              Created {format(new Date(task.createdAt), "MMM d")}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-red-600 transition-colors duration-200"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;