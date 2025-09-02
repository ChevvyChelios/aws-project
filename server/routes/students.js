const express = require('express');
const router = express.Router();
const { pool } = require('../database');

// GET /api/students - Get all students
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM students ORDER BY created_at DESC');
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
      error: error.message
    });
  }
});

// GET /api/students/search - Search students
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      const [rows] = await pool.execute('SELECT * FROM students ORDER BY created_at DESC');
      return res.json({
        success: true,
        data: rows,
        count: rows.length
      });
    }

    const searchTerm = `%${q.trim()}%`;
    const [rows] = await pool.execute(
      `SELECT * FROM students 
       WHERE name LIKE ? OR email LIKE ? OR course LIKE ? 
       ORDER BY created_at DESC`,
      [searchTerm, searchTerm, searchTerm]
    );

    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error searching students:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search students',
      error: error.message
    });
  }
});

// GET /api/students/:id - Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student',
      error: error.message
    });
  }
});

// POST /api/students - Create new student
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      course,
      year,
      gpa,
      address,
      dateOfBirth,
      enrollmentDate
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !course || !year || !gpa || !address || !dateOfBirth || !enrollmentDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate GPA
    const gpaValue = parseFloat(gpa);
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      return res.status(400).json({
        success: false,
        message: 'GPA must be between 0 and 4'
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO students (name, email, phone, course, year, gpa, address, date_of_birth, enrollment_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, course, year, gpaValue, address, dateOfBirth, enrollmentDate]
    );

    // Fetch the created student
    const [newStudent] = await pool.execute('SELECT * FROM students WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent[0]
    });
  } catch (error) {
    console.error('Error creating student:', error);
    
    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create student',
      error: error.message
    });
  }
});

// PUT /api/students/:id - Update student
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      course,
      year,
      gpa,
      address,
      dateOfBirth,
      enrollmentDate
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !course || !year || !gpa || !address || !dateOfBirth || !enrollmentDate) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate GPA
    const gpaValue = parseFloat(gpa);
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      return res.status(400).json({
        success: false,
        message: 'GPA must be between 0 and 4'
      });
    }

    // Check if student exists
    const [existingStudent] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
    if (existingStudent.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await pool.execute(
      `UPDATE students 
       SET name = ?, email = ?, phone = ?, course = ?, year = ?, gpa = ?, 
           address = ?, date_of_birth = ?, enrollment_date = ?
       WHERE id = ?`,
      [name, email, phone, course, year, gpaValue, address, dateOfBirth, enrollmentDate, id]
    );

    // Fetch the updated student
    const [updatedStudent] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent[0]
    });
  } catch (error) {
    console.error('Error updating student:', error);
    
    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update student',
      error: error.message
    });
  }
});

// DELETE /api/students/:id - Delete student
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if student exists
    const [existingStudent] = await pool.execute('SELECT * FROM students WHERE id = ?', [id]);
    if (existingStudent.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await pool.execute('DELETE FROM students WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message
    });
  }
});

// GET /api/students/stats/summary - Get statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const [totalRows] = await pool.execute('SELECT COUNT(*) as total FROM students');
    const [gpaRows] = await pool.execute('SELECT AVG(gpa) as average_gpa FROM students');
    const [currentYearRows] = await pool.execute('SELECT COUNT(*) as current_year FROM students WHERE year = ?', ['2024']);
    const [graduatedRows] = await pool.execute('SELECT COUNT(*) as graduated FROM students WHERE year < ?', ['2024']);

    const stats = {
      totalStudents: totalRows[0].total,
      averageGPA: gpaRows[0].average_gpa ? parseFloat(gpaRows[0].average_gpa).toFixed(2) : '0.00',
      currentYearStudents: currentYearRows[0].current_year,
      graduatedStudents: graduatedRows[0].graduated
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

module.exports = router;
