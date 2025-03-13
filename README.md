# POC專案Booking系統

這是一個用於管理和預訂 POC（Proof of Concept）專案的系統，提供專案創建、管理、用戶管理等功能。

## 功能特點

- 用戶認證與授權（管理員/一般用戶）
- 專案創建與管理
- 用戶管理
- 專案詳情查看
- 個人資料管理
- 管理員儀表板
- 響應式設計

## 技術棧

- 前端：React、React Router、Context API
- 後端：Node.js（模擬 API）
- 樣式：CSS、自定義組件

## 安裝與運行

### 前端

```bash
# 進入前端目錄
cd client

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

### 後端（未來實現）

```bash
# 進入後端目錄
cd server

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

## 測試帳號

- 管理員：admin@example.com / admin123
- 一般用戶：user@example.com / user123

## 頁面說明

- `/login` - 登入頁面
- `/` - 一般用戶儀表板
- `/admin` - 管理員儀表板
- `/admin/users` - 用戶管理頁面
- `/create-project` - 創建專案頁面
- `/projects/:id` - 專案詳情頁面

## 開發者

- marmotkit

## 授權

MIT 