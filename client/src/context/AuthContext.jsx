import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // 檢查本地存儲中是否有用戶數據
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        // 實際應用中，這裡應該從後端驗證 token
        const token = localStorage.getItem('token');
        if (token && !storedUser) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          try {
            const res = await axios.get('/api/auth/user');
            setUser(res.data);
          } catch (apiErr) {
            console.log('API 請求失敗，使用模擬數據');
            // 如果 API 請求失敗，使用模擬數據
            if (token === 'admin-token') {
              const adminUser = {
                id: '1',
                name: '王小明',
                email: 'admin@example.com',
                role: 'admin'
              };
              setUser(adminUser);
              localStorage.setItem('user', JSON.stringify(adminUser));
            } else if (token === 'user-token') {
              const regularUser = {
                id: '2',
                name: '李大華',
                email: 'user@example.com',
                role: 'user'
              };
              setUser(regularUser);
              localStorage.setItem('user', JSON.stringify(regularUser));
            }
          }
        }
      } catch (err) {
        console.error('驗證錯誤:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setError(err.response?.data?.message || '驗證失敗');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // 嘗試通過 API 登錄
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return true;
      } catch (apiErr) {
        console.log('API 登錄失敗，使用模擬登錄');
        
        // 模擬登錄邏輯
        if (email === 'admin@example.com' && password === 'admin123') {
          const adminUser = {
            id: '1',
            name: '王小明',
            email: 'admin@example.com',
            role: 'admin'
          };
          localStorage.setItem('token', 'admin-token');
          localStorage.setItem('user', JSON.stringify(adminUser));
          setUser(adminUser);
          return true;
        } else if (email === 'user@example.com' && password === 'user123') {
          const regularUser = {
            id: '2',
            name: '李大華',
            email: 'user@example.com',
            role: 'user'
          };
          localStorage.setItem('token', 'user-token');
          localStorage.setItem('user', JSON.stringify(regularUser));
          setUser(regularUser);
          return true;
        } else {
          throw new Error('無效的電子郵件或密碼');
        }
      }
    } catch (err) {
      setError(err.message || '登入失敗');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 