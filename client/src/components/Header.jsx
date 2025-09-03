import React from 'react';

const Header = () => {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px 0',
      marginBottom: '30px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div className="container">
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          margin: '0',
          textAlign: 'center'
        }}>
          🎓 Student Management System
        </h1>
        <p style={{
          textAlign: 'center',
          margin: '10px 0 0 0',
          opacity: '0.9',
          fontSize: '16px'
        }}>
          Manage student records efficiently and effectively
        </p>
      </div>
    </header>
  );
};

export default Header;
