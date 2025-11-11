import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  message = "Get started by creating your first task. Stay organized and productive!", 
  actionLabel = "Add your first task",
  onAction = null 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="relative mb-8">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full p-8 shadow-lg">
          <ApperIcon 
            name="CheckCircle2" 
            className="w-16 h-16 text-indigo-400"
          />
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-2 shadow-md"
        >
          <ApperIcon name="Plus" className="w-4 h-4 text-white" />
        </motion.div>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-3 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
        {title}
      </h2>
      
      <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>

      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200"
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          {actionLabel}
        </motion.button>
      )}

      <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-slate-400">
        <div className="flex flex-col items-center gap-2">
          <div className="bg-slate-100 rounded-lg p-2">
            <ApperIcon name="List" className="w-4 h-4" />
          </div>
          <span>Organize</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-slate-100 rounded-lg p-2">
            <ApperIcon name="Clock" className="w-4 h-4" />
          </div>
          <span>Prioritize</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-slate-100 rounded-lg p-2">
            <ApperIcon name="Award" className="w-4 h-4" />
          </div>
          <span>Complete</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;