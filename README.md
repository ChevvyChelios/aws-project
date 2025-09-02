# Student Management System

A full-stack web application for managing student records with a React frontend and Express.js backend using MySQL database.

## 🏗️ Architecture

```
student-management-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── ...
│   └── package.json
├── server/                 # Express.js backend
│   ├── routes/            # API routes
│   ├── database.js        # MySQL connection
│   ├── server.js          # Express server
│   └── package.json
└── package.json           # Root package.json
```

## ✨ Features

### Frontend (React)
- 📊 **Dashboard with Statistics** - Real-time student statistics
- 👥 **Student List** - Responsive table with search functionality
- ➕ **Add Students** - Form with comprehensive validation
- ✏️ **Edit Students** - Update existing student information
- 👁️ **View Details** - Detailed student profile view
- 🗑️ **Delete Students** - Remove students with confirmation
- 🔍 **Search & Filter** - Real-time search across multiple fields
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Loading States** - User-friendly loading indicators
- 🚨 **Error Handling** - Comprehensive error management

### Backend (Express.js + MySQL)
- 🔌 **RESTful API** - Complete CRUD operations
- 🗄️ **MySQL Database** - Persistent data storage
- 🔍 **Search Endpoints** - Advanced search functionality
- 📊 **Statistics API** - Real-time analytics
- ✅ **Data Validation** - Server-side validation
- 🛡️ **Error Handling** - Robust error management
- 🔄 **Auto-initialization** - Database setup with sample data

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 14 or higher)
- **MySQL** (version 5.7 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-management-system
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up MySQL Database**
   
   Create a MySQL database:
   ```sql
   CREATE DATABASE student_management;
   ```

4. **Configure Environment Variables**
   
   Edit `server/config.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=student_management
   PORT=5000
   NODE_ENV=development
   ```

### Running the Application

#### Development Mode (Recommended)
```bash
npm run dev
```
This will start both the frontend (port 3000) and backend (port 5000) concurrently.

#### Manual Start
```bash
# Terminal 1 - Start backend
npm run server

# Terminal 2 - Start frontend
npm run client
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 📊 Database Schema

### Students Table
```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  course VARCHAR(100) NOT NULL,
  year VARCHAR(10) NOT NULL,
  gpa DECIMAL(3,2) NOT NULL,
  address TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  enrollment_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/search?q=query` - Search students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Statistics
- `GET /api/students/stats/summary` - Get student statistics

### Health Check
- `GET /health` - Server health status

## 🎯 Usage

### Adding a New Student
1. Click "Add New Student" button
2. Fill in all required fields
3. Click "Add Student" to save

### Viewing Student Details
1. Click "View" button next to any student
2. See comprehensive student information
3. Use action buttons to edit or delete

### Editing Student Information
1. Click "Edit" button next to any student
2. Modify the information in the form
3. Click "Update Student" to save changes

### Deleting a Student
1. Click "Delete" button next to any student
2. Confirm the deletion in the popup dialog

### Searching Students
Use the search bar to filter by:
- Student name
- Email address
- Course name

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with modern features
- **Fetch API** - HTTP requests

### Backend
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request parsing
- **dotenv** - Environment variables

### Database
- **MySQL** - Relational database
- **Connection Pooling** - Efficient database connections

## 🔧 Configuration

### Environment Variables

#### Server (`server/config.env`)
```env
DB_HOST=localhost          # MySQL host
DB_USER=root              # MySQL username
DB_PASSWORD=password      # MySQL password
DB_NAME=student_management # Database name
PORT=5000                 # Server port
NODE_ENV=development      # Environment
```

#### Client (`.env` in client folder)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Frontend (React)
```bash
cd client
npm run build
# Deploy the 'build' folder to your hosting service
```

### Backend (Express.js)
```bash
cd server
npm start
# Deploy to your server (Heroku, AWS, DigitalOcean, etc.)
```

### Database
- Set up MySQL on your server
- Import the database schema
- Update environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL is running
   - Verify credentials in `config.env`
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT in `config.env`
   - Kill existing processes on the port

3. **CORS Errors**
   - Check API URL in client `.env`
   - Verify server CORS configuration

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## 📞 Support

For support and questions, please open an issue in the repository.