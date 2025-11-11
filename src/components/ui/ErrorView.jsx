import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const ErrorView = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading your tasks. Please try again.", 
  onRetry = null 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-full p-6 mb-6">
        <ApperIcon 
          name="AlertTriangle" 
          className="w-12 h-12 text-red-500"
        />
      </div>
      
      <h2 className="text-2xl font-bold text-slate-800 mb-3 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
        {title}
      </h2>
      
      <p className="text-slate-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>

      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4" />
          Try Again
        </motion.button>
      )}

      <div className="mt-8 text-sm text-slate-500">
        <p>If the problem persists, please refresh the page</p>
      </div>
    </motion.div>
  );
};

export default ErrorView;