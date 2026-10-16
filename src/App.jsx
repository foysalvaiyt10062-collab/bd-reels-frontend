import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [activeTab, setActiveTab] = useState('home')
  const [videoInfo, setVideoInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('')

  // ⚠️ AdsGram Init
  useEffect(() => {
    const initAd = () => {
      if (window.Adsgram) {
        window.AdController = window.Adsgram.init({ blockId: "54202" })
        console.log('✅ AdsGram loaded')
      } else {
        setTimeout(initAd, 500)
      }
    }
    initAd()
  }, [])

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

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      showToast('✅ লিংক পেস্ট হয়েছে')
    } catch {
      showToast('❌ Clipboard পড়া যায়নি')
    }
  }

  const handleFetch = async () => {
    if (!url || !url.includes('http')) {
      showToast('⚠️ সঠিক ভিডিও লিংক দিন')
      return
    }
    setLoading(true)
    setVideoInfo(null)

    try {
      const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`
      const response = await fetch(apiUrl)
      const data = await response.json()

      if (data.code === 0 && data.data) {
        setVideoInfo({
          title: data.data.title || 'TikTok Video',
          cover: data.data.cover,
          play: data.data.play,
          hdplay: data.data.hdplay,
          music: data.data.music,
          duration: data.data.duration,
          size: data.data.size,
          hd_size: data.data.hd_size,
        })
        showToast('✅ ভিডিও পাওয়া গেছে!')
      } else {
        showToast('❌ ভিডিও খুঁজে পাওয়া যায়নি')
      }
    } catch (error) {
      console.error(error)
      showToast('❌ সমস্যা হয়েছে — আবার চেষ্টা করুন')
    } finally {
      setLoading(false)
    }
  }

  // 🎬 Download with Ad
  const downloadVideo = (videoUrl) => {
    showToast('⏳ Ad লোড হচ্ছে...')

    const doDownload = () => {
      showToast('✅ ডাউনলোড শুরু!')
      const link = document.createElement('a')
      link.href = videoUrl
      link.download = 'vidsave-video.mp4'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    if (window.AdController) {
      window.AdController.show()
        .then(() => doDownload())
        .catch(() => {
          showToast('⚠️ Ad skip — ডাউনলোড চলছে')
          doDownload()
        })
    } else {
      // Ad না থাকলে সরাসরি download
      doDownload()
    }
  }

  const reset = () => {
    setVideoInfo(null)
    setUrl('')
  }

  const openTelegram = (type) => {
    const links = {
      rate: 'https://t.me/foysal_vai_yt_oficial?text=⭐%20Rate%20Us%20Feedback',
      feedback: 'https://t.me/foysal_vai_yt_oficial?text=💬%20Feedback:%20',
      premium: 'https://t.me/foysal_vai_yt_oficial?text=👑%20Premium%20নিতে%20চাই',
      share: 'https://t.me/share/url?url=https://bd-reels-frontend-s2ya.vercel.app&text=VidSave BD - সেরা ভিডিও ডাউনলোডার!',
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

      {!videoInfo ? (
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
            disabled={!url || loading}
            onClick={handleFetch}
          >
            {loading ? '⏳ খোঁজা হচ্ছে...' : '⬇ ভিডিও খুঁজুন'}
          </button>
        </div>
      ) : (
        <div className="video-preview-card">
          <div className="video-thumbnail-wrap">
            <img src={videoInfo.cover} alt="Thumbnail" className="video-thumbnail" />
            <div className="duration-badge">
              ⏱️ {Math.floor(videoInfo.duration / 60)}:{String(videoInfo.duration % 60).padStart(2, '0')}
            </div>
          </div>

          <h3 className="video-title">{videoInfo.title}</h3>

          <div className="quality-options">
            <button className="quality-btn" onClick={() => downloadVideo(videoInfo.play)}>
              <span className="quality-label">SD 720p</span>
              <span className="quality-size">
                {videoInfo.size ? (videoInfo.size / 1024 / 1024).toFixed(1) + ' MB' : 'N/A'}
              </span>
            </button>
            <button
              className="quality-btn hd"
              onClick={() => downloadVideo(videoInfo.hdplay || videoInfo.play)}
            >
              <span className="quality-label">HD 1080p</span>
              <span className="quality-size">
                {videoInfo.hd_size ? (videoInfo.hd_size / 1024 / 1024).toFixed(1) + ' MB' : 'N/A'}
              </span>
            </button>
            <button className="quality-btn music" onClick={() => downloadVideo(videoInfo.music)}>
              <span className="quality-label">🎵 MP3</span>
              <span className="quality-size">Audio</span>
            </button>
          </div>

          <button className="reset-btn" onClick={reset}>
            ← নতুন লিংক
          </button>
        </div>
      )}

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
              <button className="recent-download">⬇</button>
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
        <input type="text" className="search-input" placeholder="কী খুঁজছেন?" />
        <button className="voice-btn">🎤</button>
      </div>
      <h3 className="mini-title">জনপ্রিয় সার্চ</h3>
      <div className="tags-grid">
        {['#tiktok', '#instagram', '#reels', '#shorts', '#funny', '#trending'].map((tag) => (
          <span key={tag} className="tag">{tag}</span>
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
          <div key={i} className="category-item">
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
      <p className="premium-note">💳 bKash / Nagad / Rocket — সব সাপোর্টেড</p>
    </div>
  )

  // ============ PROFILE ============
  const renderProfile = () => (
    <div className="page-content">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <h2 className="profile-name">Foysal</h2>
        <p className="profile-id">@foysal_vai_yt_oficial</p>
        <div className="profile-stats">
          <div><strong>25</strong><span>ডাউনলোড</span></div>
          <div><strong>0</strong><span>ফ্রি</span></div>
          <div><strong>Free</strong><span>প্ল্যান</span></div>
        </div>
      </div>
      <div className="menu-list">
        <div className="menu-item" onClick={() => openTelegram('rate')}>
          <span>⭐</span><span>Rate Us</span><span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => openTelegram('share')}>
          <span>📢</span><span>Share App</span><span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => openTelegram('feedback')}>
          <span>💬</span><span>Feedback</span><span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => showToast('📄 শীঘ্রই আসছে')}>
          <span>📄</span><span>Privacy Policy</span><span className="arrow">→</span>
        </div>
        <div className="menu-item" onClick={() => showToast('ℹ️ VidSave BD v1.0')}>
          <span>ℹ️</span><span>About</span><span className="arrow">→</span>
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

      {toast && <div className="toast">{toast}</div>}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>ভিডিও খোঁজা হচ্ছে...</p>
        </div>
      )}

      {activeTab === 'home' && (
        <header className="header">
          <div className="header-left">
            <div className="logo-box"><span className="logo-icon">⬇</span></div>
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

      <main className="content">{renderContent()}</main>

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
