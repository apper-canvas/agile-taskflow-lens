import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const handleEdit = () => onEdit(project);
  const handleDelete = () => onDelete(project.Id);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Unknown';
    }
  };

  const getTags = (tagsString) => {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-1 line-clamp-2">
            {project.Name || project.name_c || 'Untitled Project'}
          </h3>
          {project.description_c && (
            <p className="text-slate-600 text-sm line-clamp-3 mb-3">
              {project.description_c}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1 ml-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="text-slate-500 hover:text-indigo-600 p-2"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-slate-500 hover:text-red-600 p-2"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tags */}
      {project.Tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {getTags(project.Tags).map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ApperIcon name="Calendar" className="w-3 h-3" />
          <span>
            {project.ModifiedOn ? `Updated ${formatDate(project.ModifiedOn)}` : 
             project.CreatedOn ? `Created ${formatDate(project.CreatedOn)}` : 
             'No date available'}
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <ApperIcon name="Folder" className="w-3 h-3" />
          <span>Project</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;