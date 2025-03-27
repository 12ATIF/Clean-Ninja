import { mockApi, mockUserId, getTimestamp } from '../src/mocks/mockData';

/**
 * Mendapatkan semua laporan sampah
 * @returns {Promise<Array>} Array dari laporan sampah
 */
export const getAllWasteReports = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApi.wasteReports);
    }, 500);
  });
};

/**
 * Mendapatkan laporan sampah berdasarkan ID
 * @param {string} id - ID laporan
 * @returns {Promise<Object>} Detail laporan sampah
 */
export const getWasteReportById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const report = mockApi.wasteReports.find(report => report.id === id);
      if (report) {
        resolve(report);
      } else {
        reject(new Error('Laporan tidak ditemukan'));
      }
    }, 300);
  });
};

/**
 * Mendapatkan laporan sampah dari pengguna tertentu
 * @param {string} userId - ID pengguna
 * @returns {Promise<Array>} Array dari laporan sampah
 */
export const getWasteReportsByUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reports = mockApi.wasteReports.filter(
        report => report.reporter.id === userId
      );
      resolve(reports);
    }, 300);
  });
};

/**
 * Mengirim laporan sampah baru
 * @param {Object} reportData - Data laporan baru
 * @returns {Promise<Object>} Laporan yang berhasil dibuat
 */
export const submitWasteReport = async (reportData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = getTimestamp();
      const newReport = {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        ...reportData,
        status: 'REPORTED',
        reporter: {
          id: mockUserId,
          displayName: mockApi.userProfile.displayName
        },
        cleaner: null,
        createdAt: now,
        updatedAt: now
      };
      
      mockApi.wasteReports.unshift(newReport);
      mockApi.userProfile.reportsCount += 1;
      
      resolve(newReport);
    }, 800);
  });
};

/**
 * Mengubah status laporan sampah
 * @param {string} id - ID laporan
 * @param {string} newStatus - Status baru (IN_PROGRESS atau CLEANED)
 * @param {string|null} cleanedImage - URL gambar bukti pembersihan (jika status = CLEANED)
 * @returns {Promise<Object>} Laporan yang telah diperbarui
 */
export const updateWasteStatus = async (id, newStatus, cleanedImage = null) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reportIndex = mockApi.wasteReports.findIndex(report => report.id === id);
      
      if (reportIndex === -1) {
        reject(new Error('Laporan tidak ditemukan'));
        return;
      }
      
      const updatedReport = {
        ...mockApi.wasteReports[reportIndex],
        status: newStatus,
        updatedAt: getTimestamp()
      };
      
      // Update cleaner dan cleanedImage jika status = CLEANED
      if (newStatus === 'CLEANED') {
        updatedReport.cleaner = {
          id: mockUserId,
          displayName: mockApi.userProfile.displayName
        };
        updatedReport.cleanedImage = cleanedImage;
        
        // Update jumlah pembersihan pengguna jika belum membersihkan sebelumnya
        if (mockApi.wasteReports[reportIndex].status !== 'CLEANED') {
          mockApi.userProfile.cleanedCount += 1;
        }
      }
      
      mockApi.wasteReports[reportIndex] = updatedReport;
      resolve(updatedReport);
    }, 600);
  });
};

/**
 * Mendapatkan profil pengguna yang sedang login
 * @returns {Promise<Object>} Data profil pengguna
 */
export const getUserProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApi.userProfile);
    }, 200);
  });
};

/**
 * Mendapatkan laporan yang dibersihkan oleh pengguna tertentu
 * @param {string} userId - ID pengguna
 * @returns {Promise<Array>} Array dari laporan yang dibersihkan
 */
export const getCleanedReportsByUser = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reports = mockApi.wasteReports.filter(
        report => report.cleaner && report.cleaner.id === userId
      );
      resolve(reports);
    }, 300);
  });
};