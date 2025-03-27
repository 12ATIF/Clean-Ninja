// Helper to generate unique IDs
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Generate timestamp untuk data (dalam milidetik)
export const getTimestamp = () => {
  return Date.now();
};

// Fungsi untuk mendapatkan waktu tertentu (hari) yang lalu dalam milidetik
const getDaysAgo = (days) => {
  return getTimestamp() - (days * 24 * 60 * 60 * 1000);
};

// Mocked user ID untuk autentikasi
export const mockUserId = "user-123456";

// Mocked user profile
export const mockUserProfile = {
  id: mockUserId,
  displayName: 'Budi Santoso',
  username: 'budi_green_warrior',
  bio: 'Aktivis lingkungan dan pencinta alam. Bersama kita bisa membuat Indonesia lebih bersih.',
  avatar: null,
  reportsCount: 5,
  cleanedCount: 3,
  createdAt: getDaysAgo(60), // 60 days ago
};

// Mocked waste reports
export const mockWasteReports = [
  {
    id: generateId(),
    title: 'Tumpukan sampah plastik di pinggir sungai',
    description: 'Tumpukan sampah plastik yang cukup besar di tepi Sungai Ciliwung. Terlihat banyak botol plastik, kantong plastik, dan kemasan makanan. Berpotensi mencemari aliran sungai, terutama saat hujan.',
    status: 'REPORTED',
    wasteType: 'PLASTIC',
    severity: 'HIGH',
    location: {
      latitude: -6.2088,
      longitude: 106.8456,
      address: 'Jl. Jenderal Sudirman, Jakarta Pusat, DKI Jakarta'
    },
    images: ['/src/clean_ninja_frontend/src/assets/images/placeholder-waste-1.svg'],
    cleanedImage: null,
    reporter: {
      id: mockUserId,
      displayName: 'Budi Santoso'
    },
    cleaner: null,
    createdAt: getDaysAgo(7), // 7 days ago
    updatedAt: getDaysAgo(7) // same as created
  },
  {
    id: generateId(),
    title: 'Limbah industri mencemari saluran air',
    description: 'Terlihat cairan berwarna gelap yang diduga limbah industri mengalir ke saluran air di dekat pabrik tekstil. Cairan memiliki bau menyengat dan menimbulkan busa di permukaan air.',
    status: 'IN_PROGRESS',
    wasteType: 'INDUSTRIAL',
    severity: 'CRITICAL',
    location: {
      latitude: -6.1751,
      longitude: 106.8650,
      address: 'Jl. Industri Raya, Pulo Gadung, Jakarta Timur, DKI Jakarta'
    },
    images: ['/src/clean_ninja_frontend/src/assets/images/placeholder-waste-2.svg'],
    cleanedImage: null,
    reporter: {
      id: 'user-789012',
      displayName: 'Ahmad Rizki'
    },
    cleaner: {
      id: mockUserId,
      displayName: 'Budi Santoso'
    },
    createdAt: getDaysAgo(5), // 5 days ago
    updatedAt: getDaysAgo(2) // 2 days ago
  },
  {
    id: generateId(),
    title: 'Tumpukan barang elektronik bekas',
    description: 'Tumpukan barang elektronik bekas seperti TV rusak, komputer lama, dan beberapa perangkat rumah tangga yang sudah tidak terpakai dibuang di lapangan kosong. Berpotensi mencemari tanah dengan bahan kimia berbahaya.',
    status: 'CLEANED',
    wasteType: 'ELECTRONIC',
    severity: 'MEDIUM',
    location: {
      latitude: -6.2023,
      longitude: 106.8188,
      address: 'Jl. Tanah Abang III, Tanah Abang, Jakarta Pusat, DKI Jakarta'
    },
    images: ['/src/clean_ninja_frontend/src/assets/images/placeholder-waste-3.svg'],
    cleanedImage: '/src/clean_ninja_frontend/src/assets/images/placeholder-clean-1.svg',
    reporter: {
      id: mockUserId,
      displayName: 'Budi Santoso'
    },
    cleaner: {
      id: mockUserId,
      displayName: 'Budi Santoso'
    },
    createdAt: getDaysAgo(14), // 14 days ago
    updatedAt: getDaysAgo(10) // 10 days ago
  },
  {
    id: generateId(),
    title: 'Sampah rumah tangga di trotoar',
    description: 'Beberapa kantong sampah rumah tangga dibuang di pinggir trotoar, menyebabkan bau tidak sedap dan mengganggu pejalan kaki. Sampah terlihat sudah beberapa hari tidak diangkut.',
    status: 'REPORTED',
    wasteType: 'HOUSEHOLD',
    severity: 'LOW',
    location: {
      latitude: -6.1901,
      longitude: 106.8224,
      address: 'Jl. Sabang, Menteng, Jakarta Pusat, DKI Jakarta'
    },
    images: ['/src/clean_ninja_frontend/src/assets/images/placeholder-waste-2.svg'],
    cleanedImage: null,
    reporter: {
      id: 'user-789012',
      displayName: 'Ahmad Rizki'
    },
    cleaner: null,
    createdAt: getDaysAgo(3), // 3 days ago
    updatedAt: getDaysAgo(3) // same as created
  },
  {
    id: generateId(),
    title: 'Sofa dan kasur bekas di pinggir jalan',
    description: 'Sofa rusak dan kasur bekas dibuang di pinggir jalan perumahan. Mengganggu pemandangan dan menghambat lalu lintas. Sudah hampir seminggu tidak diangkut.',
    status: 'CLEANED',
    wasteType: 'BULK',
    severity: 'MEDIUM',
    location: {
      latitude: -6.2641,
      longitude: 106.7948,
      address: 'Jl. Raya Cilandak, Cilandak, Jakarta Selatan, DKI Jakarta'
    },
    images: ['/src/clean_ninja_frontend/src/assets/images/placeholder-waste-3.svg'],
    cleanedImage: '/src/clean_ninja_frontend/src/assets/images/placeholder-clean-2.svg',
    reporter: {
      id: mockUserId,
      displayName: 'Budi Santoso'
    },
    cleaner: {
      id: 'user-345678',
      displayName: 'Dewi Lestari'
    },
    createdAt: getDaysAgo(20), // 20 days ago
    updatedAt: getDaysAgo(18) // 18 days ago
  },
  {
    id: generateId(),
    title: 'Ceceran oli dan minyak di bengkel',
    description: 'Ceceran oli dan minyak kendaraan dari bengkel motor yang mengalir ke selokan. Permukaan air selokan terlihat berminyak dan menimbulkan bau tidak sedap.',
    status: 'IN_PROGRESS',
    wasteType: 'OTHER',
    severity: 'HIGH',
    location: {
      latitude: -6.2354,
      longitude: 106.8892,
      address: 'Jl. Raya Kalimalang, Duren Sawit, Jakarta Timur, DKI Jakarta'
    },
    images: ['/src/clean_ninja_frontend/src/assets/images/placeholder-waste-1.svg'],
    cleanedImage: null,
    reporter: {
      id: mockUserId,
      displayName: 'Budi Santoso'
    },
    cleaner: {
      id: mockUserId,
      displayName: 'Budi Santoso'
    },
    createdAt: getDaysAgo(4), // 4 days ago
    updatedAt: getDaysAgo(1) // 1 day ago
  }
];

// Mocked comments for waste reports
export const mockComments = {
  [mockWasteReports[0].id]: [
    {
      id: generateId(),
      text: 'Saya akan coba bersihkan akhir pekan ini.',
      author: {
        id: 'user-345678',
        displayName: 'Dewi Lestari'
      },
      createdAt: getDaysAgo(5) // 5 days ago
    },
    {
      id: generateId(),
      text: 'Saya sudah hubungi dinas kebersihan untuk membantu.',
      author: {
        id: mockUserId,
        displayName: 'Budi Santoso'
      },
      createdAt: getDaysAgo(4) // 4 days ago
    }
  ],
  [mockWasteReports[1].id]: [
    {
      id: generateId(),
      text: 'Saya sudah laporkan ke Dinas Lingkungan Hidup.',
      author: {
        id: 'user-789012',
        displayName: 'Ahmad Rizki'
      },
      createdAt: getDaysAgo(4) // 4 days ago
    }
  ]
};

// Create mock API object
export const mockApi = {
  wasteReports: [...mockWasteReports],
  userProfile: {...mockUserProfile},
  comments: {...mockComments}
};