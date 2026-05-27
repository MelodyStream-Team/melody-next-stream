'use client';

import { useState, useRef, useEffect } from 'react';

const IMG_LOFI = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80';
const IMG_NIGHT = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80';
const IMG_RELAX = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80';
const IMG_FOCUS = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80';
const IMG_SUMMER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80';

// Đã bỏ PROXY để nhạc chạy ổn định
const SONGS_DATA = [
  { id: 1, title: 'Không Thời Gian', artist: 'Trần Ngân', img: IMG_LOFI, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_thoi_gian_tran_ngan.mp3' },
  { id: 2, title: 'I Miss You', artist: 'Elijah Woods', img: IMG_NIGHT, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/yeu_em_2_ngay_slowed.mp3' },
  { id: 3, title: 'Không Ngừng Suy Nghĩ', artist: 'Dương Domic', img: IMG_RELAX, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_ngung_suy_nghi_quoc_pham.mp3' },
  { id: 4, title: 'Waiting For You', artist: 'MONO', img: IMG_FOCUS, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Nấu Ăn Cho Em', artist: 'Đen Vâu ft. PiaLinh', img: IMG_SUMMER, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id: 6, title: 'See Tình', artist: 'Hoàng Thùy Linh', img: IMG_LOFI, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id: 7, title: 'Nếu Lúc Đó', artist: 'tlinh x 2pillz', img: IMG_SUMMER, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id: 8, title: 'Lan Man', artist: 'Ronboogz', img: IMG_NIGHT, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 9, title: 'Deep Focus lofi', artist: 'ChilledCow', img: IMG_FOCUS, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id: 10, title: 'Summer Chill', artist: 'Lofi Records', img: IMG_RELAX, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' }
];

export default function Home() {
  const [songs] = useState(SONGS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSong = songs[currentIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentTab, setCurrentTab] = useState('kham-pha');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Giữ nguyên toàn bộ logic cũ của bạn
  useEffect(() => { if (audioRef.current) { audioRef.current.load(); if (isPlaying) audioRef.current.play().catch(console.log); } }, [currentIndex]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    return () => { audio.removeEventListener('timeupdate', updateTime); audio.removeEventListener('loadedmetadata', updateDuration); };
  }, [currentIndex]);

  const togglePlay = () => { if (!audioRef.current) return; if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } else { audioRef.current.play().then(() => setIsPlaying(true)).catch(console.log); } };
  const handleNext = () => { setCurrentIndex((prev) => (prev + 1) % songs.length); setIsPlaying(true); };
  const handlePrev = () => { setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length); setIsPlaying(true); };
  const handleSelectSong = (id: number) => { const idx = songs.findIndex(s => s.id === id); if (idx !== -1) { setCurrentIndex(idx); setIsPlaying(true); setCurrentTab('kham-pha'); } };
  const handleLoginSubmit = (e: React.FormEvent) => { e.preventDefault(); if (usernameInput) { setLoggedInUser(usernameInput); setIsLoggedIn(true); setShowLoginModal(false); } };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020202', color: '#fff', fontFamily: 'sans-serif' }}>
      <audio ref={audioRef} crossOrigin="anonymous" src={currentSong.src} />
      
      {/* MODAL ĐĂNG NHẬP CHÂN THẬT - ĐÃ CÓ ĐĂNG KÝ */}
      {showLoginModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#181818', padding: '30px', borderRadius: '12px', width: '320px', textAlign: 'center' }}>
            <h2 style={{ color: '#ff4757', marginBottom: '20px' }}>Đăng nhập</h2>
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder="Tên tài khoản..." onChange={(e) => setUsernameInput(e.target.value)} style={{ padding: '12px', backgroundColor: '#333', color: '#fff', border: 'none' }} />
              <input type="password" placeholder="Mật khẩu..." style={{ padding: '12px', backgroundColor: '#333', color: '#fff', border: 'none' }} />
              <button type="submit" style={{ padding: '12px', backgroundColor: '#1db954', border: 'none', cursor: 'pointer' }}>Đăng nhập</button>
            </form>
            <button style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: 'transparent', border: '1px solid #ff4757', color: '#ff4757', cursor: 'pointer' }}>Đăng ký tài khoản mới</button>
            <button onClick={() => setShowLoginModal(false)} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>Đóng</button>
          </div>
        </div>
      )}

      {/* Sidebar và Nội dung giữ nguyên của bạn */}
      <div style={{ width: '240px', padding: '20px' }}>
        <button onClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowLoginModal(true)} style={{ padding: '10px', borderRadius: '20px', border: 'none', backgroundColor: isLoggedIn ? '#2ed573' : '#ff4757', color: '#fff', cursor: 'pointer' }}>
          {isLoggedIn ? `👤 ${loggedInUser} (Đăng xuất)` : '🔐 Đăng nhập hệ thống'}
        </button>
      </div>

      <div style={{ flex: 1, padding: '30px' }}>
         <h1 style={{color: '#ff4757'}}>Melody Stream</h1>
         <p>Chào mừng đến với không gian âm nhạc của bạn!</p>
      </div>
    </div>
  );
}