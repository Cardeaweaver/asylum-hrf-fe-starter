import Logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className='flex flex-col w-full bg-[#404037] px-14 py-10 text-amber-50/80 font-serif'>
      
      {/* 1. TOP SECTION: LOGO AND ADDRESS */}
      <section className='flex flex-col items-center pb-8 border-b border-white/10'>
        <div className='pb-6'> 
          <a href='https://www.humanrightsfirst.org/'>
            <img className='w-[100px]' src={Logo} alt='HRF logo white' />
          </a>
        </div>
        
        <div className='footer-address flex flex-col items-center text-center space-y-1 text-sm'>
          <p className="font-bold text-lg text-amber-50">Human Rights First</p>
          <p>75 Broad St, 31st Floor</p>
          <p>New York, New York 10004 US</p>
          <p className='pt-4 text-xs opacity-60'>For Media Inquiries call 202-370-333</p>
        </div>
      </section>

      {/* 2. NAVIGATION LINKS SECTION WITH HOVER */}
      <nav className='footer-links flex flex-wrap gap-10 justify-center pt-8 text-xs uppercase tracking-widest'>
        <button className='transition-all duration-300 hover:text-white hover:scale-105'>About Us</button>
        <button className='transition-all duration-300 hover:text-white hover:scale-105'>Contact Us</button>
        <button className='transition-all duration-300 hover:text-white hover:scale-105'>Press</button>
        <button className='transition-all duration-300 hover:text-white hover:scale-105'>Terms & Privacy</button>
        <button className='transition-all duration-300 hover:text-white hover:scale-105'>Sign Up</button>
        <button className='transition-all duration-300 hover:text-white hover:scale-105'>Careers</button>
      </nav>
    </footer>
  );
}