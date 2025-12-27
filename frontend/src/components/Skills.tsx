import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="skills">
      <h1>My Skills</h1>
      <div className="skill-list">
        {skills.map(skill => (
          <div key={skill._id} className="skill-item">
            <h3>{skill.name}</h3>
            <p>Level: {skill.level}</p>
            <p>Category: {skill.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;