import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectService } from '@/services/api/projectService';
import ProjectList from '@/components/organisms/ProjectList';
import ProjectForm from '@/components/organisms/ProjectForm';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import ErrorView from '@/components/ui/ErrorView';
import Empty from '@/components/ui/Empty';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    // Filter projects based on search term
    if (searchTerm.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project =>
        project.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.name_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description_c?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.Tags?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [projects, searchTerm]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const projectsData = await projectService.getAll();
      setProjects(projectsData);
      setFilteredProjects(projectsData);
    } catch (err) {
      setError('Failed to load projects');
      setProjects([]);
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const success = await projectService.delete(projectId);
      if (success) {
        await loadProjects();
      }
    }
  };

  const handleSaveProject = async (projectData) => {
    let success = false;
    
    if (editingProject) {
      const updatedProject = await projectService.update(editingProject.Id, projectData);
      success = updatedProject !== null;
    } else {
      const newProject = await projectService.create(projectData);
      success = newProject !== null;
    }

    if (success) {
      setShowForm(false);
      setEditingProject(null);
      await loadProjects();
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorView message={error} onRetry={loadProjects} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Projects</h1>
              <p className="text-slate-600">Manage your projects and track progress</p>
            </div>
            <Button
              onClick={handleCreateProject}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-lg"
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search projects..."
            />
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={handleCancelForm}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {filteredProjects.length === 0 ? (
                <Empty
                  title="No projects found"
                  description={searchTerm ? "No projects match your search criteria" : "Create your first project to get started"}
                  action={!searchTerm ? {
                    label: "Create Project",
                    onClick: handleCreateProject
                  } : null}
                />
              ) : (
                <ProjectList
                  projects={filteredProjects}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;