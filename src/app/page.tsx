'use client';

import { useState, useRef, useEffect } from 'react';

const IMG_LOFI = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500';
const IMG_NIGHT = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500';
const IMG_RELAX = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500';
const IMG_FOCUS = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500';
const IMG_SUMMER = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500';

const SONGS_DATA = [
  { id: 1, title: 'Không Thời Gian', artist: 'Trần Ngân', img: IMG_LOFI, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_thoi_gian_tran_ngan.mp3' },
  { id: 2, title: 'I Miss You', artist: 'Elijah Woods', img: IMG_NIGHT, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/yeu_em_2_ngay_slowed.mp3' },
  { id: 3, title: 'Không Ngừng Suy Nghĩ', artist: 'Dương Domic', img: IMG_RELAX, src: 'https://pub-c5e31b5cdafb419a86a697ccaae4206c.r2.dev/khong_ngung_suy_nghi_quoc_pham.mp3' },
  { id: 4, title: 'Waiting For You', artist: 'MONO', img: IMG_FOCUS, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Nấu Ăn Cho Em', artist: 'Đen Vâu ft. PiaLinh', img: IMG_SUMMER, src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
];

export default function Home() {
  const [songs] = useState(SONGS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      <audio ref={audioRef} src={SONGS_DATA[currentIndex].src} />

      {/* Modal Đăng nhập/Đăng ký */}
      {showLogin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#111', padding: '30px', borderRadius: '15px', width: '300px', textAlign: 'center' }}>
            <h3 style={{ color: '#ff4757' }}>ĐĂNG NHẬP</h3>
            <input placeholder="Tài khoản..." style={{ width: '100%', padding: '10px', margin: '10px 0', background: '#222', border: 'none', color: '#fff' }} />
            <input type="password" placeholder="Mật khẩu..." style={{ width: '100%', padding: '10px', background: '#222', border: 'none', color: '#fff' }} />
            <button style={{ width: '100%', padding: '10px', marginTop: '15px', background: '#ff4757', border: 'none', color: '#fff', cursor: 'pointer' }}>Đăng nhập</button>
            <button style={{ width: '100%', padding: '10px', marginTop: '10px', background: 'transparent', border: '1px solid #ff4757', color: '#ff4757', cursor: 'pointer' }}>Đăng ký tài khoản mới</button>
            <button onClick={() => setShowLogin(false)} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>Đóng</button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div style={{ width: '240px', background: '#0d0d0d', padding: '20px' }}>
        <h2 style={{ color: '#ff4757', fontSize: '1.2rem' }}>🎵 Melody STREAM</h2>
        <button onClick={() => setShowLogin(true)} style={{ width: '100%', padding: '10px', background: '#ff4757', border: 'none', color: '#fff', borderRadius: '20px', cursor: 'pointer' }}>🔐 Đăng nhập hệ thống</button>
        <div style={{ marginTop: '40px', color: '#aaa' }}>
          <p>📻 Khám Phá</p>
          <p>📈 #melodychart</p>
          <p>🎵 Thư Viện</p>
        </div>
      </div>

      {/* Nội dung */}
      <div style={{ flex: 1, padding: '40px', textAlign: 'center' }}>
        <input placeholder="🔍 Tìm kiếm..." style={{ width: '300px', padding: '10px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '20px' }} />
        <div style={{ marginTop: '50px' }}>
            <img src={SONGS_DATA[currentIndex].img} style={{ width: '250px', height: '250px', borderRadius: '50%' }} />
            <h2>{SONGS_DATA[currentIndex].title}</h2>
            <button onClick={togglePlay} style={{ fontSize: '2rem', background: 'none', border: 'none', color: '#ff4757', cursor: 'pointer' }}>{isPlaying ? '⏸' : '▶'}</button>
        </div>
      </div>
    </div>
  );
}