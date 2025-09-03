import React, { useState, useEffect } from 'react';
import StudentList from './components/StudentList.jsx';
import StudentForm from './components/StudentForm.jsx';
import StudentDetail from './components/StudentDetail.jsx';
import Header from './components/Header.jsx';
import Stats from './components/Stats.jsx';
import apiService from './services/api.js';

function App() {
  const [students, setStudents] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit', 'detail'
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load students from API on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to load students:', error);
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Search students using API
  const searchStudents = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.searchStudents(query);
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to search students:', error);
      setError('Failed to search students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search term change
  const handleSearchChange = (query) => {
    setSearchTerm(query);
    if (query.trim() === '') {
      loadStudents();
    } else {
      searchStudents(query);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.createStudent(studentData);
      setStudents([response.data, ...students]);
      setCurrentView('list');
    } catch (error) {
      console.error('Failed to create student:', error);
      setError(error.message || 'Failed to create student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (updatedStudent) => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug: Log the student data being sent
      console.log('Updating student with data:', updatedStudent);
      console.log('Student ID:', updatedStudent.id);
      
      if (!updatedStudent.id) {
        throw new Error('Student ID is missing. Cannot update student.');
      }
      
      const response = await apiService.updateStudent(updatedStudent.id, updatedStudent);
      setStudents(students.map(student =>
        student.id === updatedStudent.id ? response.data : student
      ));
      setCurrentView('list');
      setSelectedStudent(null);
    } catch (error) {
      console.error('Failed to update student:', error);
      setError(error.message || 'Failed to update student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        setLoading(true);
        setError(null);
        await apiService.deleteStudent(studentId);
        setStudents(students.filter(student => student.id !== studentId));
        if (selectedStudent && selectedStudent.id === studentId) {
          setSelectedStudent(null);
          setCurrentView('list');
        }
      } catch (error) {
        console.error('Failed to delete student:', error);
        setError(error.message || 'Failed to delete student. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setCurrentView('detail');
  };

  const handleEditStudent = (student) => {
    console.log('Editing student:', student);
    console.log('Student ID:', student?.id);
    setSelectedStudent(student);
    setCurrentView('edit');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStudent(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'add':
        return (
          <StudentForm
            onSubmit={handleAddStudent}
            onCancel={handleBackToList}
            title="Add New Student"
          />
        );
      case 'edit':
        return (
          <StudentForm
            student={selectedStudent}
            onSubmit={handleUpdateStudent}
            onCancel={handleBackToList}
            title="Edit Student"
          />
        );
      case 'detail':
        return (
          <StudentDetail
            student={selectedStudent}
            onEdit={() => handleEditStudent(selectedStudent)}
            onDelete={() => handleDeleteStudent(selectedStudent.id)}
            onBack={handleBackToList}
          />
        );
      default:
        return (
          <StudentList
            students={students}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onView={handleViewStudent}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            onAdd={() => setCurrentView('add')}
            loading={loading}
            error={error}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Stats students={students} />
        {renderCurrentView()}
      </div>
    </div>
  );
}

export default App;
