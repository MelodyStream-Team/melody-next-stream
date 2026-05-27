'use client';

import { useState, useRef, useEffect } from 'react';

// 1. Tạo danh sách dữ liệu 5 bài hát giống y hình của bạn
const SONGS_DATA = [
  { id: 1, title: 'Lofi Chill', artist: 'Relax & Chill Music', img: 'images/music.jpg', src: 'audio/lofi-chill.mp3' },
  { id: 2, title: 'Night Vibes', artist: 'Night Driving Playlist', img: 'images/music.jpg', src: 'audio/night-vibes.mp3' },
  { id: 3, title: 'Relax Beat', artist: 'Peaceful Background Music', img: 'images/music.jpg', src: 'audio/relax-beat.mp3' },
  { id: 4, title: 'Deep Focus', artist: 'Study & Coding Music', img: 'images/music.jpg', src: 'audio/deep-focus.mp3' },
  { id: 5, title: 'Summer Chill', artist: 'Weekend Relax Music', img: 'images/music.jpg', src: 'audio/summer-chill.mp3' },
];

export default function Home() {
  // Các trạng thái điều khiển ứng dụng
  const [songs, setSongs] = useState(SONGS_DATA);
  const [currentSong, setCurrentSong] = useState(SONGS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Xử lý khi bấm nút Play/Pause trên thanh nhạc mặc định để xoay đĩa
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentSong]);

  // Hàm khi người dùng click chọn bài hát ở dưới danh sách
  const handleSelectSong = (song: typeof SONGS_DATA[0]) => {
    setCurrentSong(song);
    setIsPlaying(false); // Reset trạng thái xoay đĩa, khi người dùng bấm play thanh mới sẽ xoay
  };

  // Lọc bài hát theo ô tìm kiếm
  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Đĩa nhạc lớn phía trên: Thêm class "rotate" chỉ khi đang phát nhạc */}
      <div className="music-container">
        <div className="img-container">
          <img 
            src={currentSong.img} 
            alt={currentSong.title} 
            className={isPlaying ? "rotate" : ""} 
            style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
          />
        </div>
      </div>

      {/* Tên bài hát đang phát */}
      <div style={{ textRendering: 'optimizeLegibility', marginBottom: '15px' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 5px 0' }}>{currentSong.title}</h2>
        <p style={{ color: '#aaa', margin: 0 }}>{currentSong.artist}</p>
      </div>

      {/* Thanh Player phát nhạc phát được âm thanh thật */}
      <div style={{ marginBottom: '25px' }}>
        <audio 
          ref={audioRef}
          src={currentSong.src} 
          controls 
          autoPlay={isPlaying}
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>

      {/* Ô tìm kiếm bài hát chạy được thật */}
      <div style={{ marginBottom: '35px' }}>
        <input 
          type="text" 
          placeholder="Tìm kiếm bài hát..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input" // Bạn có thể giữ class cũ của bạn
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            width: '100%',
            maxWidth: '300px',
            textAlign: 'center',
            outline: 'none'
          }}
        />
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Popular Songs</h2>

      {/* Danh sách bài hát bên dưới */}
      <div className="songs-grid" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        justifyContent: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {filteredSongs.map((song) => (
          <div 
            key={song.id} 
            onClick={() => handleSelectSong(song)}
            style={{
              backgroundColor: currentSong.id === song.id ? '#222' : '#111', // Đổi màu nền nếu đang chọn
              border: currentSong.id === song.id ? '1px solid #ff4757' : '1px solid transparent',
              padding: '15px',
              borderRadius: '12px',
              cursor: 'pointer',
              width: '160px',
              transition: 'transform 0.2s, background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={song.img} alt={song.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
            <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</h4>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
}