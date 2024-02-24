import React, { useEffect, useRef, useState } from "react";
// Icons
import { WiDirectionUp } from "react-icons/wi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoUnmute, GoMute } from "react-icons/go";
import { MdComment } from "react-icons/md";

function Container() {
  // Video Details
  const videos = [
    {
      url: "/vid1.mp4",
      title: "Video 1",
      likes: 1,
    },
    {
      url: "/vid2.mp4",
      title: "Video 2",
      likes: 2,
    },
    {
      url: "/vid3.mp4",
      title: "Video 3",
      likes: 12,
    },
    {
      url: "/vid4.mp4",
      title: "Video 4",
      likes: 22,
    },
    {
      url: "/vid5.mp4",
      title: "Video 5",
      likes: 32,
    },
    {
      url: "/vid6.mp4",
      title: "Video 6",
      likes: 42,
    },
  ];

  // States

  const [likes, setLikes] = useState(Array(videos.length).fill(0));
  const [active, setActive] = useState(false);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [mute, setMute] = useState(false);

  const [duration, setDuration] = useState(0);

  const videoRef = useRef(null);

  // Logic

  const hanndleActive = () => {
    setActive((currentState) => {
      const newState = !currentState;

      const videoElement = videoRef.current;

      if (videoElement) {
        if (newState) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      }

      console.log(newState);
      return newState;
    });
  };

  const handleMute = () => {
    setMute((current) => {
      const newState = !current;
      const videoElement = videoRef.current;

      if (videoElement) {
        videoElement.muted = newState;
      }

      return newState;
    });
  };

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  const handleLikes = () => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[currentVideoIndex]++;
      return newLikes;
    });
  };

  const handleDislikes = () => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      if (newLikes[currentVideoIndex] > 0) {
        newLikes[currentVideoIndex]--;
      }
      return newLikes;
    });
  };

  const handleScroll = (e) => {
    const deltaY = e.deltaY;

    if (deltaY > 0) {
      nextVideo();
    } else if (deltaY < 0) {
      prevVideo();
    }
  };

  useEffect(() => {
    document.body.addEventListener("wheel", handleScroll);

    return () => {
      document.body.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleTimeUpdate = (e) => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeekbarChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [videoRef]);

  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!touchStartY.current) return;

    const deltaY = e.touches[0].clientY - touchStartY.current;

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.style.transform = `translateY(${deltaY}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartY.current) return;

    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (deltaY > 50) {
      nextVideo();
    } else if (deltaY < -50) {
      prevVideo();
    }

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.style.transform = "translateY(0)";
    }

    touchStartY.current = null;
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener("touchstart", handleTouchStart);
      videoElement.addEventListener("touchmove", handleTouchMove);
      videoElement.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("touchstart", handleTouchStart);
        videoElement.removeEventListener("touchmove", handleTouchMove);
        videoElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [videoRef, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className="flex flex-col items-center ">
      <div className="absolute lg:top-20 md:top-20 sm:top-20 top-40 h-[550px] w-[350px] rounded-lg overflow-hidden">
        <div key={currentVideoIndex}>
          <video
            style={{ width: "100%" }}
            height="400px"
            src={videos[currentVideoIndex].url}
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            ref={videoRef}
            onClick={hanndleActive}
          ></video>
          <div
            onClick={hanndleActive}
            className="absolute top-2 left-4 cursor-pointer"
          >
            {!active ? <FaPlay /> : <FaPause />}
          </div>
          <div
            onClick={handleMute}
            className="absolute top-2 right-4 cursor-pointer"
          >
            {!mute ? <GoUnmute /> : <GoMute />}
          </div>
          <div className="absolute bottom-12 left-2 cursor-pointer">
            {videos[currentVideoIndex].title}
          </div>
          <div className="flex justify-between items-center mt-2 absolute bottom-0 w-full">
            <div>{formatTime(currentTime)}</div>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeekbarChange}
              style={{ width: "400px" }}
            />
            <div>{duration.toFixed(2)}</div>
          </div>
          <div className="flex absolute bottom-16 ml-64 flex-col gap-5 cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              <div
                onClick={handleLikes}
                className="flex items-center h-10 w-10 rounded-full bg-[#212121] hover:bg-[#3f3f3f] justify-center"
              >
                <AiFillLike size={30} />
              </div>
              <span className="font-semibold">{likes[currentVideoIndex]}</span>
            </div>
            <div className="flex flex-col items-center">
              <div
                onClick={handleDislikes}
                className="flex items-center h-10 w-10 rounded-full bg-[#212121] hover:bg-[#3f3f3f] justify-center"
              >
                <AiFillDislike size={30} />
              </div>
              <span className="font-bold">Dislike</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center h-10 w-10 rounded-full bg-[#212121] hover:bg-[#3f3f3f] justify-center">
                <MdComment size={30} />
              </div>
              <span className="font-bold">Comment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex ">
        <div
          onClick={prevVideo}
          disabled={currentVideoIndex === 0}
          className="cursor-pointer absolute top-20 right-5 h-16 w-16 items-center flex justify-center rounded-full bg-[#212121] hover:bg-[#3f3f3f]"
        >
          <WiDirectionUp size={50} />
        </div>
        <div
          onClick={nextVideo}
          disabled={currentVideoIndex === videos.length - 1}
          className=" cursor-pointer absolute bottom-2 right-5 h-16 w-16 items-center flex justify-center rounded-full bg-[#212121] hover:bg-[#3f3f3f]"
        >
          <WiDirectionUp style={{ rotate: "180deg" }} size={50} />
        </div>
      </div>
    </div>
  );
}

export default Container;
