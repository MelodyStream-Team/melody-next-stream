'use client';

import { useState, useRef, useEffect } from 'react';

// DỮ LIỆU CỦA BẠN - ĐÃ FIX LỖI NHẠC
const IMG_LOFI = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80';
const IMG_NIGHT = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80';
const IMG_RELAX = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80';
const IMG_FOCUS = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80';
const IMG_SUMMER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80';

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

  // ... (Bạn giữ nguyên mọi logic useEffect, handleNext, handlePrev... ở đây)
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#020202', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* KHUNG ĐĂNG NHẬP CỦA BẠN - ĐÃ THÊM NÚT ĐĂNG KÝ */}
      {showLoginModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#0d0d0d', border: '1px solid #222', padding: '30px', borderRadius: '16px', width: '320px' }}>
            <h3 style={{ color: '#ff4757', textAlign: 'center' }}>ĐĂNG NHẬP HỆ THỐNG</h3>
            <input placeholder="Tên tài khoản..." value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#050505', color: '#fff', border: '1px solid #333', marginBottom: '10px' }} />
            <input type="password" placeholder="Mật khẩu..." style={{ width: '100%', padding: '10px', backgroundColor: '#050505', color: '#fff', border: '1px solid #333', marginBottom: '10px' }} />
            <button onClick={() => { setLoggedInUser(usernameInput); setIsLoggedIn(true); setShowLoginModal(false); }} style={{ width: '100%', padding: '10px', backgroundColor: '#ff4757', color: '#fff', border: 'none', cursor: 'pointer' }}>Đăng nhập</button>
            
            {/* NÚT ĐĂNG KÝ MỚI */}
            <button style={{ width: '100%', marginTop: '10px', padding: '10px', backgroundColor: 'transparent', border: '1px solid #ff4757', color: '#ff4757', cursor: 'pointer' }}>Đăng ký tài khoản mới</button>
            
            <button onClick={() => setShowLoginModal(false)} style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>Đóng</button>
          </div>
        </div>
      )}

      {/* Dán phần SIDEBAR và MAIN CONTENT của bạn vào phía dưới này */}
    </div>
  );
}