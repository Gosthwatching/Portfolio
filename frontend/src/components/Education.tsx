import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Education {
  _id: string;
  degree: string;
  institution: string;
  year: number;
  description?: string;
}

const Education: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/education');
        setEducations(response.data);
      } catch (error) {
        console.error('Error fetching educations:', error);
      }
    };
    fetchEducations();
  }, []);

  return (
    <div className="education">
      <h1>My Education</h1>
      <div className="education-list">
        {educations.map(edu => (
          <div key={edu._id} className="education-item">
              <h3>{edu.degree} in {edu.field}</h3>
              <p>{edu.school}</p>
              <p>{edu.startDate} - {edu.endDate}</p>
            {edu.description && <p>{edu.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;