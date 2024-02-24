import React from "react";
import { FaYoutube } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { LuUserCircle2 } from "react-icons/lu";
import { IoMdMore, IoIosMenu } from "react-icons/io";
import { MdKeyboardVoice } from "react-icons/md";

function Header() {
  return (
    <header>
      <div className="flex justify-between items-center ml-6 mr-5 mt-4">
        <div className="flex gap-6 cursor-pointer">
          <IoIosMenu
            size={32}
            color="white"
            className="hover:rounded-full hover:bg-[#131312]"
          />
          <div className="flex">
            <FaYoutube size={32} color="red" />
            <span className="text-white text-lg font-bold">Youtube</span>
          </div>
        </div>
        <div className="flex items-center gap-6 w-full justify-center">
          <div className="flex items-center">
            <input
              id="search"
              type="text"
              className="bg-[#212121] rounded-3xl h-10 p-6 hidden lg:flex" // Adjusted styling
              placeholder="Search"
            />
            <label htmlFor="search">
              <CiSearch
                color="white"
                size={28}
                className="cursor-pointer ml-2 hover:bg-[#]" // Adjusted styling
              />
            </label>
          </div>
          <div className="hidden sm:flex h-12 w-12 bg-[#1b1b1b] hover:bg-[#212121] rounded-full items-center justify-center cursor-pointer">
            <MdKeyboardVoice color="white" size={28} />
          </div>
        </div>
        <div className="flex items-center gap-5 cursor-pointer">
          <IoMdMore size={24} />
          <span className="flex gap-4 items-center border border-white rounded-full h-10 w-28 justify-center font-bold text-[#3ea6ff]">
            <LuUserCircle2 size={24} color="#3ea6ff" />
            Sign in
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
