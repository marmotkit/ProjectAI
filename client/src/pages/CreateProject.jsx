import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    aiFields: [],
    tags: '',
    maxMembers: 5,
    requiredSkills: '',
    milestones: [{ name: '', date: '' }],
    resources: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAiFieldChange = (field) => {
    setFormData(prev => {
      const aiFields = [...prev.aiFields];
      if (aiFields.includes(field)) {
        return {
          ...prev,
          aiFields: aiFields.filter(f => f !== field)
        };
      } else {
        return {
          ...prev,
          aiFields: [...aiFields, field]
        };
      }
    });
  };

  const handleMilestoneChange = (index, field, value) => {
    setFormData(prev => {
      const milestones = [...prev.milestones];
      milestones[index] = {
        ...milestones[index],
        [field]: value
      };
      return {
        ...prev,
        milestones
      };
    });
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { name: '', date: '' }]
    }));
  };

  const removeMilestone = (index) => {
    setFormData(prev => {
      const milestones = [...prev.milestones];
      milestones.splice(index, 1);
      return {
        ...prev,
        milestones
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError(null);
      
      // 在實際應用中，這裡應該發送請求到後端 API
      // 這裡僅模擬提交過程
      console.log('提交的專案數據:', formData);
      
      // 模擬 API 請求延遲
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模擬成功響應
      alert('專案創建成功！');
      navigate('/');
    } catch (err) {
      setError('創建專案失敗，請稍後再試');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    // 在實際應用中，這裡應該將草稿保存到本地存儲或後端
    localStorage.setItem('projectDraft', JSON.stringify(formData));
    alert('草稿已保存');
  };

  return (
    <>
      <Navbar />
      
      <div className="main-content">
        <div className="container" style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Link to="/" style={{ color: 'var(--gray-color)', marginRight: '10px' }}>
              <i className="fas fa-arrow-left"></i> 返回
            </Link>
            <h2>創建新AI研究專案</h2>
          </div>
          
          <div className="card" style={{ padding: '20px', marginBottom: '30px' }}>
            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="project-name">專案名稱 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <input
                  type="text"
                  id="project-name"
                  name="name"
                  className="form-control"
                  placeholder="請輸入專案名稱"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="project-description">專案描述 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <textarea
                  id="project-description"
                  name="description"
                  className="form-control"
                  rows="5"
                  placeholder="請詳細描述專案目標、研究內容和預期成果"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="start-date">開始日期 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                  <input
                    type="date"
                    id="start-date"
                    name="startDate"
                    className="form-control"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="end-date">預計完成日期 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                  <input
                    type="date"
                    id="end-date"
                    name="endDate"
                    className="form-control"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>AI技術領域 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="nlp"
                      checked={formData.aiFields.includes('nlp')}
                      onChange={() => handleAiFieldChange('nlp')}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="nlp">自然語言處理</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="cv"
                      checked={formData.aiFields.includes('cv')}
                      onChange={() => handleAiFieldChange('cv')}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="cv">電腦視覺</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="ml"
                      checked={formData.aiFields.includes('ml')}
                      onChange={() => handleAiFieldChange('ml')}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="ml">機器學習</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="dl"
                      checked={formData.aiFields.includes('dl')}
                      onChange={() => handleAiFieldChange('dl')}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="dl">深度學習</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="rl"
                      checked={formData.aiFields.includes('rl')}
                      onChange={() => handleAiFieldChange('rl')}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="rl">強化學習</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="gen-ai"
                      checked={formData.aiFields.includes('gen-ai')}
                      onChange={() => handleAiFieldChange('gen-ai')}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="gen-ai">生成式AI</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      id="other"
                      checked={formData.aiFields.includes('other')}
                      onChange={() => handleAiFieldChange('other')}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="other">其他</label>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="project-tags">專案標籤</label>
                <input
                  type="text"
                  id="project-tags"
                  name="tags"
                  className="form-control"
                  placeholder="輸入標籤，用逗號分隔（例如：客服,自動化,GPT-4）"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="max-members">最大參與人數 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <input
                  type="number"
                  id="max-members"
                  name="maxMembers"
                  className="form-control"
                  min="1"
                  max="20"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="required-skills">所需技能</label>
                <textarea
                  id="required-skills"
                  name="requiredSkills"
                  className="form-control"
                  rows="3"
                  placeholder="請列出參與此專案所需的技能和經驗"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>里程碑設定</label>
                <div id="milestones-container">
                  {formData.milestones.map((milestone, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="里程碑名稱"
                        value={milestone.name}
                        onChange={(e) => handleMilestoneChange(index, 'name', e.target.value)}
                        style={{ flex: 2 }}
                      />
                      <input
                        type="date"
                        className="form-control"
                        value={milestone.date}
                        onChange={(e) => handleMilestoneChange(index, 'date', e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => removeMilestone(index)}
                        style={{ flex: '0 0 40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={addMilestone}
                  style={{ marginTop: '10px' }}
                >
                  <i className="fas fa-plus"></i> 添加里程碑
                </button>
              </div>
              
              <div className="form-group">
                <label htmlFor="project-resources">所需資源</label>
                <textarea
                  id="project-resources"
                  name="resources"
                  className="form-control"
                  rows="3"
                  placeholder="請描述專案所需的資源，如計算資源、數據集、API等"
                  value={formData.resources}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <div className="form-group">
                <label>上傳相關文件</label>
                <div style={{ border: '2px dashed var(--border-color)', padding: '20px', textAlign: 'center', borderRadius: '4px' }}>
                  <i className="fas fa-cloud-upload-alt" style={{ fontSize: '30px', color: 'var(--gray-color)', marginBottom: '10px' }}></i>
                  <p>拖放文件到此處或</p>
                  <button type="button" className="btn btn-outline" style={{ marginTop: '10px' }}>瀏覽文件</button>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                <button type="button" className="btn btn-outline" onClick={handleSaveDraft}>儲存為草稿</button>
                <div>
                  <Link to="/" className="btn btn-outline" style={{ marginRight: '10px' }}>取消</Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <i className="fas fa-spinner fa-spin"></i> : '提交專案'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject; 