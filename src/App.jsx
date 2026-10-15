import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">BD Reels</h1>
        <div className="header-icons">
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">🔔</button>
        </div>
      </header>

      <main className="content">
        {activeTab === 'home' && (
          <div className="feed">
            <div className="video-card">
              <div className="video-placeholder">
                <div className="play-icon">▶</div>
                <p className="placeholder-text">ভিডিও ফিড শীঘ্রই আসছে</p>
                <p className="placeholder-sub">শীঘ্রই এখানে বাংলা শর্ট ভিডিও দেখতে পাবেন</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="page-placeholder">
            <h2>🔍 খুঁজুন</h2>
            <p>সার্চ ফিচার শীঘ্রই আসছে</p>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="page-placeholder">
            <h2>➕ আপলোড</h2>
            <p>ভিডিও আপলোড শীঘ্রই আসছে</p>
          </div>
        )}

        {activeTab === 'notification' && (
          <div className="page-placeholder">
            <h2>🔔 নোটিফিকেশন</h2>
            <p>কোনো নোটিফিকেশন নেই</p>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="page-placeholder">
            <h2>👤 প্রোফাইল</h2>
            <p>আপনার প্রোফাইল শীঘ্রই আসছে</p>
          </div>
        )}
      </main>

      <nav className="bottom-nav">
        <button
          className={activeTab === 'home' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('home')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">হোম</span>
        </button>
        <button
          className={activeTab === 'search' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('search')}
        >
          <span className="nav-icon">🔍</span>
          <span className="nav-label">খুঁজুন</span>
        </button>
        <button
          className={activeTab === 'upload' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('upload')}
        >
          <span className="nav-icon add-icon">➕</span>
        </button>
        <button
          className={activeTab === 'notification' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('notification')}
        >
          <span className="nav-icon">🔔</span>
          <span className="nav-label">নোটিফিকেশন</span>
        </button>
        <button
          className={activeTab === 'profile' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setActiveTab('profile')}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-label">প্রোফাইল</span>
        </button>
      </nav>
    </div>
  )
}

export default App
