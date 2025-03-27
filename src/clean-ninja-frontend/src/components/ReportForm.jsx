import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitWasteReport } from '../../utils/mockService';

const wasteTypes = [
  { value: 'PLASTIC', label: 'Sampah Plastik' },
  { value: 'HOUSEHOLD', label: 'Sampah Rumah Tangga' },
  { value: 'INDUSTRIAL', label: 'Limbah Industri' },
  { value: 'ELECTRONIC', label: 'Sampah Elektronik' },
  { value: 'BULK', label: 'Barang Bekas Berukuran Besar' },
  { value: 'OTHER', label: 'Lainnya' }
];

const severityLevels = [
  { value: 'LOW', label: 'Ringan - Dampak kecil pada lingkungan' },
  { value: 'MEDIUM', label: 'Sedang - Cukup mengganggu dan perlu dibersihkan' },
  { value: 'HIGH', label: 'Tinggi - Berbahaya bagi lingkungan/kesehatan' },
  { value: 'CRITICAL', label: 'Kritis - Sangat berbahaya dan butuh penanganan segera' }
];

function ReportForm() {
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    wasteType: 'PLASTIC',
    severity: 'MEDIUM',
    location: {
      latitude: '',
      longitude: '',
      address: ''
    },
    images: []
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [geolocating, setGeolocating] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested location object
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormState({
        ...formState,
        location: {
          ...formState.location,
          [locationField]: value
        }
      });
    } else {
      setFormState({
        ...formState,
        [name]: value
      });
    }
  };
  
  // Handle file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // In a real app, you would upload this to storage
      // For this mock, we'll just create a URL for preview and store the file name
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        
        // In the mock, we'll use our placeholder images
        setFormState({
          ...formState,
          images: ['/src/clean_ninja_frontend/src/assets/images/placeholder-waste-1.svg']
        });
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setGeolocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormState({
            ...formState,
            location: {
              ...formState.location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
          setGeolocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Gagal mendapatkan lokasi. Pastikan izin lokasi diaktifkan.');
          setGeolocating(false);
        }
      );
    } else {
      setError('Geolokasi tidak didukung oleh browser ini.');
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formState.title.trim()) {
      setError('Judul tidak boleh kosong.');
      return;
    }
    
    if (!formState.description.trim()) {
      setError('Deskripsi tidak boleh kosong.');
      return;
    }
    
    if (!formState.location.latitude || !formState.location.longitude) {
      setError('Lokasi harus ditentukan. Gunakan tombol "Dapatkan Lokasi Saat Ini".');
      return;
    }
    
    if (!formState.location.address.trim()) {
      setError('Alamat tidak boleh kosong.');
      return;
    }
    
    if (formState.images.length === 0) {
      setError('Setidaknya satu gambar harus diunggah.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Call the mock service to submit the report
      const result = await submitWasteReport(formState);
      
      // Navigate to the detail page of the new report
      navigate(`/waste/${result.id}`);
    } catch (err) {
      console.error('Error submitting report:', err);
      setError('Gagal mengirim laporan. Silakan coba lagi nanti.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Laporkan Titik Sampah</h1>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Judul Laporan
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className="input"
              placeholder="Contoh: Tumpukan sampah plastik di pinggir sungai"
              required
            />
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              className="input min-h-[100px]"
              placeholder="Jelaskan secara detail kondisi sampah, potensi bahaya, dan informasi lain yang relevan."
              required
            ></textarea>
          </div>
          
          {/* Waste Type */}
          <div className="mb-4">
            <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Sampah
            </label>
            <select
              id="wasteType"
              name="wasteType"
              value={formState.wasteType}
              onChange={handleChange}
              className="input"
              required
            >
              {wasteTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Severity */}
          <div className="mb-4">
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
              Tingkat Keparahan
            </label>
            <select
              id="severity"
              name="severity"
              value={formState.severity}
              onChange={handleChange}
              className="input"
              required
            >
              {severityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lokasi
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label htmlFor="latitude" className="block text-xs text-gray-500 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  id="latitude"
                  name="location.latitude"
                  value={formState.location.latitude}
                  onChange={handleChange}
                  className="input"
                  placeholder="Contoh: -6.2088"
                  required
                  readOnly
                />
              </div>
              
              <div>
                <label htmlFor="longitude" className="block text-xs text-gray-500 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  id="longitude"
                  name="location.longitude"
                  value={formState.location.longitude}
                  onChange={handleChange}
                  className="input"
                  placeholder="Contoh: 106.8456"
                  required
                  readOnly
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={geolocating}
              className="btn btn-secondary mb-4 w-full"
            >
              {geolocating ? 'Mendapatkan Lokasi...' : 'Dapatkan Lokasi Saat Ini'}
            </button>
            
            <div>
              <label htmlFor="address" className="block text-xs text-gray-500 mb-1">
                Alamat Lengkap
              </label>
              <input
                type="text"
                id="address"
                name="location.address"
                value={formState.location.address}
                onChange={handleChange}
                className="input"
                placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat"
                required
              />
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto Sampah
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                
                <div className="mt-1 flex justify-center">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                        <span>Unggah gambar</span>
                        <input id="image-upload" name="image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                      </label>
                      <p className="pl-1">atau drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF sampai 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="mx-auto h-48 object-cover rounded-md" />
                </div>
              )}
            </div>
          </div>
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting ? 'Mengirim Laporan...' : 'Kirim Laporan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportForm;