import React, { useState } from 'react';
import FleetOverviewMap from './FleetOverviewMap';
import StatusSidebar from './StatusSidebar';

const DashboardLayout = () => {
    // Shared state: currently selected van
    // In a real app, you might hoist this state or use Context/Redux
    const [selectedVan, setSelectedVan] = useState(null);

    // Callback to let the Map update the Sidebar
    const handleVanSelect = (van) => {
        setSelectedVan(van);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            {/* Main Map Area - Grows to fill space */}
            <div className="flex-grow h-full relative">
                {/* 
                   Note: We need to modify FleetOverviewMap to accept an onSelect prop 
                   so clicking a marker updates parent state.
                   For now, we render it as is.
                */}
                {/* Map Component with Selection Handler */}
                <FleetOverviewMap onSelect={handleVanSelect} />

                {/* Overlay Instruction */}
                <div className="absolute top-4 left-4 bg-white p-2 rounded shadow z-[1000]">
                    <h1 className="text-xl font-bold">VanFleet Ops</h1>
                    <p className="text-sm text-gray-600">Scale to 100 Vans</p>
                </div>
            </div>

            {/* Sidebar - Fixed width */}
            <StatusSidebar selectedVan={selectedVan} />
        </div>
    );
};

export default DashboardLayout;
