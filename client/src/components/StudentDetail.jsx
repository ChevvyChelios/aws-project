import React from 'react';

const StudentDetail = ({ student, onEdit, onDelete, onBack }) => {
  if (!student) {
    return (
      <div className="card">
        <div className="empty-state">
          <h3>Student not found</h3>
          <button className="btn btn-primary" onClick={onBack}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGPAColor = (gpa) => {
    const gpaValue = parseFloat(gpa);
    if (gpaValue >= 3.5) return '#28a745';
    if (gpaValue >= 3.0) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <h2 className="card-title">Student Details</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={onBack}>
              ← Back to List
            </button>
            <button className="btn btn-warning" onClick={() => onEdit(student)}>
              ✏️ Edit Student
            </button>
            <button className="btn btn-danger" onClick={onDelete}>
              🗑️ Delete Student
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
        {/* Student Photo Placeholder */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: '#e9ecef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: '#6c757d',
            margin: '0 auto 20px',
            border: '4px solid #dee2e6'
          }}>
            👤
          </div>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{student.name}</h3>
          <div style={{
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: getGPAColor(student.gpa),
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            GPA: {student.gpa}
          </div>
        </div>

        {/* Student Information */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                Student ID
              </h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '500' }}>
                #{student.id}
              </p>

              <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                Email Address
              </h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>
                <a href={`mailto:${student.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                  {student.email}
                </a>
              </p>

              <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                Phone Number
              </h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>
                <a href={`tel:${student.phone}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                  {student.phone}
                </a>
              </p>

              <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                Course
              </h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '500' }}>
                {student.course}
              </p>
            </div>

            <div>
              <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                Graduation Year
              </h4>
              <p style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '500' }}>
                {student.year}
              </p>

              <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                Age
              </h4>
                             <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>
                 {calculateAge(student.date_of_birth || student.dateOfBirth)} years old
               </p>

              <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                Date of Birth
              </h4>
                             <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>
                 {formatDate(student.date_of_birth || student.dateOfBirth)}
               </p>

               <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 5px 0' }}>
                 Enrollment Date
               </h4>
               <p style={{ margin: '0 0 20px 0', fontSize: '16px' }}>
                 {formatDate(student.enrollment_date || student.enrollmentDate)}
               </p>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#666', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px 0' }}>
              Address
            </h4>
            <p style={{ 
              margin: '0', 
              fontSize: '16px', 
              lineHeight: '1.5',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e9ecef'
            }}>
              {student.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
