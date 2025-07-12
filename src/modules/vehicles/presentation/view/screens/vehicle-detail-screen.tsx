"use client"

import { useQueryVehicleById } from "../../tanstack/vehicle-tanstack";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Car, Calendar, Copy, Fuel, User, MapPin, DollarSign, MoreHorizontal } from "lucide-react";
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen";
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen";
import AppointmentStatusBadge from "@/src/core/shared/presentation/components/appointment-status-badge";

const VehicleDetailScreen = ({ vehicleId }: { vehicleId: string }) => {
    const { data: vehicle, isLoading, error } = useQueryVehicleById(vehicleId);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto p-6 space-y-6">
                    <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-80 bg-white border border-gray-200 animate-pulse rounded-lg" />
                            <div className="h-64 bg-white border border-gray-200 animate-pulse rounded-lg" />
                        </div>
                        <div className="space-y-6">
                            <div className="h-48 bg-white border border-gray-200 animate-pulse rounded-lg" />
                            <div className="h-64 bg-white border border-gray-200 animate-pulse rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !vehicle) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto p-6">
                    <InfoScreen
                        type={InfoScreenType.ERROR}
                        title="Vehicle Not Found"
                        description={error?.message || "The requested vehicle could not be found."}
                    />
                </div>
            </div>
        );
    }

    const formatDate = (date: string | undefined) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto p-6 space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <span>Vehicles</span>
                    <span>›</span>
                    <span className="text-gray-900 font-medium">{vehicle.model}</span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-semibold text-gray-900">{vehicle.model}</h1>
                        <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                                Published
                            </Badge>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Vehicle Details */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Vehicle Information</h3>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Basic Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                                        <p className="text-sm text-gray-900">{vehicle.model}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <p className="text-sm text-gray-900">{vehicle.year}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-900 font-mono">{vehicle.license_plate}</span>
                                            <button
                                                onClick={() => copyToClipboard(vehicle.license_plate || 'N/A')}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                                        <p className="text-sm text-gray-900">{vehicle.fuel_type}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                        <p className="text-sm text-gray-900">{vehicle.color || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                                        <p className="text-sm text-gray-900">{formatDate(vehicle.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Media Section */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Media</h3>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-6">
                                {vehicle.images && vehicle.images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {vehicle.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Vehicle ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg border border-gray-200"
                                                />
                                                {index === 0 && (
                                                    <div className="absolute top-2 left-2">
                                                        <div className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <Car className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                        <p>No media files uploaded</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Service Appointments */}
                        {vehicle?.appointments && vehicle.appointments.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">Service Appointments</h3>
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="p-6 space-y-6">
                                    {vehicle.appointments?.map((appointment, index) => (
                                        <div key={appointment.id} className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <Calendar className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">Appointment #{index + 1}</p>
                                                        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                                                    </div>
                                                </div>
                                                <AppointmentStatusBadge status={appointment.status as any} />
                                            </div>

                                            {appointment.service_center && (
                                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-start space-x-3">
                                                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                                        <div>
                                                            <p className="font-medium text-gray-900">{appointment.service_center.name}</p>
                                                            {appointment.service_center.locations?.address && (
                                                                <p className="text-sm text-gray-500">{appointment.service_center.locations.address}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {appointment.items && appointment.items.length > 0 && (
                                                <div className="space-y-3">
                                                    <h5 className="text-sm font-medium text-gray-900">Service Items</h5>
                                                    <div className="space-y-2">
                                                        {appointment.items.map((item) => (
                                                            <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                                                <span className="text-sm text-gray-900">{item.service?.name}</span>
                                                                <span className="text-sm font-medium text-gray-900">${item.service?.price?.toFixed(2)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                                        <span className="text-sm font-medium text-gray-900">Total</span>
                                                        <span className="font-semibold text-gray-900">
                                                            ${appointment.items.reduce((sum, item) => sum + (item.service?.price || 0), 0).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {index < (vehicle.appointments?.length ?? 0) - 1 && <Separator />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Owner Information */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Owner Information</h3>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                        <User className="h-4 w-4 text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Default Owner</p>
                                        <p className="text-sm text-gray-500">{vehicle.user?.email || 'No email available'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Configuration */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Vehicle Configuration</h3>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Default Configuration</span>
                                    <span className="text-sm text-gray-500">default</span>
                                </div>
                            </div>
                        </div>

                        {/* Organize */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Organize</h3>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Tags</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Type</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Collection</label>
                                    <p className="text-sm text-gray-500">You May Also Like</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Categories</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                            </div>
                        </div>

                        {/* Attributes */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Attributes</h3>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Engine Type</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Transmission</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Mileage</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailScreen;