import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [toast, setToast] = useState('')
  const recognitionRef = useRef(null)

  const platforms = [
    { name: 'TikTok', color: '#ff0050', icon: '🎵' },
    { name: 'Instagram', color: '#E1306C', icon: '📸' },
    { name: 'Facebook', color: '#1877F2', icon: '👥' },
    { name: 'YouTube', color: '#FF0000', icon: '▶' },
  ]

  const recentDownloads = [
    { title: 'Funny TikTok Video', platform: 'TikTok', time: '২ ঘণ্টা আগে', icon: '🎵' },
    { title: 'Instagram Reel #2024', platform: 'Instagram', time: '৫ ঘণ্টা আগে', icon: '📸' },
  ]

  // Toast notification
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  // Clipboard paste
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      showToast('✅ লিংক পেস্ট হয়েছে')
    } catch {
      showToast('❌ Clipboard পড়া যায়নি')
    }
  }

  // Voice Search
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      showToast('❌ আপনার ব্রাউজারে Voice সাপোর্ট করে না')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'bn-BD'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
      showToast('🎤 বলুন...')
    }

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setSearchQuery(text)
      showToast('✅ ' + text)
    }

    recognition.onerror = () => {
      setIsListening(false)
      showToast('❌ ভয়েস শোনা যায়নি')
    }

    recognition.onend = () => setIsListening(false)

    recognition.start()
    recognitionRef.current = recognition
  }

  // Download trigger
  const handleDownload = () => {
    if (!url) {
      showToast('⚠️ আগে লিংক দিন')
      return
    }
    showToast('⏳ Ad দেখার পর ডাউনলোড হবে (কাল থেকে)')
  }

  // Telegram actions
  const openTelegram = (type) => {
const links = {
  rate: 'https://t.me/foysal_vai_yt_oficial',
  feedback: 'https://t.me/foysal_vai_yt_oficial',
  premium: 'https://t.me/foysal_vai_yt_oficial',
  share: 'https://t.me/share/url?url=https://vidsavebd.vercel.app&text=VidSave BD - সেরা ভিডিও ডাউনলোডার!',
}
    window.open(links[type], '_blank')
    showToast('📱 Telegram খোলা হচ্ছে...')
  }

  // ============ HOME ============
  const renderHome = () => (
    <>
      <div className="premium-card" onClick={() => setActiveTab('premium')}>
        <div className="premium-left">
          <span className="crown">👑</span>
          <div>
            <h3>Premium নিন</h3>
            <p>Ad-free + 4K Download</p>
          </div>
        </div>
        <button className="premium-btn">৯৯৳/মাস</button>
      </div>

      <div className="bonus-card">
        <div className="bonus-icon">🎁</div>
        <div className="bonus-content">
          <h4>ডেইলি বোনাস</h4>
          <p>৫টা ডাউনলোড = ১টা ফ্রি</p>
        </div>
        <div className="bonus-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '40%' }}></div>
          </div>
          <span className="progress-text">2/5</span>
        </div>
      </div>

      <div className="input-card">
        <div className="input-header">
          <span className="input-icon">🔗</span>
          <span className="input-label">ভিডিও লিংক পেস্ট করুন</span>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="url-input"
            placeholder="https://tiktok.com/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="paste-btn" onClick={handlePaste}>📋</button>
        </div>
        <button
          className="fetch-btn"
          disabled={!url}
          onClick={handleDownload}
        >
          <span>⬇</span>
          <span>ডাউনলোড শুরু করুন</span>
        </button>
      </div>

      <section className="section">
        <h2 className="section-title">সাপোর্টেড প্ল্যাটফর্ম</h2>
        <div className="platforms-grid">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="platform-card"
              style={{ '--platform-color': p.color }}
              onClick={() => showToast(`${p.name} লিংক পেস্ট করুন`)}
            >
              <div className="platform-icon-wrap">
                <span className="platform-icon">{p.icon}</span>
              </div>
              <span className="platform-name">{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">সাম্প্রতিক ডাউনলোড</h2>
          <button className="see-all" onClick={() => setActiveTab('download')}>
            সব দেখুন →
          </button>
        </div>
        <div className="recent-list">
          {recentDownloads.map((r, i) => (
            <div key={i} className="recent-item">
              <div className="recent-icon">{r.icon}</div>
              <div className="recent-info">
                <h4>{r.title}</h4>
                <p>{r.platform} • {r.time}</p>
              </div>
              <button className="recent-download" onClick={handleDownload}>⬇</button>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card"><h3>১০K+</h3><p>ডাউনলোড</p></div>
        <div className="stat-card"><h3>৫K+</h3><p>ইউজার</p></div>
        <div className="stat-card"><h3>4.9★</h3><p>রেটিং</p></div>
      </section>
    </>
  )

  // ============ SEARCH ============
  const renderSearch = () => (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">🔍 খুঁজুন</h2>
        <p className="page-sub">প্ল্যাটফর্ম বা ডাউনলোড খুঁজুন</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="কী খুঁজছেন?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={`voice-btn ${isListening ? 'listening' : ''}`}
          onClick={handleVoiceSearch}
        >
          {isListening ? '🔴' : '🎤'}
        </button>
      </div>

      <h3 className="mini-title">জনপ্রিয় সার্চ</h3>
      <div className="tags-grid">
        {['#tiktok', '#instagram', '#reels', '#shorts', '#funny', '#trending'].map((tag) => (
          <span
            key={tag}
            className="tag"
            onClick={() => setSearchQuery(tag.replace('#', ''))}
          >
            {tag}
          </span>
        ))}
      </div>

      <h3 className="mini-title">ক্যাটাগরি</h3>
      <div className="categories-list">
        {[
          { icon: '🎵', name: 'TikTok ভিডিও', count: '1.2K' },
          { icon: '📸', name: 'Instagram Reels', count: '850' },
          { icon: '👥', name: 'Facebook ভিডিও', count: '620' },
          { icon: '▶', name: 'YouTube Shorts', count: '2.1K' },
        ].map((cat, i) => (
          <div key={i} className="category-item" onClick={() => showToast('🔍 ' + cat.name)}>
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
            <span className="cat-count">{cat.count}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ============ DOWNLOAD ============
  const renderDownload = () => (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">⬇ ডাউনলোড</h2>
        <p className="page-sub">আপনার সব ডাউনলোড</p>
      </div>

      <div className="download-tabs">
        <button className="d-tab active">সব</button>
        <button className="d-tab">চলছে</button>
        <button className="d-tab">সম্পন্ন</button>
      </div>

      <div className="recent-list">
        {recentDownloads.map((r, i) => (
          <div key={i} className="recent-item">
            <div className="recent-icon">{r.icon}</div>
            <div className="recent-info">
              <h4>{r.title}</h4>
              <p>{r.platform} • {r.time}</p>
            </div>
            <button className="recent-download">✓</button>
          </div>
        ))}
      </div>
    </div>
  )

  // ============ PREMIUM ============
  const renderPremium = () => (
    <div className="page-content">
      <div className="page-header premium-header">
        <span className="big-crown">👑</span>
        <h2 className="page-title">VidSave Premium</h2>
        <p className="page-sub">Ad-free অভিজ্ঞতা নিন</p>
      </div>

      <div className="features-list">
        {[
          'কোনো Ad দেখতে হবে না',
          '4K পর্যন্ত ভিডিও ডাউনলোড',
          'Unlimited ডাউনলোড',
          'Batch Download',
          'No waiting time',
        ].map((f, i) => (
          <div key={i} className="feature-item">
            <span className="feature-check">✓</span>
            <span>{f}</span>
          </div>
        ))}
      </div>

      <div className="pricing-card">
        <div className="price-tag">
          <span className="price">৯৯৳</span>
          <span className="price-period">/মাস</span>
        </div>
        <button className="buy-btn" onClick={() => openTelegram('premium')}>
          এখনই কিনুন
        </button>
      </div>

      <p className="premium-note">
        💳 bKash / Nagad / Rocket — সব সাপোর্টেড
      </p>
    </div>
  )

  // ============ PROFILE ============
  const renderProfile = () => (
    <div className="page-content">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <h2 className="profile-name">Foysal</h2>
        <p className="profile-id">@foysal_vai</p>
        <div className="profile-stats">
          <div><strong>25</strong><span>ডাউনলোড</span></div>
          <div><strong>0</strong><span>ফ্রি</span></div>
          <div><strong>Free</strong><span>প্ল্যান</span></div>
        </div>
      </div>

      <div className="menu-list">
        <div className="menu-item" onClick={() => openTelegram('rate')}>
          <span>⭐</span>
          <span>Rate Us</span>
          <span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => openTelegram('share')}>
          <span>📢</span>
          <span>Share App</span>
          <span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => openTelegram('feedback')}>
          <span>💬</span>
          <span>Feedback</span>
          <span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => showToast('📄 শীঘ্রই আসছে')}>
          <span>📄</span>
          <span>Privacy Policy</span>
          <span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => showToast('ℹ️ VidSave BD v1.0')}>
          <span>ℹ️</span>
          <span>About</span>
          <span className="arrow">→</span>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome()
      case 'search': return renderSearch()
      case 'download': return renderDownload()
      case 'premium': return renderPremium()
      case 'profile': return renderProfile()
      default: return renderHome()
    }
  }

  return (
    <div className="app">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-glow bg-glow-3"></div>

      {/* Toast */}
      {toast && (
        <div className="toast">{toast}</div>
      )}

      {activeTab === 'home' && (
        <header className="header">
          <div className="header-left">
            <div className="logo-box">
              <span className="logo-icon">⬇</span>
            </div>
            <div>
              <h1 className="logo-title">VidSave BD</h1>
              <p className="logo-sub">প্রিমিয়াম ডাউনলোডার</p>
            </div>
          </div>
          <button className="profile-btn" onClick={() => setActiveTab('profile')}>
            <span>👤</span>
          </button>
        </header>
      )}

      <main className="content">
        {renderContent()}
      </main>

      <nav className="bottom-nav">
        {[
          { id: 'home', icon: '🏠', label: 'হোম' },
          { id: 'search', icon: '🔍', label: 'খুঁজুন' },
          { id: 'download', icon: '⬇', label: 'ডাউনলোড' },
          { id: 'premium', icon: '👑', label: 'প্রিমিয়াম' },
          { id: 'profile', icon: '👤', label: 'প্রোফাইল' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default App
