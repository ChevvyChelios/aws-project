import React, { useState, useEffect } from 'react';

const StudentForm = ({ student, onSubmit, onCancel, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '',
    gpa: '',
    address: '',
    dateOfBirth: '',
    enrollmentDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        course: student.course || '',
        year: student.year || '',
        gpa: student.gpa || '',
        address: student.address || '',
        dateOfBirth: student.date_of_birth || student.dateOfBirth || '',
        enrollmentDate: student.enrollment_date || student.enrollmentDate || ''
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    }

    if (!formData.gpa.trim()) {
      newErrors.gpa = 'GPA is required';
    } else if (isNaN(formData.gpa) || parseFloat(formData.gpa) < 0 || parseFloat(formData.gpa) > 4) {
      newErrors.gpa = 'GPA must be between 0 and 4';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.enrollmentDate.trim()) {
      newErrors.enrollmentDate = 'Enrollment date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                className={`form-control ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Course *</label>
              <select
                name="course"
                className={`form-control ${errors.course ? 'error' : ''}`}
                value={formData.course}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Engineering">Engineering</option>
                <option value="Business">Business</option>
                <option value="Economics">Economics</option>
                <option value="Psychology">Psychology</option>
                <option value="Literature">Literature</option>
              </select>
              {errors.course && <div className="error-message">{errors.course}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Graduation Year *</label>
              <select
                name="year"
                className={`form-control ${errors.year ? 'error' : ''}`}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
              {errors.year && <div className="error-message">{errors.year}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">GPA *</label>
              <input
                type="number"
                name="gpa"
                step="0.01"
                min="0"
                max="4"
                className={`form-control ${errors.gpa ? 'error' : ''}`}
                value={formData.gpa}
                onChange={handleChange}
                placeholder="Enter GPA (0-4)"
              />
              {errors.gpa && <div className="error-message">{errors.gpa}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Address *</label>
            <textarea
              name="address"
              className={`form-control ${errors.address ? 'error' : ''}`}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows="3"
            />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                className={`form-control ${errors.dateOfBirth ? 'error' : ''}`}
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Enrollment Date *</label>
              <input
                type="date"
                name="enrollmentDate"
                className={`form-control ${errors.enrollmentDate ? 'error' : ''}`}
                value={formData.enrollmentDate}
                onChange={handleChange}
              />
              {errors.enrollmentDate && <div className="error-message">{errors.enrollmentDate}</div>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {student ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
