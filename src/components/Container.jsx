import React, { useEffect, useRef, useState } from "react";
// Icons
import { WiDirectionUp } from "react-icons/wi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoUnmute, GoMute } from "react-icons/go";

function Container() {
  // TODO: Swipe Up/Down functionality, like counter for each video, fix progress bar and time

  // Video Details
  const videos = [
    {
      url: "/vid1.mp4",
      title: "Video 1",
    },
    {
      url: "/vid2.mp4",
      title: "Video 2",
    },
    {
      url: "/vid3.mp4",
      title: "Video 3",
    },
    {
      url: "/vid4.mp4",
      title: "Video 4",
    },
    {
      url: "/vid5.mp4",
      title: "Video 5",
    },
    {
      url: "/vid6.mp4",
      title: "Video 6",
    },
  ];

  // States

  const [like, setLikes] = useState(0);
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
    setLikes((like) => like + 1);
  };

  const handleDislikes = () => {
    if (like < 1) {
      return null;
    }

    setLikes((like) => like - 1);
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
    // setCurrentTime(e.target.currentTime);
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

  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-20 h-[620px] w-[400px] rounded-lg overflow-hidden">
        <div key={currentVideoIndex}>
          <video
            style={{ width: "100%" }}
            height="400px"
            src={videos[currentVideoIndex].url}
            controls
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            ref={videoRef}
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
              // readOnly
              onChange={handleSeekbarChange}
              style={{ width: "400px" }}
            />
            <div>{duration.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex relative ml-[30rem] flex-col gap-5 cursor-pointer">
        <div className="flex flex-col items-center justify-center">
          <div
            onClick={handleLikes}
            className="flex items-center h-12 w-12 rounded-full bg-[#212121] hover:bg-[#3f3f3f] justify-center"
          >
            <AiFillLike size={30} />
          </div>
          <span className="font-semibold">{like}</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            onClick={handleDislikes}
            className="flex items-center h-12 w-12 rounded-full bg-[#212121] hover:bg-[#3f3f3f] justify-center"
          >
            <AiFillDislike size={30} />
          </div>
          <span className="font-bold">Dislike</span>
        </div>
        <div className="flex flex-col items-center">
          <div
            onClick={() => setLikes(like - 1)}
            className="flex items-center h-12 w-12 rounded-full bg-[#212121] hover:bg-[#3f3f3f] justify-center"
          >
            <AiFillDislike size={30} />
          </div>
          <span className="font-bold">Comment</span>
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
