import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="animate-pulse space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-48"></div>
        <div className="h-10 bg-gradient-to-r from-indigo-200 to-indigo-300 rounded-lg w-32"></div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-12 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl w-full max-w-md"></div>

      {/* Filter Buttons Skeleton */}
      <div className="flex gap-2">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-20"></div>
        ))}
      </div>

      {/* Task Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: item * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md mt-0.5"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-5/6"></div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-6 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full w-20"></div>
                  <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-24"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Shimmer Effect Overlay */}
      <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
    </div>
  );
};

export default Loading;