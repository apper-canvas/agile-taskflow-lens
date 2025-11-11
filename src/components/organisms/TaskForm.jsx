import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import PrioritySelector from "@/components/molecules/PrioritySelector";
import DatePicker from "@/components/molecules/DatePicker";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: null
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        dueDate: task.dueDate ? new Date(task.dueDate) : null
      });
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate ? formData.dueDate.toISOString() : null
    };

    onSubmit(taskData);
    
    // Reset form if creating new task
    if (!task) {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: null
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl p-6 shadow-xl border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          {task ? "Edit Task" : "Create New Task"}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
        >
          <ApperIcon name="X" className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Task Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          placeholder="Enter task title..."
          autoFocus
        />

        <Textarea
          label="Description (Optional)"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Add more details about this task..."
          rows={4}
        />

        <PrioritySelector
          label="Priority Level"
          value={formData.priority}
          onChange={(value) => handleChange("priority", value)}
        />

        <DatePicker
          label="Due Date (Optional)"
          value={formData.dueDate}
          onChange={(date) => handleChange("dueDate", date)}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            <ApperIcon name="Check" className="w-4 h-4" />
            {task ? "Update Task" : "Create Task"}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;