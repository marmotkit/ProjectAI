import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [members, setMembers] = useState([]);
  const [resources, setResources] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 在實際應用中，這些請求應該從後端 API 獲取數據
        // 這裡使用模擬數據進行演示
        
        // 模擬獲取專案詳情
        const projectData = {
          _id: '1',
          name: 'GPT-4應用於客服自動化',
          description: '本專案旨在探索如何使用GPT-4模型優化客服流程，提高回覆效率和客戶滿意度。我們將研究如何將GPT-4應用於自動回覆常見問題、情感分析、多語言支援等方面，並開發一個原型系統進行測試和評估。',
          tags: ['AI', '客服', '自然語言處理'],
          leader: { name: '李大明', _id: '101', role: '專案負責人', department: 'AI研究員' },
          startDate: '2023-06-01',
          endDate: '2023-08-31',
          currentMembers: 8,
          maxMembers: 10,
          status: 'in_progress',
          progress: 45,
          milestones: [
            { name: '需求分析', status: 'completed', date: '2023-06-15' },
            { name: '模型選擇', status: 'completed', date: '2023-06-30' },
            { name: '原型開發', status: 'in_progress', date: null },
            { name: '測試評估', status: 'not_started', date: null },
            { name: '成果報告', status: 'not_started', date: null }
          ],
          outcomes: [
            'GPT-4在客服場景中的應用研究報告',
            '客服自動化原型系統',
            '效能評估和改進建議'
          ]
        };
        
        // 模擬獲取專案更新
        const updatesData = [
          {
            _id: 'u1',
            title: '原型系統開發進度更新',
            content: '我們已經完成了GPT-4 API的整合，並成功實現了基本的自動回覆功能。目前正在優化回覆的準確性和相關性，下一步將進行多語言支援的開發。',
            author: { name: '李大明', _id: '101' },
            date: '2023-07-15'
          },
          {
            _id: 'u2',
            title: '模型選擇完成',
            content: '經過對比分析，我們決定使用GPT-4作為主要模型，並使用fine-tuning技術針對客服場景進行優化。我們已經準備了訓練數據集，包含常見客服問題和回覆。',
            author: { name: '張小華', _id: '102' },
            date: '2023-06-30'
          },
          {
            _id: 'u3',
            title: '需求分析完成',
            content: '我們完成了客服部門的需求調研，確定了以下關鍵需求：自動回覆常見問題、情感分析、多語言支援、客服人員輔助工具。這些需求將指導我們的後續開發工作。',
            author: { name: '李大明', _id: '101' },
            date: '2023-06-15'
          }
        ];
        
        // 模擬獲取專案成員
        const membersData = [
          { _id: '101', name: '李大明', role: '專案負責人', department: 'AI研究員' },
          { _id: '102', name: '張小華', role: '成員', department: 'NLP工程師' },
          { _id: '104', name: '王小明', role: '成員', department: '前端開發' },
          { _id: '105', name: '林小芳', role: '成員', department: '數據分析師' },
          { _id: '106', name: '陳大偉', role: '成員', department: '後端開發' },
          { _id: '107', name: '黃小玲', role: '成員', department: '產品經理' },
          { _id: '108', name: '劉小剛', role: '成員', department: 'UI設計師' },
          { _id: '109', name: '趙小雯', role: '成員', department: '測試工程師' }
        ];
        
        // 模擬獲取專案資源
        const resourcesData = [
          { _id: 'r1', name: '需求分析報告.pdf', type: 'pdf', url: '#' },
          { _id: 'r2', name: '專案啟動簡報.pptx', type: 'powerpoint', url: '#' },
          { _id: 'r3', name: '測試數據集.xlsx', type: 'excel', url: '#' },
          { _id: 'r4', name: '專案GitHub倉庫', type: 'github', url: '#' }
        ];
        
        // 模擬獲取專案討論
        const commentsData = [
          {
            _id: 'c1',
            author: { name: '張小華', _id: '102' },
            content: '我們是否考慮過使用Azure OpenAI服務而不是直接使用OpenAI API？Azure可能提供更好的企業級支援和合規性。',
            date: '2023-07-10T15:30:00Z',
            replies: [
              {
                _id: 'r1',
                author: { name: '李大明', _id: '101' },
                content: '這是個好建議，我們將在下次會議中討論這個選項。Azure確實提供了更好的企業整合選項。',
                date: '2023-07-10T16:15:00Z'
              }
            ]
          },
          {
            _id: 'c2',
            author: { name: '王小明', _id: '104' },
            content: '前端界面的設計稿已經完成，我已經上傳到共享文件夾中。請大家查看並提供反饋。',
            date: '2023-07-05T09:45:00Z',
            replies: []
          }
        ];
        
        setProject(projectData);
        setUpdates(updatesData);
        setMembers(membersData);
        setResources(resourcesData);
        setComments(commentsData);
      } catch (err) {
        setError('獲取專案詳情失敗，請稍後再試');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleJoinProject = async () => {
    // 在實際應用中，這裡應該發送請求到後端 API
    alert('已發送加入專案請求');
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // 在實際應用中，這裡應該發送請求到後端 API
    const newCommentObj = {
      _id: `c${comments.length + 1}`,
      author: { name: '當前用戶', _id: 'current' },
      content: newComment,
      date: new Date().toISOString(),
      replies: []
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="main-content">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
          </div>
        </div>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="main-content">
          <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>錯誤</h2>
            <p>{error || '找不到專案'}</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>返回首頁</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="main-content">
        <div className="container" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Link to="/" style={{ color: 'var(--gray-color)', marginRight: '10px' }}>
              <i className="fas fa-arrow-left"></i> 返回
            </Link>
            <h2>{project.name}</h2>
          </div>
          
          <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ marginBottom: '10px' }}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={index === 0 ? "badge badge-primary" : "badge badge-light"} style={{ marginRight: '5px' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <i className="fas fa-user-circle" style={{ color: 'var(--gray-color)', marginRight: '5px' }}></i>
                  <span>專案負責人：{project.leader.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <i className="fas fa-calendar-alt" style={{ color: 'var(--gray-color)', marginRight: '5px' }}></i>
                  <span>開始日期：{project.startDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-calendar-check" style={{ color: 'var(--gray-color)', marginRight: '5px' }}></i>
                  <span>預計完成日期：{project.endDate}</span>
                </div>
              </div>
              <div>
                <button className="btn btn-primary" onClick={handleJoinProject}>
                  <i className="fas fa-user-plus"></i> 參與專案
                </button>
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>專案描述</h3>
              <p>{project.description}</p>
              {project.outcomes && project.outcomes.length > 0 && (
                <>
                  <p style={{ marginTop: '10px' }}>專案成果將包括：</p>
                  <ul style={{ marginLeft: '20px', marginTop: '5px' }}>
                    {project.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>專案進度</h3>
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '4px', height: '20px', overflow: 'hidden', marginBottom: '5px' }}>
                <div style={{ backgroundColor: 'var(--secondary-color)', height: '100%', width: `${project.progress}%` }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{project.progress}% 完成</span>
                <span>預計完成時間：{project.endDate}</span>
              </div>
            </div>
            
            <div>
              <h3 style={{ marginBottom: '10px' }}>專案里程碑</h3>
              <div style={{ display: 'flex', marginBottom: '20px', overflowX: 'auto' }}>
                {project.milestones.map((milestone, index) => (
                  <div key={index} style={{ minWidth: '200px', marginRight: index < project.milestones.length - 1 ? '20px' : 0, textAlign: 'center' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: milestone.status === 'completed' 
                        ? 'var(--secondary-color)' 
                        : milestone.status === 'in_progress' 
                          ? 'var(--primary-color)' 
                          : 'var(--border-color)', 
                      color: 'white', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      margin: '0 auto' 
                    }}>
                      {milestone.status === 'completed' ? (
                        <i className="fas fa-check"></i>
                      ) : milestone.status === 'in_progress' ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-hourglass-start"></i>
                      )}
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '3px', 
                      backgroundColor: milestone.status === 'completed' || milestone.status === 'in_progress' 
                        ? 'var(--secondary-color)' 
                        : 'var(--border-color)', 
                      margin: '10px 0' 
                    }}></div>
                    <h4>{milestone.name}</h4>
                    <p style={{ color: 'var(--gray-color)', fontSize: '12px' }}>
                      {milestone.status === 'completed' 
                        ? `${milestone.date} 完成` 
                        : milestone.status === 'in_progress' 
                          ? '進行中' 
                          : '未開始'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div style={{ flex: 2 }}>
              <div className="card" style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>專案更新</h3>
                
                {updates.map((update, index) => (
                  <div key={update._id} style={{ 
                    borderLeft: '3px solid var(--primary-color)', 
                    paddingLeft: '15px', 
                    marginBottom: index < updates.length - 1 ? '20px' : 0 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <h4>{update.title}</h4>
                      <span style={{ color: 'var(--gray-color)', fontSize: '12px' }}>{update.date}</span>
                    </div>
                    <p>{update.content}</p>
                    <p style={{ color: 'var(--gray-color)', marginTop: '5px' }}>更新者：{update.author.name}</p>
                  </div>
                ))}
                
                {updates.length > 3 && (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button className="btn btn-outline">查看更多更新</button>
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ flex: 1 }}>
              <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>專案成員 ({members.length}/{project.maxMembers})</h3>
                
                {members.slice(0, 3).map(member => (
                  <div key={member._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      backgroundColor: member._id === project.leader._id ? 'var(--primary-color)' : 'var(--gray-color)', 
                      color: 'white', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      marginRight: '10px' 
                    }}>
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <p><strong>{member.name}</strong> {member._id === project.leader._id ? '(專案負責人)' : ''}</p>
                      <p style={{ color: 'var(--gray-color)', fontSize: '12px' }}>{member.department}</p>
                    </div>
                  </div>
                ))}
                
                {members.length > 3 && (
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button className="btn btn-outline">查看全部成員</button>
                  </div>
                )}
              </div>
              
              <div className="card" style={{ padding: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>資源與文件</h3>
                
                {resources.map(resource => (
                  <div key={resource._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <i className={`fas fa-file-${resource.type === 'pdf' ? 'pdf' : resource.type === 'powerpoint' ? 'powerpoint' : resource.type === 'excel' ? 'excel' : resource.type === 'github' ? 'github' : 'alt'}`} style={{ 
                      color: resource.type === 'pdf' || resource.type === 'powerpoint' ? 'var(--accent-color)' : resource.type === 'excel' ? 'var(--secondary-color)' : 'var(--dark-color)', 
                      fontSize: '20px', 
                      marginRight: '10px' 
                    }}></i>
                    <a href={resource.url} style={{ textDecoration: 'none', color: 'var(--dark-color)' }}>{resource.name}</a>
                  </div>
                ))}
                
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <button className="btn btn-outline">上傳新文件</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>討論區</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <form onSubmit={handleSubmitComment}>
                <div className="form-group">
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="發表評論或提問..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <button type="submit" className="btn btn-primary">發表</button>
                </div>
              </form>
            </div>
            
            {comments.map((comment, index) => (
              <div key={comment._id} style={{ 
                borderBottom: index < comments.length - 1 ? '1px solid var(--border-color)' : 'none', 
                paddingBottom: index < comments.length - 1 ? '15px' : 0, 
                marginBottom: index < comments.length - 1 ? '15px' : 0 
              }}>
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: 'var(--gray-color)', 
                    color: 'white', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    marginRight: '10px' 
                  }}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <p><strong>{comment.author.name}</strong></p>
                      <span style={{ color: 'var(--gray-color)', fontSize: '12px' }}>
                        {new Date(comment.date).toLocaleString('zh-TW')}
                      </span>
                    </div>
                    <p>{comment.content}</p>
                    <div style={{ marginTop: '10px' }}>
                      <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '12px' }}>回覆</button>
                    </div>
                  </div>
                </div>
                
                {comment.replies.map(reply => (
                  <div key={reply._id} style={{ display: 'flex', marginLeft: '50px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--primary-color)', 
                      color: 'white', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      marginRight: '10px' 
                    }}>
                      <i className="fas fa-user"></i>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <p><strong>{reply.author.name}</strong></p>
                        <span style={{ color: 'var(--gray-color)', fontSize: '12px' }}>
                          {new Date(reply.date).toLocaleString('zh-TW')}
                        </span>
                      </div>
                      <p>{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            
            {comments.length > 2 && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button className="btn btn-outline">查看更多討論</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails; 