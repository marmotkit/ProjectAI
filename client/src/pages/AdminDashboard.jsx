import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import ActivityItem from '../components/ActivityItem';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalUsers: 0,
    pendingApprovals: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 模擬從API獲取管理員數據
        // 在實際應用中，這裡應該從後端API獲取數據
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模擬統計數據
        const statsData = {
          totalProjects: 24,
          activeProjects: 15,
          completedProjects: 9,
          totalUsers: 42,
          pendingApprovals: 5
        };
        
        // 模擬最近專案
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
        
        // 模擬最近活動
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
        
        // 模擬待審核專案
        const pendingProjectsData = [
          {
            _id: 'p1',
            name: '多模態大型語言模型研究',
            description: '研究結合視覺和語言能力的多模態大型語言模型，探索其在跨模態任務中的應用。',
            submitter: '林小芳',
            submittedDate: '2023-06-18T09:15:00Z',
            status: 'pending'
          },
          {
            _id: 'p2',
            name: 'AI在醫療影像診斷中的應用',
            description: '探索深度學習模型在醫療影像診斷中的應用，提高疾病檢測的準確率。',
            submitter: '王大偉',
            submittedDate: '2023-06-17T14:30:00Z',
            status: 'pending'
          },
          {
            _id: 'p3',
            name: '智能推薦系統優化',
            description: '優化現有的推薦系統算法，提高推薦準確率和用戶滿意度。',
            submitter: '張小玲',
            submittedDate: '2023-06-16T11:45:00Z',
            status: 'pending'
          }
        ];
        
        setStats(statsData);
        setRecentProjects(projectsData);
        setRecentActivities(activitiesData);
        setPendingProjects(pendingProjectsData);
      } catch (err) {
        setError('獲取管理員數據失敗，請稍後再試');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAdminData();
  }, []);

  const handleApproveProject = async (projectId) => {
    try {
      // 在實際應用中，這裡應該發送請求到後端API
      console.log(`批准專案 ${projectId}`);
      
      // 模擬API請求延遲
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 更新本地狀態
      setPendingProjects(prev => prev.filter(project => project._id !== projectId));
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1,
        totalProjects: prev.totalProjects + 1,
        activeProjects: prev.activeProjects + 1
      }));
      
      alert('專案已批准');
    } catch (err) {
      alert('操作失敗，請稍後再試');
      console.error(err);
    }
  };

  const handleRejectProject = async (projectId) => {
    try {
      // 在實際應用中，這裡應該發送請求到後端API
      console.log(`拒絕專案 ${projectId}`);
      
      // 模擬API請求延遲
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 更新本地狀態
      setPendingProjects(prev => prev.filter(project => project._id !== projectId));
      setStats(prev => ({
        ...prev,
        pendingApprovals: prev.pendingApprovals - 1
      }));
      
      alert('專案已拒絕');
    } catch (err) {
      alert('操作失敗，請稍後再試');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar isAdmin={true} />
        <div className="main-content">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar isAdmin={true} />
      
      <div className="main-content">
        <div className="container" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>管理員儀表板</h2>
            <div>
              <Link to="/admin/reports" className="btn btn-primary">
                <i className="fas fa-chart-bar"></i> 生成報表
              </Link>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <div className="card" style={{ flex: 1, minWidth: '180px', padding: '20px' }}>
              <h3 style={{ color: 'var(--primary-color)' }}>
                <i className="fas fa-project-diagram"></i> 總專案數
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.totalProjects}
              </p>
            </div>
            <div className="card" style={{ flex: 1, minWidth: '180px', padding: '20px' }}>
              <h3 style={{ color: 'var(--secondary-color)' }}>
                <i className="fas fa-tasks"></i> 進行中專案
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.activeProjects}
              </p>
            </div>
            <div className="card" style={{ flex: 1, minWidth: '180px', padding: '20px' }}>
              <h3 style={{ color: 'var(--accent-color)' }}>
                <i className="fas fa-check-circle"></i> 已完成專案
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.completedProjects}
              </p>
            </div>
            <div className="card" style={{ flex: 1, minWidth: '180px', padding: '20px' }}>
              <h3 style={{ color: 'var(--gray-color)' }}>
                <i className="fas fa-users"></i> 總用戶數
              </h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '10px' }}>
                {stats.totalUsers}
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div style={{ flex: 2 }}>
              <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3>待審核專案 ({stats.pendingApprovals})</h3>
                  <Link to="/admin/approvals" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                    查看全部 <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                
                {pendingProjects.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <i className="fas fa-check-circle" style={{ fontSize: '30px', color: 'var(--secondary-color)', marginBottom: '10px' }}></i>
                    <p>目前沒有待審核的專案</p>
                  </div>
                ) : (
                  pendingProjects.map(project => (
                    <div key={project._id} className="card" style={{ padding: '15px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h4>{project.name}</h4>
                          <p style={{ color: 'var(--gray-color)', fontSize: '0.9em', marginBottom: '5px' }}>
                            提交者：{project.submitter} | 提交時間：{new Date(project.submittedDate).toLocaleString('zh-TW')}
                          </p>
                          <p>{project.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            className="btn" 
                            style={{ backgroundColor: 'var(--secondary-color)', color: 'white' }}
                            onClick={() => handleApproveProject(project._id)}
                          >
                            <i className="fas fa-check"></i> 批准
                          </button>
                          <button 
                            className="btn" 
                            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
                            onClick={() => handleRejectProject(project._id)}
                          >
                            <i className="fas fa-times"></i> 拒絕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3>最近專案</h3>
                  <Link to="/admin/projects" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                    查看全部 <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                
                <div className="project-grid">
                  {recentProjects.map(project => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3>最近活動</h3>
                  <Link to="/admin/activities" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                    查看全部 <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
                
                {recentActivities.map(activity => (
                  <ActivityItem key={activity._id} activity={activity} />
                ))}
              </div>
              
              <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>快速操作</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link to="/admin/users/new" className="btn btn-outline" style={{ textAlign: 'left' }}>
                    <i className="fas fa-user-plus"></i> 新增用戶
                  </Link>
                  <Link to="/admin/projects/new" className="btn btn-outline" style={{ textAlign: 'left' }}>
                    <i className="fas fa-plus-circle"></i> 創建專案
                  </Link>
                  <Link to="/admin/announcements/new" className="btn btn-outline" style={{ textAlign: 'left' }}>
                    <i className="fas fa-bullhorn"></i> 發布公告
                  </Link>
                  <Link to="/admin/reports/generate" className="btn btn-outline" style={{ textAlign: 'left' }}>
                    <i className="fas fa-chart-line"></i> 生成報表
                  </Link>
                  <Link to="/admin/settings" className="btn btn-outline" style={{ textAlign: 'left' }}>
                    <i className="fas fa-cog"></i> 系統設定
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '15px' }}>專案分佈統計</h3>
            
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h4 style={{ marginBottom: '10px' }}>專案狀態分佈</h4>
                <div style={{ backgroundColor: '#f5f5f5', borderRadius: '4px', padding: '15px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>進行中</span>
                      <span>{stats.activeProjects} ({Math.round(stats.activeProjects / stats.totalProjects * 100)}%)</span>
                    </div>
                    <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: 'var(--primary-color)', height: '100%', width: `${Math.round(stats.activeProjects / stats.totalProjects * 100)}%` }}></div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>已完成</span>
                      <span>{stats.completedProjects} ({Math.round(stats.completedProjects / stats.totalProjects * 100)}%)</span>
                    </div>
                    <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: 'var(--secondary-color)', height: '100%', width: `${Math.round(stats.completedProjects / stats.totalProjects * 100)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>待審核</span>
                      <span>{stats.pendingApprovals} ({Math.round(stats.pendingApprovals / (stats.totalProjects + stats.pendingApprovals) * 100)}%)</span>
                    </div>
                    <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: 'var(--accent-color)', height: '100%', width: `${Math.round(stats.pendingApprovals / (stats.totalProjects + stats.pendingApprovals) * 100)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ flex: 1, minWidth: '300px' }}>
                <h4 style={{ marginBottom: '10px' }}>專案類型分佈</h4>
                <div style={{ backgroundColor: '#f5f5f5', borderRadius: '4px', padding: '15px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>自然語言處理</span>
                      <span>8 (33%)</span>
                    </div>
                    <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: '#4285f4', height: '100%', width: '33%' }}></div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>電腦視覺</span>
                      <span>6 (25%)</span>
                    </div>
                    <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: '#34a853', height: '100%', width: '25%' }}></div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>生成式AI</span>
                      <span>7 (29%)</span>
                    </div>
                    <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: '#ea4335', height: '100%', width: '29%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>其他</span>
                      <span>3 (13%)</span>
                    </div>
                    <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ backgroundColor: '#fbbc05', height: '100%', width: '13%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard; 