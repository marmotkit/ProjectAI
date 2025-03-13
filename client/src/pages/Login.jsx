import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, error } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      if (user && user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">POC專案Booking系統</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
              {error}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">電子郵件</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="請輸入公司電子郵件"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : '登入'}
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>忘記密碼？</a>
          </div>
          
          <div style={{ marginTop: '30px', textAlign: 'center', color: 'var(--gray-color)' }}>
            <p>測試帳號：</p>
            <p>管理員：admin@example.com / admin123</p>
            <p>一般用戶：user@example.com / user123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 