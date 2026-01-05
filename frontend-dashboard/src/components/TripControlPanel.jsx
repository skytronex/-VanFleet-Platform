import React, { useState } from 'react';
import { startTrip, endTrip } from '../services/api';

const TripControlPanel = ({ selectedVan }) => {
    const [loading, setLoading] = useState(false);
    const [purpose, setPurpose] = useState('Delivery');
    const [odometer, setOdometer] = useState('');

    const handleStartTrip = async () => {
        if (!selectedVan) return;

        if (!window.confirm(`Are you sure you want to START a trip for ${selectedVan.name}?`)) {
            return;
        }

        setLoading(true);
        try {
            await startTrip({
                vanId: selectedVan.id,
                startOdometer: parseInt(odometer),
                purpose: purpose
            });
            alert('Trip Started! Map marker should turn GREEN.');
            setOdometer('');
        } catch (e) {
            alert('Failed to start trip.');
        } finally {
            setLoading(false);
        }
    };

    const handleEndTrip = async () => {
        // In a real app, you'd track the active trip ID. 
        // For this demo, we assume the van has an 'activeTripId' field in Firestore
        if (!selectedVan || !selectedVan.activeTripId) return;

        if (!window.confirm(`Are you sure you want to END the trip for ${selectedVan.name}? This will trigger the AI Audit.`)) {
            return;
        }

        setLoading(true);
        try {
            await endTrip(selectedVan.activeTripId, parseInt(odometer));
            alert('Trip Ends. AI Agent analyzing expenses...');
            setOdometer('');
        } catch (e) {
            alert('Failed to end trip.');
        } finally {
            setLoading(false);
        }
    };

    if (!selectedVan) return <div className="p-4">Select a van on the map.</div>;

    return (
        <div className="bg-white p-4 rounded shadow mt-4">
            <h3 className="text-lg font-bold mb-2">Remote Trip Control</h3>
            <div className="mb-2">
                <label className="block text-sm font-medium">Van: {selectedVan.name}</label>
            </div>

            <div className="space-y-3">
                <input
                    type="number"
                    placeholder="Current Odometer"
                    className="w-full border p-2 rounded"
                    value={odometer}
                    onChange={(e) => setOdometer(e.target.value)}
                />

                {selectedVan.status === 'active' ? ( // Simplified status check
                    <button
                        onClick={handleEndTrip}
                        disabled={loading}
                        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    >
                        {loading ? 'Processing...' : 'End Trip'}
                    </button>
                ) : (
                    <>
                        <select
                            className="w-full border p-2 rounded"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                        >
                            <option>Delivery</option>
                            <option>Maintenance</option>
                            <option>Personal</option>
                        </select>
                        <button
                            onClick={handleStartTrip}
                            disabled={loading}
                            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                        >
                            {loading ? 'Starting...' : 'Start Trip'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TripControlPanel;
