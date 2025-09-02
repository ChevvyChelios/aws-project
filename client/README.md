# Student Management System

A modern React application for managing student records with full CRUD operations.

## Features

- 📊 **Dashboard with Statistics** - View total students, average GPA, and enrollment statistics
- 👥 **Student List** - View all students in a responsive table with search functionality
- ➕ **Add Students** - Add new student records with comprehensive form validation
- ✏️ **Edit Students** - Update existing student information
- 👁️ **View Details** - Detailed view of individual student records
- 🗑️ **Delete Students** - Remove student records with confirmation
- 🔍 **Search & Filter** - Search students by name, email, or course
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## Student Data Fields

- Student ID (auto-generated)
- Full Name
- Email Address
- Phone Number
- Course (dropdown selection)
- Graduation Year
- GPA (0-4 scale)
- Address
- Date of Birth
- Enrollment Date

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download the project files
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## Usage

### Adding a New Student

1. Click the "Add New Student" button
2. Fill in all required fields in the form
3. Click "Add Student" to save

### Viewing Student Details

1. Click the "View" button next to any student in the list
2. See comprehensive student information including calculated age
3. Use action buttons to edit or delete the student

### Editing Student Information

1. Click the "Edit" button next to any student
2. Modify the information in the form
3. Click "Update Student" to save changes

### Deleting a Student

1. Click the "Delete" button next to any student
2. Confirm the deletion in the popup dialog

### Searching Students

Use the search bar at the top of the student list to filter by:
- Student name
- Email address
- Course name

## Sample Data

The application comes pre-loaded with sample student data to demonstrate functionality.

## Technologies Used

- React 18
- JavaScript (ES6+)
- CSS3 with modern styling
- Responsive design principles
- Form validation
- Local state management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
