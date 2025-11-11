import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import ApperIcon from '@/components/ApperIcon';

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: '',
    name_c: '',
    Tags: '',
    description_c: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        Name: project.Name || '',
        name_c: project.name_c || '',
        Tags: project.Tags || '',
        description_c: project.description_c || ''
      });
    }
  }, [project]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Name?.trim()) {
      newErrors.Name = 'Project name is required';
    }

    if (!formData.name_c?.trim()) {
      newErrors.name_c = 'Project identifier is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const isEditing = !!project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
            <ApperIcon name="Folder" className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {isEditing ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isEditing ? 'Update project information' : 'Fill in the details for your new project'}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-700"
        >
          <ApperIcon name="X" className="w-4 h-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Name *
            </label>
            <Input
              value={formData.Name}
              onChange={(e) => handleInputChange('Name', e.target.value)}
              placeholder="Enter project name"
              error={!!errors.Name}
            />
            {errors.Name && (
              <p className="text-red-600 text-sm mt-1">{errors.Name}</p>
            )}
          </div>

          {/* Project Identifier */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Identifier *
            </label>
            <Input
              value={formData.name_c}
              onChange={(e) => handleInputChange('name_c', e.target.value)}
              placeholder="Enter project identifier"
              error={!!errors.name_c}
            />
            {errors.name_c && (
              <p className="text-red-600 text-sm mt-1">{errors.name_c}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tags
          </label>
          <Input
            value={formData.Tags}
            onChange={(e) => handleInputChange('Tags', e.target.value)}
            placeholder="Enter tags separated by commas (e.g., web, mobile, api)"
          />
          <p className="text-slate-500 text-xs mt-1">
            Use commas to separate multiple tags
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <Textarea
            value={formData.description_c}
            onChange={(e) => handleInputChange('description_c', e.target.value)}
            placeholder="Describe your project goals, scope, and key features..."
            rows={4}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{isEditing ? 'Updating...' : 'Creating...'}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ApperIcon name={isEditing ? "Save" : "Plus"} className="w-4 h-4" />
                <span>{isEditing ? 'Update Project' : 'Create Project'}</span>
              </div>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectForm;