import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import ActivityItem from '../components/ActivityItem';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    skills: '',
    bio: '',
    avatar: ''
  });
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 模擬從API獲取用戶資料
        // 在實際應用中，這裡應該從後端API獲取數據
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模擬用戶資料
        const userData = {
          name: '王小明',
          email: 'xiaoming.wang@example.com',
          department: '研發部',
          position: '資深AI研究員',
          skills: 'Python, TensorFlow, PyTorch, NLP, 機器學習, 深度學習',
          bio: '專注於自然語言處理和生成式AI研究，有5年相關經驗。曾參與多個大型AI專案，包括智能客服系統和內容生成引擎的開發。',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        };
        
        // 模擬用戶專案
        const userProjects = [
          {
            id: 1,
            name: '智能客服聊天機器人',
            description: '基於最新的大型語言模型開發智能客服系統，能夠處理複雜的客戶查詢並提供準確的回應。',
            tags: ['NLP', '客服', 'LLM'],
            leader: '王小明',
            currentMembers: 3,
            maxMembers: 5,
            status: 'in-progress',
            progress: 65
          },
          {
            id: 2,
            name: '醫療影像分析系統',
            description: '利用深度學習技術開發醫療影像分析系統，協助醫生診斷疾病並提高診斷準確率。',
            tags: ['醫療', '電腦視覺', '深度學習'],
            leader: '李大華',
            currentMembers: 4,
            maxMembers: 4,
            status: 'completed',
            progress: 100
          }
        ];
        
        // 模擬用戶活動
        const userActivities = [
          {
            id: 1,
            type: 'project_create',
            user: '王小明',
            project: '智能客服聊天機器人',
            createdAt: new Date(2023, 9, 15)
          },
          {
            id: 2,
            type: 'project_join',
            user: '王小明',
            project: '醫療影像分析系統',
            createdAt: new Date(2023, 8, 20)
          },
          {
            id: 3,
            type: 'project_update',
            user: '王小明',
            project: '智能客服聊天機器人',
            createdAt: new Date(2023, 10, 5)
          }
        ];
        
        setProfileData(userData);
        setProjects(userProjects);
        setActivities(userActivities);
      } catch (err) {
        setError('獲取個人資料失敗，請稍後再試');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = async () => {
    try {
      // 在實際應用中，這裡應該發送請求到後端API保存用戶資料
      console.log('保存的個人資料:', profileData);
      
      // 模擬API請求延遲
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模擬成功響應
      alert('個人資料更新成功！');
      setIsEditing(false);
    } catch (err) {
      alert('更新個人資料失敗，請稍後再試');
      console.error(err);
    }
  };
  
  const renderProfileTab = () => {
    if (isEditing) {
      return (
        <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
          <h3>編輯個人資料</h3>
          <div className="form-group">
            <label htmlFor="name">姓名</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={profileData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">電子郵件</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={profileData.email}
              onChange={handleInputChange}
              disabled
            />
            <small style={{ color: 'var(--gray-color)' }}>電子郵件不可更改</small>
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="department">部門</label>
              <input
                type="text"
                id="department"
                name="department"
                className="form-control"
                value={profileData.department}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="position">職位</label>
              <input
                type="text"
                id="position"
                name="position"
                className="form-control"
                value={profileData.position}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">技能</label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="form-control"
              value={profileData.skills}
              onChange={handleInputChange}
              placeholder="輸入您的技能，用逗號分隔"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">個人簡介</label>
            <textarea
              id="bio"
              name="bio"
              className="form-control"
              rows="4"
              value={profileData.bio}
              onChange={handleInputChange}
              placeholder="簡單介紹一下自己"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>更換頭像</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img
                src={profileData.avatar}
                alt="用戶頭像"
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <button type="button" className="btn btn-outline">選擇圖片</button>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsEditing(false)}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveProfile}
            >
              保存
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <img
              src={profileData.avatar}
              alt="用戶頭像"
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ marginBottom: '5px' }}>{profileData.name}</h3>
              <p style={{ color: 'var(--gray-color)', marginBottom: '5px' }}>{profileData.email}</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <span style={{ backgroundColor: 'var(--light-bg-color)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.9em' }}>
                  {profileData.department}
                </span>
                <span style={{ backgroundColor: 'var(--light-bg-color)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.9em' }}>
                  {profileData.position}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setIsEditing(true)}
          >
            <i className="fas fa-edit"></i> 編輯資料
          </button>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>個人簡介</h4>
          <p>{profileData.bio}</p>
        </div>
        
        <div>
          <h4>技能</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {profileData.skills.split(',').map((skill, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: 'var(--accent-light-color)',
                  color: 'var(--accent-color)',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '0.9em'
                }}
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  const renderProjectsTab = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>我的專案</h3>
          <Link to="/create-project" className="btn btn-primary">
            <i className="fas fa-plus"></i> 創建新專案
          </Link>
        </div>
        
        {projects.length === 0 ? (
          <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
            <i className="fas fa-project-diagram" style={{ fontSize: '40px', color: 'var(--gray-color)', marginBottom: '15px' }}></i>
            <h4>您還沒有參與任何專案</h4>
            <p style={{ marginBottom: '20px' }}>創建一個新專案或加入現有專案開始您的AI研究之旅</p>
            <Link to="/create-project" className="btn btn-primary">創建新專案</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderActivitiesTab = () => {
    return (
      <div>
        <h3 style={{ marginBottom: '20px' }}>最近活動</h3>
        
        {activities.length === 0 ? (
          <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
            <i className="fas fa-history" style={{ fontSize: '40px', color: 'var(--gray-color)', marginBottom: '15px' }}></i>
            <h4>暫無活動記錄</h4>
            <p>您的活動將顯示在這裡</p>
          </div>
        ) : (
          <div className="card" style={{ padding: '20px' }}>
            {activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderSettingsTab = () => {
    return (
      <div>
        <h3 style={{ marginBottom: '20px' }}>帳戶設定</h3>
        
        <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
          <h4>密碼設定</h4>
          <div className="form-group">
            <label htmlFor="current-password">當前密碼</label>
            <input
              type="password"
              id="current-password"
              className="form-control"
              placeholder="輸入當前密碼"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="new-password">新密碼</label>
            <input
              type="password"
              id="new-password"
              className="form-control"
              placeholder="輸入新密碼"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">確認新密碼</label>
            <input
              type="password"
              id="confirm-password"
              className="form-control"
              placeholder="再次輸入新密碼"
            />
          </div>
          
          <button type="button" className="btn btn-primary">更新密碼</button>
        </div>
        
        <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
          <h4>通知設定</h4>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label htmlFor="email-notifications">電子郵件通知</label>
              <label className="switch">
                <input type="checkbox" id="email-notifications" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <small style={{ color: 'var(--gray-color)' }}>接收關於專案更新、評論和邀請的電子郵件通知</small>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label htmlFor="project-notifications">專案通知</label>
              <label className="switch">
                <input type="checkbox" id="project-notifications" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <small style={{ color: 'var(--gray-color)' }}>接收關於您參與的專案的更新和變更通知</small>
          </div>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <label htmlFor="system-notifications">系統通知</label>
              <label className="switch">
                <input type="checkbox" id="system-notifications" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <small style={{ color: 'var(--gray-color)' }}>接收關於系統更新和維護的通知</small>
          </div>
          
          <button type="button" className="btn btn-primary" style={{ marginTop: '15px' }}>保存設定</button>
        </div>
        
        <div className="card" style={{ padding: '20px', backgroundColor: '#fff8f8', borderColor: '#ffcdd2' }}>
          <h4 style={{ color: '#d32f2f' }}>危險區域</h4>
          <p>刪除帳戶將永久移除您的所有數據，此操作無法撤銷。</p>
          <button type="button" className="btn" style={{ backgroundColor: '#d32f2f', color: 'white', marginTop: '10px' }}>
            刪除帳戶
          </button>
        </div>
      </div>
    );
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '30px' }}></i>
        </div>
      );
    }
    
    if (error) {
      return (
        <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '20px', borderRadius: '4px', marginTop: '20px' }}>
          <i className="fas fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
          {error}
        </div>
      );
    }
    
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'projects':
        return renderProjectsTab();
      case 'activities':
        return renderActivitiesTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return renderProfileTab();
    }
  };
  
  return (
    <>
      <Navbar />
      
      <div className="main-content">
        <div className="container" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ width: '200px' }}>
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                  <img
                    src={profileData.avatar}
                    alt="用戶頭像"
                    style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
                  />
                  <h4 style={{ margin: '5px 0' }}>{profileData.name}</h4>
                  <p style={{ color: 'var(--gray-color)', fontSize: '0.9em', margin: '0' }}>{profileData.position}</p>
                </div>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}>
                    <button
                      onClick={() => setActiveTab('profile')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: activeTab === 'profile' ? 'var(--accent-light-color)' : 'transparent',
                        color: activeTab === 'profile' ? 'var(--accent-color)' : 'inherit',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-user" style={{ marginRight: '10px', width: '20px' }}></i>
                      個人資料
                    </button>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <button
                      onClick={() => setActiveTab('projects')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: activeTab === 'projects' ? 'var(--accent-light-color)' : 'transparent',
                        color: activeTab === 'projects' ? 'var(--accent-color)' : 'inherit',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-project-diagram" style={{ marginRight: '10px', width: '20px' }}></i>
                      我的專案
                    </button>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <button
                      onClick={() => setActiveTab('activities')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: activeTab === 'activities' ? 'var(--accent-light-color)' : 'transparent',
                        color: activeTab === 'activities' ? 'var(--accent-color)' : 'inherit',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-history" style={{ marginRight: '10px', width: '20px' }}></i>
                      活動記錄
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('settings')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: activeTab === 'settings' ? 'var(--accent-light-color)' : 'transparent',
                        color: activeTab === 'settings' ? 'var(--accent-color)' : 'inherit',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-cog" style={{ marginRight: '10px', width: '20px' }}></i>
                      帳戶設定
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile; 