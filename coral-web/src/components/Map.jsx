import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  z-index: 0; /* Ensure it stays behind other elements if needed */

  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: 15px;
  }
`;

const MARKERS = [
    { id: 1, position: [-23.5505, -46.6333], title: "Praça da Sé - Iluminação" },
    { id: 2, position: [-23.5565, -46.6623], title: "Av. Paulista - Ciclovia" },
    { id: 3, position: [-23.5874, -46.6576], title: "Parque Ibirapuera - Manutenção" },
];

function MapController({ center }) {
    const map = useMap();

    useEffect(() => {
        map.scrollWheelZoom.enable();
        if (center) {
            map.flyTo(center, 13);
        }
    }, [map, center]);

    return null;
}

const PopupContent = styled.div`
  min-width: 150px;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #F27D70;
    font-family: var(--font-title);
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: space-between;
    color: #4A2525;
    
    span {
      font-weight: 600;
    }
  }
`;

export default function Map({ center = [-23.5505, -46.6333], markers = [] }) {
    return (
        <MapWrapper>
            <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
                <MapController center={center} />
                <TileLayer
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                />
                {markers.map(marker => (
                    <Marker key={marker.id} position={marker.position}>
                        <Popup>
                            <PopupContent>
                                <h4>{marker.total} Demanda(s)</h4>
                                <ul>
                                    {Object.entries(marker.categories).map(([category, count]) => (
                                        <li key={category}>
                                            {category} <span>{count}</span>
                                        </li>
                                    ))}
                                </ul>
                            </PopupContent>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </MapWrapper>
    );
}
