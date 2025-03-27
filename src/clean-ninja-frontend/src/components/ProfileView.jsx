import React, { useState, useEffect } from 'react';
import { getUserProfile, getWasteReportsByUser, getCleanedReportsByUser } from '../../utils/mockService';
import WasteCard from './WasteCard';

function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [userReports, setUserReports] = useState([]);
  const [cleanedReports, setCleanedReports] = useState([]);
  const [activeTab, setActiveTab] = useState('reported');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch user profile
        const profileData = await getUserProfile();
        setProfile(profileData);
        
        // Fetch reports created by user
        const reportsData = await getWasteReportsByUser(profileData.principal);
        setUserReports(reportsData);
        
        // Fetch reports cleaned by user
        const cleanedData = await getCleanedReportsByUser(profileData.principal);
        setCleanedReports(cleanedData);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Gagal memuat data profil. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-600">Memuat profil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Profile header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-2xl font-bold">
                {profile.displayName.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">{profile.displayName}</h1>
            <p className="text-gray-600 mb-2">@{profile.username}</p>
            <p className="text-gray-700 mb-4">{profile.bio}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="text-center">
                <p className="text-xl font-bold text-primary-600">{profile.reportsCount}</p>
                <p className="text-sm text-gray-600">Dilaporkan</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-green-600">{profile.cleanedCount}</p>
                <p className="text-sm text-gray-600">Dibersihkan</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-700">{profile.createdAt ? new Date(Number(profile.createdAt) / 1000000).toLocaleDateString('id-ID', { year: 'numeric', month: 'long' }) : '-'}</p>
                <p className="text-sm text-gray-600">Bergabung</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for user reports and cleaned reports */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('reported')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'reported'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Laporan Saya
            </button>
            <button
              onClick={() => setActiveTab('cleaned')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'cleaned'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dibersihkan Oleh Saya
            </button>
          </nav>
        </div>
      </div>
      
      {/* Display reports based on active tab */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'reported' && userReports.length > 0 && (
          userReports.map(report => (
            <WasteCard key={report.id} waste={report} />
          ))
        )}
        
        {activeTab === 'cleaned' && cleanedReports.length > 0 && (
          cleanedReports.map(report => (
            <WasteCard key={report.id} waste={report} />
          ))
        )}
        
        {activeTab === 'reported' && userReports.length === 0 && (
          <div className="col-span-full py-10 text-center text-gray-500">
            <p>Anda belum melaporkan titik sampah apapun.</p>
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Laporkan Sampah
            </button>
          </div>
        )}
        
        {activeTab === 'cleaned' && cleanedReports.length === 0 && (
          <div className="col-span-full py-10 text-center text-gray-500">
            <p>Anda belum membersihkan titik sampah apapun.</p>
            <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
              Lihat Peta Sampah
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileView;