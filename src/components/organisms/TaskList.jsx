import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  searchTerm, 
  filter, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onCreateTask 
}) => {
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(search) ||
        (task.description && task.description.toLowerCase().includes(search))
      );
    }

    // Filter by status
    switch (filter) {
      case "active":
        filtered = filtered.filter(task => !task.completed);
        break;
      case "completed":
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        // "all" - no additional filtering
        break;
    }

    // Sort tasks: incomplete first, then by priority, then by due date
    return filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Sort by priority (high > medium > low)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
      if (priorityDiff !== 0) return priorityDiff;

      // Sort by due date (earliest first)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      // Sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, searchTerm, filter]);

  if (filteredTasks.length === 0) {
    if (searchTerm.trim()) {
      return (
        <Empty
          title="No tasks found"
          message={`No tasks match "${searchTerm}". Try adjusting your search terms.`}
          actionLabel="Clear search"
          onAction={() => {
            // This would need to be passed down from parent
            // For now, we'll just show the message
          }}
        />
      );
    }

    if (filter === "completed") {
      return (
        <Empty
          title="No completed tasks"
          message="You haven't completed any tasks yet. Get started by marking some tasks as done!"
          actionLabel="View all tasks"
          onAction={() => {
            // This would need to be passed down from parent
          }}
        />
      );
    }

    if (filter === "active") {
      return (
        <Empty
          title="All caught up!"
          message="You've completed all your active tasks. Great work! Ready to add more?"
          actionLabel="Add new task"
          onAction={onCreateTask}
        />
      );
    }

    return (
      <Empty
        title="No tasks yet"
        message="Get started by creating your first task. Stay organized and productive!"
        actionLabel="Add your first task"
        onAction={onCreateTask}
      />
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </AnimatePresence>
      
      {filteredTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-sm text-slate-500"
        >
          {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"} 
          {searchTerm.trim() && ` matching "${searchTerm}"`}
          {filter !== "all" && ` (${filter})`}
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;