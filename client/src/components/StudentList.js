import React from 'react';

const StudentList = ({ 
  students, 
  searchTerm, 
  onSearchChange, 
  onView, 
  onEdit, 
  onDelete, 
  onAdd,
  loading,
  error
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <h2 className="card-title">Student Records</h2>
          <button className="btn btn-primary" onClick={onAdd}>
            ➕ Add New Student
          </button>
        </div>
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search students by name, email, or course..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="empty-state">
          <h3>Loading...</h3>
          <p>Please wait while we fetch the student data.</p>
        </div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <h3>No students found</h3>
          <p>
            {searchTerm 
              ? `No students match your search for "${searchTerm}"`
              : "No students have been added yet. Click 'Add New Student' to get started."
            }
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Year</th>
                <th>GPA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>
                    <strong>{student.name}</strong>
                  </td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.year}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: parseFloat(student.gpa) >= 3.5 ? '#d4edda' : 
                                     parseFloat(student.gpa) >= 3.0 ? '#fff3cd' : '#f8d7da',
                      color: parseFloat(student.gpa) >= 3.5 ? '#155724' : 
                             parseFloat(student.gpa) >= 3.0 ? '#856404' : '#721c24'
                    }}>
                      {student.gpa}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-secondary" 
                        onClick={() => onView(student)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        👁️ View
                      </button>
                      <button 
                        className="btn btn-warning" 
                        onClick={() => onEdit(student)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => onDelete(student.id)}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
