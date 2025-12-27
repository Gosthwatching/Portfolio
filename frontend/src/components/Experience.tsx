import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Experience {
  _id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/experiences');
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <div className="experience">
      <h1>My Experience</h1>
      <div className="experience-list">
           {experiences.map(exp => (
             <div key={exp._id} className="experience-item">
               <h3>{exp.position} at {exp.company}</h3>
               <p>{exp.startDate} - {exp.endDate || 'Present'}</p>
               <p>{exp.description}</p>
             </div>
           ))}
      </div>
    </div>
  );
};

export default Experience;