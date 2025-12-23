import Logo from '../../assets/logo.png';
import { LoggingButtons } from '../../auth/LoggingButtons.jsx';
import { NavLink } from 'react-router-dom';

export default function Header() {
  // Set to true for now so you can see the Profile button
  const isAuthenticated = true; 

  return (
    //BACKGROUND 
    <header className='flex w-full bg-[#404037] text-amber-50 justify-between px-14 py-2 font-serif'>
      <div className='flex items-center'>
        <NavLink to='/'>
          <img className='w-[100px]' src={Logo} alt='HRF logo white' />
        </NavLink>
      </div>
      
      <div className='flex items-center py-4 gap-16'>
        <NavLink 
          to='/' 
            className={({ isActive }) => 
    `transition-colors duration-300 hover:text-amber-200 ${isActive ? 'border-b-2 border-amber-200' : ''}`
  }
        >
          Home
        </NavLink>
        <NavLink 
          to='/graphs' 
           className={({ isActive }) => 
    `transition-colors duration-300 hover:text-amber-200 ${isActive ? 'border-b-2 border-amber-200' : ''}`
  }
        >
          Graphs
        </NavLink>
        
        {/* Profile button */}
        {isAuthenticated && (
       <NavLink 
  to='/profile' 
  className={({ isActive }) => 
    `transition-colors duration-300 hover:text-amber-200 ${isActive ? 'border-b-2 border-amber-200' : ''}`
  }
>
  Profile
</NavLink>
        )}
        
        <LoggingButtons />
      </div>
    </header>
  );
}