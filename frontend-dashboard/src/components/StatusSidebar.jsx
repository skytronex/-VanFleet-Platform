import React from 'react';
import TripControlPanel from './TripControlPanel';

const StatusSidebar = ({ selectedVan }) => {
    return (
        <div className="w-80 h-full bg-gray-100 border-l p-4 overflow-y-auto z-10 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Command Center</h2>

            {/* Financial Health Section */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-sm uppercase text-gray-500 font-bold mb-2">Financial Health (Mo)</h3>

                {/* Projected Tax Deduction */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600 text-sm">Projected Deduction:</span>
                        <span className="text-green-600 font-bold text-lg">
                            {selectedVan ? `$${(selectedVan.odometer * 0.70).toFixed(2)}` : '$0.00'}
                        </span>
                    </div>
                    <p className="text-xs text-gray-400">Based on $0.70/mi IRS Rate</p>
                </div>

                {/* AI Audit Status */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600">AI Audit Progress</span>
                        <span className="text-xs font-bold text-blue-600">85% Verified</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>

                {/* Active Trip Clock */}
                {selectedVan && selectedVan.status === 'active' && (
                    <div className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-200">
                        <span className="text-gray-600 text-sm">Active Time:</span>
                        <span className="text-gray-800 font-mono font-bold">02:14:30</span>
                    </div>
                )}
            </div>

            {/* Selected Asset Info */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-sm uppercase text-gray-500 font-bold mb-2">Live Asset Status</h3>
                {selectedVan ? (
                    <div className="space-y-2">
                        <p><span className="font-medium">Van ID:</span> {selectedVan.id}</p>
                        <p><span className="font-medium">Plate:</span> {selectedVan.licensePlate || 'N/A'}</p>
                        <p><span className="font-medium">Driver:</span> {selectedVan.driverName || 'Unassigned'}</p>
                        <p><span className="font-medium">Odometer:</span> {selectedVan.odometer || 0} mi</p>
                    </div>
                ) : (
                    <p className="text-gray-400 italic">Select a van on the map to view details.</p>
                )}
            </div>

            {/* Remote Controls */}
            <TripControlPanel selectedVan={selectedVan} />

        </div>
    );
};

export default StatusSidebar;
