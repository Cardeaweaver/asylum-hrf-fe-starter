"use client";

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='flex flex-col w-full bg-[#1e3a8a] px-14 py-10 text-blue-50/80 font-serif'>
      
      {/* 1. TOP SECTION: LOGO AND ADDRESS */}
      <section className='flex flex-col items-center pb-8 border-b border-white/10'>
        <div className='pb-6'> 
          <a href='https://www.humanrightsfirst.org/'>
            <Image 
              className='w-[100px] h-auto' 
              src='/logo.png' 
              alt='HRF logo white'
              width={100}
              height={100}
            />
          </a>
        </div>
        
        <div className='footer-address flex flex-col items-center text-center space-y-1 text-sm'>
          <p className="font-bold text-lg text-blue-50">Human Rights First</p>
          <p>75 Broad St, 31st Floor</p>
          <p>New York, New York 10004 US</p>
          <p className='pt-4 text-xs opacity-60'>For Media Inquiries call 202-370-333</p>
        </div>
      </section>

      {/* 2. NAVIGATION LINKS SECTION WITH HOVER */}
      <nav className='footer-links flex flex-wrap gap-10 justify-center pt-8 text-xs uppercase tracking-widest'>
        <a href='https://www.humanrightsfirst.org/about' target='_blank' rel='noopener noreferrer' className='transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>About Us</a>
        <a href='https://www.humanrightsfirst.org/contact' target='_blank' rel='noopener noreferrer' className='transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>Contact Us</a>
        <a href='https://www.humanrightsfirst.org/press' target='_blank' rel='noopener noreferrer' className='transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>Press</a>
        <a href='https://www.humanrightsfirst.org/privacy' target='_blank' rel='noopener noreferrer' className='transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>Terms & Privacy</a>
        <a href='https://www.humanrightsfirst.org/signup' target='_blank' rel='noopener noreferrer' className='transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>Sign Up</a>
        <a href='https://www.humanrightsfirst.org/careers' target='_blank' rel='noopener noreferrer' className='transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer'>Careers</a>
      </nav>
    </footer>
  );
}
