import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    role: 'user'
  });
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
    position: '',
    role: 'user',
    status: 'active'
  });

  // 部門列表
  const departments = ['研發部', '產品部', '行銷部', '業務部', '人力資源部', '財務部'];
  
  // 角色列表
  const roles = [
    { value: 'admin', label: '管理員' },
    { value: 'user', label: '一般用戶' }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 模擬從API獲取用戶數據
        // 在實際應用中，這裡應該從後端API獲取數據
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 模擬用戶數據
        const usersData = [
          {
            id: '1',
            name: '王小明',
            email: 'xiaoming.wang@example.com',
            department: '研發部',
            position: '資深AI研究員',
            role: 'admin',
            status: 'active',
            projects: 3,
            lastActive: '2023-06-18T09:30:00Z'
          },
          {
            id: '2',
            name: '李大華',
            email: 'dahua.li@example.com',
            department: '研發部',
            position: 'NLP工程師',
            role: 'user',
            status: 'active',
            projects: 2,
            lastActive: '2023-06-17T14:45:00Z'
          },
          {
            id: '3',
            name: '張小華',
            email: 'xiaohua.zhang@example.com',
            department: '產品部',
            position: '產品經理',
            role: 'user',
            status: 'active',
            projects: 4,
            lastActive: '2023-06-18T11:20:00Z'
          },
          {
            id: '4',
            name: '陳大明',
            email: 'daming.chen@example.com',
            department: '行銷部',
            position: '行銷專員',
            role: 'user',
            status: 'inactive',
            projects: 1,
            lastActive: '2023-06-10T16:30:00Z'
          },
          {
            id: '5',
            name: '林小芳',
            email: 'xiaofang.lin@example.com',
            department: '研發部',
            position: '數據科學家',
            role: 'user',
            status: 'active',
            projects: 2,
            lastActive: '2023-06-18T10:15:00Z'
          },
          {
            id: '6',
            name: '黃小玲',
            email: 'xiaoling.huang@example.com',
            department: '產品部',
            position: 'UI設計師',
            role: 'user',
            status: 'active',
            projects: 3,
            lastActive: '2023-06-17T09:45:00Z'
          },
          {
            id: '7',
            name: '趙大偉',
            email: 'dawei.zhao@example.com',
            department: '業務部',
            position: '業務經理',
            role: 'user',
            status: 'active',
            projects: 0,
            lastActive: '2023-06-16T13:20:00Z'
          },
          {
            id: '8',
            name: '劉小剛',
            email: 'xiaogang.liu@example.com',
            department: '研發部',
            position: '前端工程師',
            role: 'user',
            status: 'active',
            projects: 2,
            lastActive: '2023-06-18T08:30:00Z'
          }
        ];
        
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (err) {
        setError('獲取用戶數據失敗，請稍後再試');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    // 根據搜索條件過濾用戶
    const filterUsers = () => {
      let result = [...users];
      
      // 根據搜索詞過濾
      if (searchTerm) {
        result = result.filter(user => 
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // 根據部門過濾
      if (selectedDepartment !== 'all') {
        result = result.filter(user => user.department === selectedDepartment);
      }
      
      // 根據角色過濾
      if (selectedRole !== 'all') {
        result = result.filter(user => user.role === selectedRole);
      }
      
      setFilteredUsers(result);
    };
    
    filterUsers();
  }, [searchTerm, selectedDepartment, selectedRole, users]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = async () => {
    try {
      // 在實際應用中，這裡應該發送請求到後端API
      console.log('新增用戶:', newUser);
      
      // 模擬API請求延遲
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模擬成功響應，將新用戶添加到列表中
      const newUserId = (users.length + 1).toString();
      const createdUser = {
        id: newUserId,
        ...newUser,
        status: 'active',
        projects: 0,
        lastActive: new Date().toISOString()
      };
      
      setUsers(prev => [...prev, createdUser]);
      
      // 重置表單並關閉模態框
      setNewUser({
        name: '',
        email: '',
        department: '',
        position: '',
        role: 'user'
      });
      setShowAddUserModal(false);
      
      alert('用戶創建成功！');
    } catch (err) {
      alert('創建用戶失敗，請稍後再試');
      console.error(err);
    }
  };

  const handleChangeUserStatus = async (userId, newStatus) => {
    try {
      // 在實際應用中，這裡應該發送請求到後端API
      console.log(`更改用戶 ${userId} 狀態為 ${newStatus}`);
      
      // 模擬API請求延遲
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 更新本地狀態
      setUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, status: newStatus } 
            : user
        )
      );
      
      alert(`用戶狀態已更新為 ${newStatus === 'active' ? '啟用' : '停用'}`);
    } catch (err) {
      alert('更新用戶狀態失敗，請稍後再試');
      console.error(err);
    }
  };

  const handleChangeUserRole = async (userId, newRole) => {
    try {
      // 在實際應用中，這裡應該發送請求到後端API
      console.log(`更改用戶 ${userId} 角色為 ${newRole}`);
      
      // 模擬API請求延遲
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 更新本地狀態
      setUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, role: newRole } 
            : user
        )
      );
      
      alert(`用戶角色已更新為 ${newRole === 'admin' ? '管理員' : '一般用戶'}`);
    } catch (err) {
      alert('更新用戶角色失敗，請稍後再試');
      console.error(err);
    }
  };

  const openEditUserModal = (user) => {
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.department,
      position: user.position,
      role: user.role,
      status: user.status
    });
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async () => {
    try {
      // 在實際應用中，這裡應該發送請求到後端API
      console.log('更新用戶:', editUser);
      
      // 模擬API請求延遲
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 更新本地狀態
      setUsers(prev => 
        prev.map(user => 
          user.id === editUser.id 
            ? { ...user, ...editUser } 
            : user
        )
      );
      
      // 關閉模態框
      setShowEditUserModal(false);
      
      alert('用戶更新成功！');
    } catch (err) {
      alert('更新用戶失敗，請稍後再試');
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
            <h2>用戶管理</h2>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddUserModal(true)}
            >
              <i className="fas fa-user-plus"></i> 新增用戶
            </button>
          </div>
          
          <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ flex: 2, minWidth: '200px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="搜尋用戶名稱或電子郵件"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <select 
                  className="form-control"
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                >
                  <option value="all">所有部門</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <select 
                  className="form-control"
                  value={selectedRole}
                  onChange={handleRoleChange}
                >
                  <option value="all">所有角色</option>
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {error && (
            <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: '10px' }}></i>
              {error}
            </div>
          )}
          
          <div className="card" style={{ padding: '0', marginBottom: '20px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5' }}>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>用戶名稱</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>電子郵件</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>部門</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>職位</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>角色</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>狀態</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>專案數</th>
                  <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>最後活動</th>
                  <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid var(--border-color)' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ padding: '20px', textAlign: 'center' }}>
                      沒有找到符合條件的用戶
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
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
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '15px' }}>{user.email}</td>
                      <td style={{ padding: '15px' }}>{user.department}</td>
                      <td style={{ padding: '15px' }}>{user.position}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <select 
                          value={user.role}
                          onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
                          style={{ 
                            padding: '5px', 
                            borderRadius: '4px', 
                            border: '1px solid var(--border-color)',
                            backgroundColor: user.role === 'admin' ? 'var(--accent-light-color)' : 'transparent',
                            color: user.role === 'admin' ? 'var(--accent-color)' : 'inherit'
                          }}
                        >
                          {roles.map(role => (
                            <option key={role.value} value={role.value}>{role.label}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          backgroundColor: user.status === 'active' ? 'var(--secondary-color)' : 'var(--gray-color)',
                          color: 'white',
                          fontSize: '0.8em'
                        }}>
                          {user.status === 'active' ? '啟用' : '停用'}
                        </span>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>{user.projects}</td>
                      <td style={{ padding: '15px' }}>{new Date(user.lastActive).toLocaleString('zh-TW')}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          <Link to={`/admin/users/${user.id}`} className="btn btn-outline" style={{ padding: '5px 10px' }}>
                            <i className="fas fa-eye"></i>
                          </Link>
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '5px 10px' }}
                            onClick={() => openEditUserModal(user)}
                          >
                            <i className="fas fa-edit" style={{ color: 'var(--primary-color)' }}></i>
                          </button>
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '5px 10px' }}
                            onClick={() => handleChangeUserStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                          >
                            {user.status === 'active' ? (
                              <i className="fas fa-ban" style={{ color: 'var(--accent-color)' }}></i>
                            ) : (
                              <i className="fas fa-check-circle" style={{ color: 'var(--secondary-color)' }}></i>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>顯示 {filteredUsers.length} 個用戶中的 {filteredUsers.length} 個</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-outline" disabled>上一頁</button>
              <button className="btn btn-primary">1</button>
              <button className="btn btn-outline" disabled>下一頁</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 新增用戶模態框 */}
      {showAddUserModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            width: '500px', 
            maxWidth: '90%', 
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>新增用戶</h3>
              <button 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer' 
                }}
                onClick={() => setShowAddUserModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor="name">姓名 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={newUser.name}
                onChange={handleNewUserChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">電子郵件 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={newUser.email}
                onChange={handleNewUserChange}
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="department">部門 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <select
                  id="department"
                  name="department"
                  className="form-control"
                  value={newUser.department}
                  onChange={handleNewUserChange}
                  required
                >
                  <option value="">選擇部門</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="position">職位 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  className="form-control"
                  value={newUser.position}
                  onChange={handleNewUserChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="role">角色 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
              <select
                id="role"
                name="role"
                className="form-control"
                value={newUser.role}
                onChange={handleNewUserChange}
                required
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button 
                className="btn btn-outline"
                onClick={() => setShowAddUserModal(false)}
              >
                取消
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddUser}
                disabled={!newUser.name || !newUser.email || !newUser.department || !newUser.position}
              >
                創建用戶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 編輯用戶模態框 */}
      {showEditUserModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            width: '500px', 
            maxWidth: '90%', 
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3>編輯用戶</h3>
              <button 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer' 
                }}
                onClick={() => setShowEditUserModal(false)}
              >
                &times;
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-name">姓名 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
              <input
                type="text"
                id="edit-name"
                name="name"
                className="form-control"
                value={editUser.name}
                onChange={handleEditUserChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-email">電子郵件 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
              <input
                type="email"
                id="edit-email"
                name="email"
                className="form-control"
                value={editUser.email}
                onChange={handleEditUserChange}
                required
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="edit-department">部門 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <select
                  id="edit-department"
                  name="department"
                  className="form-control"
                  value={editUser.department}
                  onChange={handleEditUserChange}
                  required
                >
                  <option value="">選擇部門</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="edit-position">職位 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <input
                  type="text"
                  id="edit-position"
                  name="position"
                  className="form-control"
                  value={editUser.position}
                  onChange={handleEditUserChange}
                  required
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="edit-role">角色 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <select
                  id="edit-role"
                  name="role"
                  className="form-control"
                  value={editUser.role}
                  onChange={handleEditUserChange}
                  required
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="edit-status">狀態 <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                <select
                  id="edit-status"
                  name="status"
                  className="form-control"
                  value={editUser.status}
                  onChange={handleEditUserChange}
                  required
                >
                  <option value="active">啟用</option>
                  <option value="inactive">停用</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button 
                className="btn btn-outline"
                onClick={() => setShowEditUserModal(false)}
              >
                取消
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleUpdateUser}
                disabled={!editUser.name || !editUser.email || !editUser.department || !editUser.position}
              >
                更新用戶
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement; 