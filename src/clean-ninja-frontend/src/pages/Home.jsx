import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WasteCard from '../components/WasteCard';
import { getAllWasteReports } from '../../utils/mockService';

function Home() {
  const [recentReports, setRecentReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentReports = async () => {
      try {
        setIsLoading(true);
        const data = await getAllWasteReports();
        
        // Sort by date (newest first) and take first 3
        const sortedReports = [...data].sort((a, b) => 
          Number(b.createdAt) - Number(a.createdAt)
        ).slice(0, 3);
        
        setRecentReports(sortedReports);
      } catch (err) {
        console.error('Error fetching waste reports:', err);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentReports();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Bersihkan Indonesia, Satu Laporan <span className="text-green-300">Sampah</span> Keselamatan
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-green-100">
              Laporkan sampah dan limbah di sekitar Anda. Jadilah bagian dari solusi untuk Indonesia yang lebih bersih dan sehat.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link to="/report" className="px-8 py-3 bg-white text-primary-700 rounded-md font-medium hover:bg-gray-100 transition duration-300">
                Laporkan Sampah
              </Link>
              <Link to="/map" className="px-8 py-3 bg-primary-700 text-white rounded-md font-medium hover:bg-primary-800 transition duration-300">
                Lihat Peta
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-600 opacity-50"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Cara Kerja</h2>
            <p className="mt-4 text-xl text-gray-600">Proses sederhana untuk membuat perbedaan besar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Laporkan</h3>
              <p className="text-gray-600">
                Ambil foto sampah, unggah ke aplikasi dengan lokasi dan deskripsi.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Lihat di Peta</h3>
              <p className="text-gray-600">
                Semua laporan akan muncul di peta interaktif untuk penanganan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Bersihkan</h3>
              <p className="text-gray-600">
                Bersihkan sampah dan unggah bukti untuk mendapatkan reputasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Laporan Terbaru</h2>
            <Link to="/map" className="text-primary-600 hover:text-primary-700 font-medium">
              Lihat Semua
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <p className="text-gray-500">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReports.map((report) => (
                <WasteCard key={report.id} waste={report} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Bergabunglah dengan Gerakan Kebersihan
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Bersama-sama kita bisa menciptakan lingkungan yang lebih bersih dan lebih sehat untuk semua.
            Mulailah dengan melaporkan sampah di sekitar Anda.
          </p>
          <Link
            to="/report"
            className="px-8 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition duration-300"
          >
            Laporkan Sampah Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;