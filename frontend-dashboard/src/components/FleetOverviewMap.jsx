import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom Icons for Status functionality
const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Fix for default Leaflet marker icons if not using custom ones
const DefaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const FleetOverviewMap = ({ onSelect }) => {
    const [vans, setVans] = useState([]);

    useEffect(() => {
        // Real-time listener for the 'vans' collection
        const unsubscribe = onSnapshot(collection(db, "vans"), (snapshot) => {
            const vanList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setVans(vanList);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <MapContainer center={[39.8283, -98.5795]} zoom={4} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {vans.map(van => (
                    van.currentLocation && (
                        <Marker
                            key={van.id}
                            position={[van.currentLocation.latitude, van.currentLocation.longitude]}
                            icon={van.status === 'active' ? greenIcon : greyIcon}
                            eventHandlers={{
                                click: () => {
                                    if (onSelect) onSelect(van);
                                },
                            }}
                        >
                            <Popup>
                                <strong>Van ID:</strong> {van.id}<br />
                                <strong>Status:</strong> {van.status}<br />
                                <strong>Driver:</strong> {van.driverName || 'Unassigned'}
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
        </div>
    );
};

export default FleetOverviewMap;
