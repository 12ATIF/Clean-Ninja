import { Principal } from '@dfinity/principal';

// Principal pengguna mock
export const mockUserPrincipal = Principal.fromText('2vxsx-fae');

// Helper untuk mendapatkan timestamp dalam format nanosekon seperti di Internet Computer
export const getNanoTimestamp = () => {
  return BigInt(Date.now()) * BigInt(1000000);
};

// Data profil pengguna mock
export const mockUserProfile = {
  principal: mockUserPrincipal,
  name: 'Budi Santoso',
  joinedAt: getNanoTimestamp() - BigInt(30 * 24 * 60 * 60 * 1000000000), // 30 hari yang lalu
  points: 120
};

// Data laporan sampah mock
export const mockWasteReports = [
  {
    id: '1',
    title: 'Tumpukan sampah di tepi Sungai Ciliwung',
    description: 'Tumpukan sampah plastik dan rumah tangga di tepi sungai yang dapat mencemari aliran air. Terlihat sudah menumpuk selama beberapa hari.',
    location: 'Tepi Sungai Ciliwung, RT 5/RW 3, Kampung Melayu, Jakarta Timur',
    coordinates: {
      lat: -6.2088,
      lng: 106.8456
    },
    wasteType: 'household',
    status: 'reported',
    reportedBy: mockUserPrincipal,
    reportedAt: getNanoTimestamp() - BigInt(5 * 24 * 60 * 60 * 1000000000), // 5 hari yang lalu
    updatedAt: getNanoTimestamp() - BigInt(5 * 24 * 60 * 60 * 1000000000),
    imageUrl: '/src/clean_ninja_frontend/src/assets/images/placeholder-waste-1.svg',
    cleanedImageUrl: null
  },
  {
    id: '2',
    title: 'Sampah elektronik di pinggir jalan',
    description: 'Beberapa barang elektronik bekas seperti TV dan komputer yang dibuang sembarangan di pinggir jalan. Berpotensi mencemari lingkungan dengan kandungan logam berat.',
    location: 'Jl. Raya Bekasi KM 18, RT 7/RW 3, Cakung, Jakarta Timur',
    coordinates: {
      lat: -6.2154,
      lng: 106.9352
    },
    wasteType: 'electronic',
    status: 'in_progress',
    reportedBy: mockUserPrincipal,
    reportedAt: getNanoTimestamp() - BigInt(10 * 24 * 60 * 60 * 1000000000), // 10 hari yang lalu
    updatedAt: getNanoTimestamp() - BigInt(2 * 24 * 60 * 60 * 1000000000), // 2 hari yang lalu
    imageUrl: '/src/clean_ninja_frontend/src/assets/images/placeholder-waste-2.svg',
    cleanedImageUrl: null
  },
  {
    id: '3',
    title: 'Tumpukan sampah konstruksi',
    description: 'Sampah sisa konstruksi bangunan yang ditinggalkan di lahan kosong. Terdiri dari potongan kayu, besi, dan material bangunan lainnya.',
    location: 'Lahan kosong di samping Komplek Perumahan Green Garden, Kedoya, Jakarta Barat',
    coordinates: {
      lat: -6.1768,
      lng: 106.7689
    },
    wasteType: 'construction',
    status: 'cleaned',
    reportedBy: mockUserPrincipal,
    reportedAt: getNanoTimestamp() - BigInt(15 * 24 * 60 * 60 * 1000000000), // 15 hari yang lalu
    updatedAt: getNanoTimestamp() - BigInt(1 * 24 * 60 * 60 * 1000000000), // 1 hari yang lalu
    imageUrl: '/src/clean_ninja_frontend/src/assets/images/placeholder-waste-3.svg',
    cleanedImageUrl: '/src/clean_ninja_frontend/src/assets/images/placeholder-clean-1.svg'
  }
];

// Data komentar mock
export const mockComments = {
  '1': [
    {
      id: '101',
      wasteId: '1',
      text: 'Saya sering lewat tempat ini dan sampahnya semakin banyak. Perlu perhatian segera!',
      author: 'Ahmad',
      createdAt: getNanoTimestamp() - BigInt(4 * 24 * 60 * 60 * 1000000000) // 4 hari yang lalu
    },
    {
      id: '102',
      wasteId: '1',
      text: 'Saya sudah laporkan juga ke RT setempat. Semoga segera dibersihkan.',
      author: 'Siti',
      createdAt: getNanoTimestamp() - BigInt(3 * 24 * 60 * 60 * 1000000000) // 3 hari yang lalu
    }
  ],
  '2': [
    {
      id: '201',
      wasteId: '2',
      text: 'Sampah elektronik harusnya dibuang ke tempat khusus, bukan di pinggir jalan seperti ini.',
      author: 'Dian',
      createdAt: getNanoTimestamp() - BigInt(9 * 24 * 60 * 60 * 1000000000) // 9 hari yang lalu
    },
    {
      id: '202',
      wasteId: '2',
      text: 'Update: Sudah ada tim dari dinas lingkungan hidup yang mulai membersihkan area ini.',
      author: 'Rudi',
      createdAt: getNanoTimestamp() - BigInt(2 * 24 * 60 * 60 * 1000000000) // 2 hari yang lalu
    }
  ],
  '3': [
    {
      id: '301',
      wasteId: '3',
      text: 'Ini sangat mengganggu pemandangan dan berbahaya bagi anak-anak yang bermain di sekitar area.',
      author: 'Dewi',
      createdAt: getNanoTimestamp() - BigInt(14 * 24 * 60 * 60 * 1000000000) // 14 hari yang lalu
    },
    {
      id: '302',
      wasteId: '3',
      text: 'Saya dan beberapa warga sudah koordinasi dengan pengembang perumahan untuk membersihkan ini.',
      author: 'Hendra',
      createdAt: getNanoTimestamp() - BigInt(10 * 24 * 60 * 60 * 1000000000) // 10 hari yang lalu
    },
    {
      id: '303',
      wasteId: '3',
      text: 'Alhamdulillah sudah dibersihkan oleh tim dari pengembang. Terima kasih atas laporannya!',
      author: 'Anita',
      createdAt: getNanoTimestamp() - BigInt(1 * 24 * 60 * 60 * 1000000000) // 1 hari yang lalu
    }
  ]
};