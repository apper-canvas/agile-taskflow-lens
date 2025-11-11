import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center"
        >
          <ApperIcon name="Search" className="w-16 h-16 text-indigo-400" />
        </motion.div>

        <div>
          <h1 className="text-6xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-3">
            Page Not Found
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Looks like this page got lost in the task list! Let's get you back to organizing your work.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            variant="primary"
            size="lg"
            className="w-full"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to TaskFlow
          </Button>
          
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-500" />
              <span>Create Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Clock" className="w-4 h-4 text-amber-500" />
              <span>Set Priorities</span>
            </div>
            <div className="flex items-center gap-2">
              <ApperIcon name="Award" className="w-4 h-4 text-indigo-500" />
              <span>Get Things Done</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;