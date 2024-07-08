import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const videoRef = useRef(null);
  useEffect(() => {
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing the camera: ', err);
      }
    };

    getVideo();
    return () => {

      if (videoRef.current && videoRef.current.srcObject) {
        console.log(videoRef)
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };

  }, [])

  return (
    <>
    <div className='videos'>
      <video className='video-player' ref={videoRef} id='user-1' autoPlay playsInline></video>
      <video className='video-player' id='user-2' autoPlay playsInline></video>
    </div>
    <button onClick={()=>{
      const video = document.getElementById('user-1') as HTMLVideoElement;
      if(video){
        // videoRef.current.srcObject = null
        video.pause();
      }

    }}>Stop video</button>
    <button onClick={()=>{
      const video = document.getElementById('user-1') as HTMLVideoElement;
      if(video){
        video.play();
      }

    }}>play video</button>
    </>
  )
}

export default App
