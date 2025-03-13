import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const {
    _id,
    name,
    description,
    tags,
    leader,
    currentMembers,
    maxMembers,
    status
  } = project;

  const isFull = currentMembers >= maxMembers;

  return (
    <div className="card project-card">
      <div className="project-card-header">
        <h4>{name}</h4>
        <div style={{ marginTop: '5px' }}>
          {tags.map((tag, index) => (
            <span key={index} className={index === 0 ? "badge badge-primary" : "badge badge-light"}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="project-card-body">
        <p>{description}</p>
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <i className="fas fa-user-circle" style={{ color: 'var(--gray-color)', marginRight: '5px' }}></i>
            <span>專案負責人：{leader.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-users" style={{ color: 'var(--gray-color)', marginRight: '5px' }}></i>
            <span>參與人數：{currentMembers}/{maxMembers}</span>
          </div>
        </div>
      </div>
      <div className="project-card-footer">
        <div>
          {status === 'completed' ? (
            <span className="badge badge-accent">已完成</span>
          ) : status === 'in_progress' ? (
            <span className="badge badge-secondary">進行中</span>
          ) : (
            <span className="badge badge-light">未開始</span>
          )}
          {isFull && <span className="badge badge-light">已滿額</span>}
        </div>
        {isFull ? (
          <button className="btn btn-outline" disabled>參與專案</button>
        ) : (
          <Link to={`/projects/${_id}`} className="btn btn-primary">參與專案</Link>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 