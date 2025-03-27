import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWasteReportById, updateWasteStatus } from '../../utils/mockService';
import WasteMap from '../components/WasteMap';

// Mapping status ke kelas
const statusClasses = {
  'REPORTED': 'bg-red-100 text-red-800 border-red-200',
  'IN_PROGRESS': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'CLEANED': 'bg-green-100 text-green-800 border-green-200'
};

// Mapping status ke label
const statusLabels = {
  'REPORTED': 'Dilaporkan',
  'IN_PROGRESS': 'Sedang Dibersihkan',
  'CLEANED': 'Sudah Bersih'
};

// Mapping jenis sampah
const wasteTypeLabels = {
  'PLASTIC': 'Sampah Plastik',
  'HOUSEHOLD': 'Sampah Rumah Tangga',
  'INDUSTRIAL': 'Limbah Industri',
  'ELECTRONIC': 'Sampah Elektronik',
  'BULK': 'Barang Bekas Besar',
  'OTHER': 'Lainnya'
};

// Format tanggal
const formatDate = (nanoseconds) => {
  const milliseconds = Number(nanoseconds) / 1000000;
  const date = new Date(milliseconds);
  
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

function WasteDetail() {
  const { id } = useParams();
  const [waste, setWaste] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cleanedImage, setCleanedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchWasteDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getWasteReportById(id);
        setWaste(data);
      } catch (err) {
        console.error('Error fetching waste detail:', err);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWasteDetail();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        // In a real app, we would upload to storage
        // For mock, we'll use our placeholder
        setCleanedImage('/src/clean_ninja_frontend/src/assets/images/placeholder-clean-1.svg');
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setIsUpdating(true);
      
      if (newStatus === 'CLEANED' && !cleanedImage) {
        alert('Harap unggah foto bukti pembersihan terlebih dahulu.');
        setIsUpdating(false);
        return;
      }
      
      const updatedWaste = await updateWasteStatus(id, newStatus, cleanedImage || null);
      setWaste(updatedWaste);
      setImagePreview(null);
      setCleanedImage(null);
    } catch (err) {
      console.error('Error updating waste status:', err);
      alert('Gagal memperbarui status. Silakan coba lagi nanti.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error || !waste) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error || 'Laporan sampah tidak ditemukan.'}
        </div>
        <div className="mt-4">
          <Link to="/map" className="text-primary-600 hover:text-primary-700">
            &larr; Kembali ke Peta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link to="/map" className="text-primary-600 hover:text-primary-700 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali ke Peta
        </Link>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">{waste.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[waste.status]}`}>
              {statusLabels[waste.status]}
            </span>
          </div>
          <p className="text-gray-600 mt-1">{waste.location.address}</p>
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold mb-3">Foto Sampah</h2>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img
                src={waste.images[0]}
                alt="Waste"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/src/clean_ninja_frontend/src/assets/images/placeholder-waste-1.svg';
                }}
              />
            </div>
          </div>
          
          {waste.cleanedImage && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Foto Setelah Dibersihkan</h2>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={waste.cleanedImage}
                  alt="Cleaned"
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/src/clean_ninja_frontend/src/assets/images/placeholder-clean-1.svg';
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Waste details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold mb-3">Detail Laporan</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deskripsi</h3>
                <p className="mt-1 text-gray-900">{waste.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Jenis Sampah</h3>
                  <p className="mt-1 text-gray-900">{wasteTypeLabels[waste.wasteType]}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tingkat Keparahan</h3>
                  <p className="mt-1 text-gray-900">{waste.severity}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dilaporkan Pada</h3>
                  <p className="mt-1 text-gray-900">{formatDate(waste.createdAt)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Diperbarui Pada</h3>
                  <p className="mt-1 text-gray-900">{formatDate(waste.updatedAt || waste.createdAt)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dilaporkan Oleh</h3>
                <p className="mt-1 text-gray-900">{waste.reporter?.displayName || 'Anonim'}</p>
              </div>
              
              {waste.cleaner && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Dibersihkan Oleh</h3>
                  <p className="mt-1 text-gray-900">{waste.cleaner.displayName}</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-3">Lokasi</h2>
            <div className="rounded-lg overflow-hidden border border-gray-200 h-64">
              <WasteMap reports={[waste]} height="100%" zoom={15} center={[waste.location.latitude, waste.location.longitude]} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Latitude</h3>
                <p className="mt-1 text-gray-900">{waste.location.latitude}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Longitude</h3>
                <p className="mt-1 text-gray-900">{waste.location.longitude}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {waste.status !== 'CLEANED' && (
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-3">Perbarui Status</h2>
            
            {waste.status === 'REPORTED' && (
              <div className="mb-4">
                <button
                  onClick={() => handleStatusUpdate('IN_PROGRESS')}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 disabled:opacity-50"
                >
                  {isUpdating ? 'Memperbarui...' : 'Mulai Pembersihan'}
                </button>
              </div>
            )}
            
            {(waste.status === 'REPORTED' || waste.status === 'IN_PROGRESS') && (
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Tandai Sebagai Sudah Dibersihkan</h3>
                <div className="mb-4">
                  <label className="block text-sm text-gray-500 mb-1">
                    Unggah Foto Bukti Pembersihan
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-primary-50 file:text-primary-600
                      hover:file:bg-primary-100"
                  />
                </div>
                
                {imagePreview && (
                  <div className="mb-4">
                    <img src={imagePreview} alt="Preview" className="h-40 object-cover rounded-md" />
                  </div>
                )}
                
                <button
                  onClick={() => handleStatusUpdate('CLEANED')}
                  disabled={isUpdating || !cleanedImage}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 disabled:opacity-50"
                >
                  {isUpdating ? 'Memperbarui...' : 'Tandai Sudah Dibersihkan'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WasteDetail;