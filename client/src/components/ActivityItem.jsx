import React from 'react';
import { Link } from 'react-router-dom';

const ActivityItem = ({ activity }) => {
  const { type, user, project, createdAt } = activity;

  const getIcon = () => {
    switch (type) {
      case 'project_created':
        return <i className="fas fa-plus-circle" style={{ color: 'var(--secondary-color)', fontSize: '20px', marginRight: '15px' }}></i>;
      case 'project_joined':
        return <i className="fas fa-user-plus" style={{ color: 'var(--primary-color)', fontSize: '20px', marginRight: '15px' }}></i>;
      case 'project_completed':
        return <i className="fas fa-check-circle" style={{ color: 'var(--accent-color)', fontSize: '20px', marginRight: '15px' }}></i>;
      case 'project_updated':
        return <i className="fas fa-file-alt" style={{ color: 'var(--gray-color)', fontSize: '20px', marginRight: '15px' }}></i>;
      default:
        return <i className="fas fa-bell" style={{ color: 'var(--gray-color)', fontSize: '20px', marginRight: '15px' }}></i>;
    }
  };

  const getMessage = () => {
    switch (type) {
      case 'project_created':
        return (
          <p>
            <strong>{user.name}</strong> 創建了新專案 <strong>{project.name}</strong>
          </p>
        );
      case 'project_joined':
        return (
          <p>
            <strong>{user.name}</strong> 加入了專案 <strong>{project.name}</strong>
          </p>
        );
      case 'project_completed':
        return (
          <p>
            <strong>{user.name}</strong> 完成了專案 <strong>{project.name}</strong>
          </p>
        );
      case 'project_updated':
        return (
          <p>
            <strong>{user.name}</strong> 更新了專案 <strong>{project.name}</strong> 的進度
          </p>
        );
      default:
        return (
          <p>
            <strong>{user.name}</strong> 有新的活動
          </p>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '15px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
      {getIcon()}
      <div>
        {getMessage()}
        <p style={{ color: 'var(--gray-color)', fontSize: '12px' }}>{formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default ActivityItem; 