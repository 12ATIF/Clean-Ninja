import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons
// See: https://github.com/PaulLeCam/react-leaflet/issues/453
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons based on status
const createMarkerIcon = (status) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-dot ${
      status === 'REPORTED'
        ? 'bg-red-600'
        : status === 'IN_PROGRESS'
        ? 'bg-orange-500'
        : 'bg-green-600'
    }"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to recenter map view
function SetViewOnChange({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function WasteMap({ reports = [], height = '400px', zoom = 10, center = [-6.2088, 106.8456] }) {
  const [activeMarkerId, setActiveMarkerId] = useState(null);

  // Function to format date
  const formatDate = (nanoseconds) => {
    const milliseconds = Number(nanoseconds) / 1000000;
    const date = new Date(milliseconds);
    
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="waste-map" style={{ height }}>
      <style jsx global>{`
        .custom-marker {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .marker-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          min-width: 200px;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {Array.isArray(reports) && reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.latitude, report.location.longitude]}
            icon={createMarkerIcon(report.status)}
            eventHandlers={{
              click: () => {
                setActiveMarkerId(report.id);
              },
            }}
          >
            <Popup>
              <div className="waste-popup">
                <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{formatDate(report.createdAt)}</p>
                
                <div className="flex items-center mb-2">
                  <span className={`inline-block w-3 h-3 rounded-full mr-1 ${
                    report.status === 'REPORTED'
                      ? 'bg-red-600'
                      : report.status === 'IN_PROGRESS'
                      ? 'bg-orange-500'
                      : 'bg-green-600'
                  }`}></span>
                  <span className="text-xs font-medium">
                    {report.status === 'REPORTED'
                      ? 'Dilaporkan'
                      : report.status === 'IN_PROGRESS'
                      ? 'Sedang Dibersihkan'
                      : 'Sudah Bersih'}
                  </span>
                </div>
                
                <Link
                  to={`/waste/${report.id}`}
                  className="block text-center text-xs font-medium bg-primary-600 text-white py-1 px-3 rounded hover:bg-primary-700 transition duration-300"
                >
                  Lihat Detail
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Set view if center or zoom props change */}
        <SetViewOnChange center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}

export default WasteMap;