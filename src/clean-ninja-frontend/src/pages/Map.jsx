import React, { useState, useEffect } from 'react';
import WasteMap from '../components/WasteMap';
import { getAllWasteReports } from '../../utils/mockService';

function Map() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'ALL',
    wasteType: 'ALL',
    severity: 'ALL'
  });

  // Fetch waste reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        const data = await getAllWasteReports();
        setReports(data);
        setFilteredReports(data);
      } catch (err) {
        console.error('Error fetching waste reports:', err);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Apply filters when filter state changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...reports];
      
      // Filter by status
      if (filters.status !== 'ALL') {
        filtered = filtered.filter(report => report.status === filters.status);
      }
      
      // Filter by waste type
      if (filters.wasteType !== 'ALL') {
        filtered = filtered.filter(report => report.wasteType === filters.wasteType);
      }
      
      // Filter by severity
      if (filters.severity !== 'ALL') {
        filtered = filtered.filter(report => report.severity === filters.severity);
      }
      
      setFilteredReports(filtered);
    };
    
    if (reports.length > 0) {
      applyFilters();
    }
  }, [filters, reports]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: 'ALL',
      wasteType: 'ALL',
      severity: 'ALL'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Peta Sampah &amp; Limbah</h1>
      
      {/* Filters section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-lg font-semibold mb-4 md:mb-0">Filter</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
            {/* Status filter */}
            <div>
              <label htmlFor="status" className="block text-sm text-gray-600 mb-1">Status</label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="input text-sm"
              >
                <option value="ALL">Semua Status</option>
                <option value="REPORTED">Dilaporkan</option>
                <option value="IN_PROGRESS">Sedang Dibersihkan</option>
                <option value="CLEANED">Sudah Bersih</option>
              </select>
            </div>
            
            {/* Waste type filter */}
            <div>
              <label htmlFor="wasteType" className="block text-sm text-gray-600 mb-1">Jenis Sampah</label>
              <select
                id="wasteType"
                name="wasteType"
                value={filters.wasteType}
                onChange={handleFilterChange}
                className="input text-sm"
              >
                <option value="ALL">Semua Jenis</option>
                <option value="PLASTIC">Sampah Plastik</option>
                <option value="HOUSEHOLD">Sampah Rumah Tangga</option>
                <option value="INDUSTRIAL">Limbah Industri</option>
                <option value="ELECTRONIC">Sampah Elektronik</option>
                <option value="BULK">Barang Bekas Berukuran Besar</option>
                <option value="OTHER">Lainnya</option>
              </select>
            </div>
            
            {/* Severity filter */}
            <div>
              <label htmlFor="severity" className="block text-sm text-gray-600 mb-1">Tingkat Keparahan</label>
              <select
                id="severity"
                name="severity"
                value={filters.severity}
                onChange={handleFilterChange}
                className="input text-sm"
              >
                <option value="ALL">Semua Tingkat</option>
                <option value="LOW">Ringan</option>
                <option value="MEDIUM">Sedang</option>
                <option value="HIGH">Tinggi</option>
                <option value="CRITICAL">Kritis</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={clearFilters}
            className="mt-4 md:mt-0 md:ml-4 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Reset Filter
          </button>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Menampilkan {filteredReports.length} titik sampah dari total {reports.length}
        </div>
      </div>
      
      {/* Map section */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <p className="text-gray-500">Memuat peta...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <WasteMap reports={filteredReports} height="70vh" />
        </div>
      )}
      
      {/* Legend section */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold mb-3">Legenda</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
            <span className="text-sm">Dilaporkan</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-sm">Sedang Dibersihkan</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
            <span className="text-sm">Sudah Bersih</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;