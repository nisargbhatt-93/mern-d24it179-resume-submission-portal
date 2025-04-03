// frontend/src/ResumeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/resumes');
        setResumes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResumes();
  }, []);

  return (
    <div>
      <h1>Resume List</h1>
      <ul>
        {resumes.map((resume) => (
          <li key={resume._id}>
            <h2>{resume.name}</h2>
            <p>Email: {resume.email}</p>
            <p>Phone: {resume.phone}</p>
            <p>Resume: <a href={resume.resume} target="_blank">View Resume</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;