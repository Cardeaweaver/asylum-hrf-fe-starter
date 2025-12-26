import Logo from '../../assets/logo.png';
import { LoggingButtons } from '../../auth/LoggingButtons.jsx';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function Header() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <header className='flex w-full bg-[#1e3a8a] text-blue-50 justify-between px-14 py-2 font-serif'>
        <div className='flex items-center'>
          <NavLink to='/'>
            <img className='w-[100px]' src={Logo} alt='HRF logo white' />
          </NavLink>
        </div>
      </header>
    );
  }

  return (
    //BACKGROUND 
    <header className='flex w-full bg-[#1e3a8a] text-blue-50 justify-between px-14 py-2 font-serif'>
      <div className='flex items-center'>
        <NavLink to='/'>
          <img className='w-[100px]' src={Logo} alt='HRF logo white' />
        </NavLink>
      </div>
      
      <div className='flex items-center py-4 gap-16'>
        <NavLink 
          to='/' 
            className={({ isActive }) => 
    `transition-colors duration-300 hover:text-blue-300 ${isActive ? 'border-b-2 border-blue-300' : ''}`
  }
        >
          Home
        </NavLink>
        <NavLink 
          to='/graphs' 
           className={({ isActive }) => 
    `transition-colors duration-300 hover:text-blue-300 ${isActive ? 'border-b-2 border-blue-300' : ''}`
  }
        >
          Graphs
        </NavLink>
        
        {/* Profile button - only visible when authenticated */}
        {isAuthenticated && (
       <NavLink 
  to='/profile' 
  className={({ isActive }) => 
    `transition-colors duration-300 hover:text-blue-300 ${isActive ? 'border-b-2 border-blue-300' : ''}`
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