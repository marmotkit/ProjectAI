import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ActivityItem from '../components/ActivityItem';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    inProgressProjects: 0,
    completedProjects: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 在實際應用中，這些請求應該從後端 API 獲取數據
        // 這裡使用模擬數據進行演示
        
        // 模擬獲取熱門專案
        const projectsData = [
          {
            _id: '1',
            name: 'GPT-4應用於客服自動化',
            description: '探索如何使用GPT-4模型優化客服流程，提高回覆效率和客戶滿意度。',
            tags: ['AI', '客服', '自然語言處理'],
            leader: { name: '李大明', _id: '101' },
            currentMembers: 8,
            maxMembers: 10,
            status: 'in_progress'
          },
          {
            _id: '2',
            name: '電腦視覺在產品質檢中的應用',
            description: '研究如何利用深度學習和電腦視覺技術自動化產品質量檢測流程。',
            tags: ['AI', '電腦視覺', '製造業'],
            leader: { name: '張小華', _id: '102' },
            currentMembers: 5,
            maxMembers: 8,
            status: 'in_progress'
          },
          {
            _id: '3',
            name: 'AI輔助內容創作工具',
            description: '開發一個基於AI的內容創作助手，幫助行銷團隊提高內容產出效率。',
            tags: ['AI', '內容創作', '生成式AI'],
            leader: { name: '陳小明', _id: '103' },
            currentMembers: 7,
            maxMembers: 7,
            status: 'in_progress'
          }
        ];
        
        // 模擬獲取最近活動
        const activitiesData = [
          {
            _id: 'a1',
            type: 'project_created',
            user: { name: '李大明', _id: '101' },
            project: { name: 'GPT-4應用於客服自動化', _id: '1' },
            createdAt: '2023-06-15T14:30:00Z'
          },
          {
            _id: 'a2',
            type: 'project_joined',
            user: { name: '王小明', _id: '104' },
            project: { name: '電腦視覺在產品質檢中的應用', _id: '2' },
            createdAt: '2023-06-14T10:15:00Z'
          },
          {
            _id: 'a3',
            type: 'project_completed',
            user: { name: '陳小明', _id: '103' },
            project: { name: '聊天機器人市場調研', _id: '4' },
            createdAt: '2023-06-12T16:45:00Z'
          },
          {
            _id: 'a4',
            type: 'project_updated',
            user: { name: '張小華', _id: '102' },
            project: { name: '電腦視覺在產品質檢中的應用', _id: '2' },
            createdAt: '2023-06-10T09:30:00Z'
          }
        ];
        
        // 模擬獲取統計數據
        const statsData = {
          totalProjects: 5,
          inProgressProjects: 3,
          completedProjects: 2
        };
        
        setProjects(projectsData);
        setActivities(activitiesData);
        setStats(statsData);
      } catch (err) {
        setError('獲取數據失敗，請稍後再試');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="main-content">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>歡迎回來，{user?.name || '使用者'}</h2>
            <div>
              <Link to="/create-project" className="btn btn-primary">
                <i className="fas fa-plus"></i> 創建新專案
              </Link>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div className="card" style={{ flex: 1, minWidth: '200px', padding: '20px' }}>
              <h3 style={{ color: 'var(--primary-color)' }}>
                <i className="fas fa-clipboard-list"></i> 我參與的專案
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.totalProjects}
              </p>
            </div>
            <div className="card" style={{ flex: 1, minWidth: '200px', padding: '20px' }}>
              <h3 style={{ color: 'var(--secondary-color)' }}>
                <i className="fas fa-tasks"></i> 進行中的專案
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.inProgressProjects}
              </p>
            </div>
            <div className="card" style={{ flex: 1, minWidth: '200px', padding: '20px' }}>
              <h3 style={{ color: 'var(--accent-color)' }}>
                <i className="fas fa-calendar-check"></i> 已完成的專案
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.completedProjects}
              </p>
            </div>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>熱門專案</h3>
              <Link to="/projects" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                查看全部 <i className="fas fa-arrow-right"></i>
              </Link>
            </div>
            
            <div className="project-grid">
              {projects.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>最近活動</h3>
            </div>
            
            <div className="card" style={{ padding: 0 }}>
              {activities.map(activity => (
                <ActivityItem key={activity._id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 