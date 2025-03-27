import React from 'react';
import { Link } from 'react-router-dom';

// Mapping status ke tampilan visual
const statusBadge = {
  'REPORTED': {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    label: 'Dilaporkan'
  },
  'IN_PROGRESS': {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-200',
    label: 'Sedang Dibersihkan'
  },
  'CLEANED': {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    label: 'Sudah Bersih'
  }
};

// Mapping jenis sampah ke nama yang ditampilkan
const wasteTypeLabel = {
  'PLASTIC': 'Sampah Plastik',
  'HOUSEHOLD': 'Sampah Rumah Tangga',
  'INDUSTRIAL': 'Limbah Industri',
  'ELECTRONIC': 'Sampah Elektronik',
  'BULK': 'Barang Bekas Besar',
  'OTHER': 'Lainnya'
};

// Mapping tingkat keparahan ke tampilan visual
const severityBadge = {
  'LOW': {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    label: 'Ringan'
  },
  'MEDIUM': {
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    label: 'Sedang'
  },
  'HIGH': {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    label: 'Tinggi'
  },
  'CRITICAL': {
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    label: 'Kritis'
  }
};

// Format tanggal dari nanosekon ke format yang mudah dibaca
const formatDate = (nanoseconds) => {
  // Konversi dari nanoseconds ke milliseconds (bagi 1,000,000)
  const milliseconds = Number(nanoseconds) / 1000000;
  const date = new Date(milliseconds);
  
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

function WasteCard({ waste, showActions = true }) {
  const statusInfo = statusBadge[waste.status];
  const severityInfo = severityBadge[waste.severity];
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300">
      <div className="relative">
        <img 
          src={waste.images[0]} 
          alt={waste.title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/src/clean_ninja_frontend/src/assets/images/placeholder-waste-1.svg'; // Default image
          }}
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <span className={`${statusInfo.bgColor} ${statusInfo.textColor} text-xs px-2 py-1 rounded-full font-medium`}>
            {statusInfo.label}
          </span>
          <span className={`${severityInfo.bgColor} ${severityInfo.textColor} text-xs px-2 py-1 rounded-full font-medium`}>
            {severityInfo.label}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{waste.title}</h3>
        
        <p className="text-sm text-gray-600 mb-2">{waste.location.address}</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(waste.createdAt)}
          </span>
          <span className="mx-2">•</span>
          <span>{wasteTypeLabel[waste.wasteType]}</span>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{waste.description}</p>
        
        {showActions && (
          <div className="pt-2 border-t border-gray-100">
            <Link 
              to={`/waste/${waste.id}`}
              className="w-full inline-block text-center py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition duration-300"
            >
              Lihat Detail
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default WasteCard;