import { useAuth0 } from '@auth0/auth0-react';

/**
 * Profile page that displays authenticated user information
 */
const Profile = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return (
      <div className='flex flex-col w-full min-h-screen font-serif bg-white'>
        <section className="bg-[#1e3a8a] text-white py-12 px-10 text-center">
          <h1 className='text-4xl font-normal'>User Profile</h1>
        </section>
        <main className='flex-grow flex flex-col items-center py-16 px-4'>
          <div className='text-center py-20'>Loading...</div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className='flex flex-col w-full min-h-screen font-serif bg-white'>
        <section className="bg-[#404037] text-white py-12 px-10 text-center">
          <h1 className='text-4xl font-normal'>User Profile</h1>
        </section>
        <main className='flex-grow flex flex-col items-center py-16 px-4'>
          <div className='text-center py-20 text-red-500'>
            Please log in to view your profile.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full min-h-screen font-serif bg-white'>
      {/* Header Section */}
      <section className="bg-[#1e3a8a] text-white py-12 px-10 text-center">
        <h1 className='text-4xl font-normal'>User Profile</h1>
      </section>

      {/* Main Content */}
      <main className='flex-grow flex flex-col items-center py-16 px-4'>
        <div className='w-full max-w-2xl bg-white shadow-lg rounded-xl p-8'>
          {/* Profile Picture */}
          {user.picture && (
            <div className='flex justify-center mb-8'>
              <img 
                src={user.picture} 
                alt={user.name || 'User'} 
                className='w-32 h-32 rounded-full object-cover border-4 border-[#1e3a8a]'
              />
            </div>
          )}

          {/* User Information */}
          <div className='space-y-6'>
            <div className='border-b border-gray-200 pb-4'>
              <h2 className='text-2xl font-semibold text-[#1e3a8a] mb-2'>
                {user.name || 'User Profile'}
              </h2>
              <p className='text-gray-600'>{user.email}</p>
            </div>

            {/* Additional Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {user.nickname && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-700 uppercase'>Nickname</h3>
                  <p className='text-gray-600'>{user.nickname}</p>
                </div>
              )}

              {user.email_verified !== undefined && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-700 uppercase'>Email Verified</h3>
                  <p className={user.email_verified ? 'text-green-600' : 'text-red-600'}>
                    {user.email_verified ? 'Yes' : 'No'}
                  </p>
                </div>
              )}

              {user.updated_at && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-700 uppercase'>Last Updated</h3>
                  <p className='text-gray-600'>
                    {new Date(user.updated_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
