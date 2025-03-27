// API utilities untuk membantu tampilan frontend

/**
 * Konversi data biner ke URL data untuk menampilkan gambar
 * @param {Array<number>} binaryData - Data biner gambar
 * @returns {string} URL data dalam format base64
 */
export const binaryToDataUrl = (binaryData) => {
  const uint8Array = new Uint8Array(binaryData);
  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  return URL.createObjectURL(blob);
};

/**
 * Format timestamp ke tanggal yang dapat dibaca
 * @param {number} timestamp - Timestamp dalam milidetik
 * @returns {string} String tanggal yang diformat
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return 'Tidak ada data';
  
  try {
    const date = new Date(timestamp);
    
    // Format tanggal dalam bahasa Indonesia
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Format tanggal error';
  }
};