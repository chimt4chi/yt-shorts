import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { CiYoutube } from "react-icons/ci";
import { MdHistory } from "react-icons/md";
import { BiTrendingUp } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdMusicalNote } from "react-icons/io";
import { MdLocalMovies } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";

function Sidebar() {
  return (
    <>
      <div className="hidden w-[15%] sm:flex flex-col mt-8 ">
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[40px] items-center rounded-md ">
          <div className="ml-7 flex gap-7 mb-2">
            <AiOutlineHome size={24} />
            <span className="hidden lg:flex">Home</span>
          </div>
        </div>
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <SiYoutubeshorts size={24} />
            <span className="hidden lg:flex">Shorts</span>
          </div>
        </div>
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <MdOutlineSubscriptions size={24} />
            <span className="hidden lg:flex">Subscriptions</span>
          </div>
        </div>
      </div>
      <hr className="w-[15%] hidden lg:flex" />
      <div className="hidden w-[15%] sm:flex flex-col mt-8">
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <CiYoutube size={24} />
            <span className="hidden lg:flex">You</span>
          </div>
        </div>
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <MdHistory size={24} />
            <span className="hidden lg:flex">History</span>
          </div>
        </div>
      </div>
      <hr className="w-[15%] hidden lg:flex" />
      <div className="hidden w-[15%] sm:flex flex-col mt-8">
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <BiTrendingUp size={24} />
            <span className="hidden lg:flex">Trending</span>
          </div>
        </div>
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <FaShoppingBag size={24} />
            <span className="hidden lg:flex">Shopping</span>
          </div>
        </div>
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <IoMdMusicalNote size={24} />
            <span className="hidden lg:flex">Music</span>
          </div>
        </div>
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <MdLocalMovies size={24} />
            <span className="hidden lg:flex">Movies</span>
          </div>
        </div>
        <div className="flex gap-7 mb-2 hover:bg-[#212121] cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7 mb-2">
            <SiYoutubegaming size={24} />
            <span className="hidden lg:flex">Gaming</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
