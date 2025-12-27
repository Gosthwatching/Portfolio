import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Project {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="projects">
      <h1>My Projects</h1>
      <div className="project-list">
        {projects.map(project => (
          <div key={project._id} className="project-card">
              {project.imageUrl && <img src={`http://localhost:4000/${project.imageUrl}`} alt={project.title} />}
            <h2>{project.title}</h2>
            {project.description && <p>{project.description}</p>}
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;