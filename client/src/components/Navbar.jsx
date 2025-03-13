import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ isAdmin = false }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
          {collapsed ? 'POC' : 'POC專案Booking'}
        </Link>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <i className={`fas fa-${collapsed ? 'chevron-right' : 'chevron-left'}`}></i>
        </button>
      </div>
      
      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            <i className="fas fa-user"></i>
          </div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">{user.role === 'admin' ? '管理員' : '一般用戶'}</div>
            </div>
          )}
        </div>
      )}
      
      <ul className="sidebar-nav">
        {isAdmin ? (
          <>
            <li className="sidebar-item">
              <Link to="/admin" className={`sidebar-link ${isActive('/admin')}`}>
                <i className="fas fa-tachometer-alt"></i>
                {!collapsed && <span>管理儀表板</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/projects" className={`sidebar-link ${isActive('/admin/projects')}`}>
                <i className="fas fa-project-diagram"></i>
                {!collapsed && <span>所有專案</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/users" className={`sidebar-link ${isActive('/admin/users')}`}>
                <i className="fas fa-users"></i>
                {!collapsed && <span>員工管理</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/reports" className={`sidebar-link ${isActive('/admin/reports')}`}>
                <i className="fas fa-chart-bar"></i>
                {!collapsed && <span>報表分析</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/admin/settings" className={`sidebar-link ${isActive('/admin/settings')}`}>
                <i className="fas fa-cog"></i>
                {!collapsed && <span>系統設定</span>}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar-item">
              <Link to="/" className={`sidebar-link ${isActive('/')}`}>
                <i className="fas fa-home"></i>
                {!collapsed && <span>首頁</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/my-projects" className={`sidebar-link ${isActive('/my-projects')}`}>
                <i className="fas fa-project-diagram"></i>
                {!collapsed && <span>我的專案</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/create-project" className={`sidebar-link ${isActive('/create-project')}`}>
                <i className="fas fa-plus-circle"></i>
                {!collapsed && <span>創建專案</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/notifications" className={`sidebar-link ${isActive('/notifications')}`}>
                <i className="fas fa-bell"></i>
                {!collapsed && <span>通知</span>}
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/profile" className={`sidebar-link ${isActive('/profile')}`}>
                <i className="fas fa-user-circle"></i>
                {!collapsed && <span>個人資料</span>}
              </Link>
            </li>
          </>
        )}
      </ul>
      
      <div className="sidebar-footer">
        <a href="#" className="sidebar-link" onClick={(e) => { e.preventDefault(); logout(); }}>
          <i className="fas fa-sign-out-alt"></i>
          {!collapsed && <span>登出</span>}
        </a>
      </div>
    </div>
  );
};

export default Navbar; 