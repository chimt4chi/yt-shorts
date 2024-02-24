import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { CiYoutube } from "react-icons/ci";
import { MdHistory } from "react-icons/md";

function Sidebar() {
  return (
    <>
      <div className="hidden w-[15%] sm:flex flex-col mt-8">
        <div className="flex gap-7 ml-2 mb-5 hover:bg-red-500 cursor-pointer h-[40px] items-center rounded-md ">
          <div className="ml-7 flex gap-7">
            <AiOutlineHome size={24} />
            <span className="hidden lg:flex">Home</span>
          </div>
        </div>
        <div className="flex gap-7 ml-2 mb-5 hover:bg-red-500 cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7">
            <SiYoutubeshorts size={24} />
            <span className="hidden lg:flex">Shorts</span>
          </div>
        </div>
        <div className="flex gap-7 ml-2 mb-5 hover:bg-red-500 cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7">
            <MdOutlineSubscriptions size={24} />
            <span className="hidden lg:flex">Subscriptions</span>
          </div>
        </div>
      </div>
      <hr className="w-[15%] hidden lg:flex" />
      <div className="hidden w-[15%] sm:flex flex-col mt-8">
        <div className="flex gap-7 ml-2 mb-5 hover:bg-red-500 cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7">
            <CiYoutube size={24} />
            <span className="hidden lg:flex">You</span>
          </div>
        </div>
        <div className="flex gap-7 ml-2 mb-5 hover:bg-red-500 cursor-pointer h-[35px] items-center rounded-md">
          <div className="ml-7 flex gap-7">
            <MdHistory size={24} />
            <span className="hidden lg:flex">History</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
