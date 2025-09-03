import React from 'react';

const Stats = ({ students }) => {
  const totalStudents = students.length;
  const averageGPA = students.length > 0 
    ? (students.reduce((sum, student) => sum + parseFloat(student.gpa), 0) / students.length).toFixed(2)
    : '0.00';
  
  const currentYearStudents = students.filter(student => student.year === '2024').length;
  const graduatedStudents = students.filter(student => student.year < '2024').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{totalStudents}</div>
        <div className="stat-label">Total Students</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{averageGPA}</div>
        <div className="stat-label">Average GPA</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{currentYearStudents}</div>
        <div className="stat-label">Current Year</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{graduatedStudents}</div>
        <div className="stat-label">Graduated</div>
      </div>
    </div>
  );
};

export default Stats;
