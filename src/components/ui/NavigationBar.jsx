import React, { useState } from 'react';
import personImg from '/person.svg';
export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling the dropdown menu

  return (
    <div>
      {/* Main Navigation Bar */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
            <span className="font-semibold text-lg">UCalendar</span>
        </div>

        <div className="md:hidden">
        <img className='rounded-full w-[45px] h-[35px]'  src={personImg} alt="logo" />
        </div>

        <div className="hidden md:flex items-center space-x-4">
        <img className='rounded-full w-[45px] h-[35px]'  src={personImg} alt="logo" />
        </div>
      </div>


    </div>
  );
}
