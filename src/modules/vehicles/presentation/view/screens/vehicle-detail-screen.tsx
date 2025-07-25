"use client"

import { useQueryVehicleById } from "../../tanstack/vehicle-tanstack";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Car, Calendar, Copy, Fuel, User, MapPin, DollarSign, MoreHorizontal } from "lucide-react";
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen";
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen";
import AppointmentStatusBadge from "@/src/core/shared/presentation/components/appointment-status-badge";
import DefaultCard from "@/src/core/shared/presentation/components/default-card";
import { formatDateTime } from "@/src/core/util/helper";

const VehicleDetailScreen = ({ vehicleId }: { vehicleId: string }) => {
    const { data: vehicle, isLoading, error } = useQueryVehicleById(vehicleId);
    if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                <div className="h-12 w-[250px] bg-muted animate-pulse rounded" />
                <div className="grid gap-4">
                    <div className="h-[200px] bg-muted animate-pulse rounded" />
                    <div className="h-[200px] bg-muted animate-pulse rounded" />
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



    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto p-6 space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm  space-x-2">
                    <span>Vehicles</span>
                    <span>›</span>
                    <span className="font-medium">{vehicle.model}</span>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-semibold">{vehicle.model}</h1>
                        <div className="flex items-center space-x-2">
                            <Badge variant="outline">
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
                        <DefaultCard>
                            <div className="p-6 border-b ">
                                <h3 className="text-lg font-medium">Vehicle Information</h3>
                            </div>

                            <div className="divide-y">
                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Model</div>
                                    <div className="text-sm">
                                        <Badge variant="secondary">{vehicle.model || 'N/A'}</Badge>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Year</div>
                                    <div className="text-sm text-right">{vehicle.year || 'N/A'}</div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">License Plate</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">{vehicle.license_plate || 'N/A'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Fuel Type</div>
                                    <div className="text-sm">
                                        <Badge variant="secondary">{vehicle.fuel_type || 'N/A'}</Badge>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Color</div>
                                    <div className="text-sm">
                                        <Badge variant="secondary">{vehicle.color || 'N/A'}</Badge>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6">
                                    <div className="text-sm">Created</div>
                                    <div className="text-sm">
                                        <Badge variant="secondary">{formatDateTime(vehicle.created_at) || 'N/A'}</Badge>
                                    </div>
                                </div>

                            </div>

                        </DefaultCard>

                        {/* Media Section */}
                        <DefaultCard>
                            <div className="p-6 border-b  flex items-center justify-between">
                                <h3 className="text-lg font-medium">Media</h3>
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
                        </DefaultCard>

                        {/* Service Appointments */}
                        {vehicle?.appointments && vehicle.appointments.length > 0 && (
                            <DefaultCard>
                                <div className="p-6 border-b  flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Service Appointments</h3>
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
                                                        <p className="font-medium">Appointment #{index + 1}</p>
                                                        <p className="text-sm">{formatDateTime(appointment.date)}</p>
                                                    </div>
                                                </div>
                                                <AppointmentStatusBadge status={appointment.status as any} />
                                            </div>

                                            {appointment.service_center && (
                                                <div className="rounded-lg p-4">
                                                    <div className="flex items-start space-x-3">
                                                        <MapPin className="h-4 w-4 mt-0.5" />
                                                        <div>
                                                            <p className="font-medium">{appointment.service_center.name}</p>
                                                            {appointment.service_center.locations?.address && (
                                                                <p className="text-sm">{appointment.service_center.locations.address}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {appointment.items && appointment.items.length > 0 && (
                                                <div className="space-y-3">
                                                    <h5 className="text-sm font-medium">Service Items</h5>
                                                    <div className="space-y-2">
                                                        {appointment.items.map((item) => (
                                                            <div key={item.id} className="flex items-center justify-between py-2 px-3 rounded-lg">
                                                                <span className="text-sm">{item.service?.name}</span>
                                                                <span className="text-sm font-medium">${item.service?.price?.toFixed(2)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t ">
                                                        <span className="text-sm font-medium">Total</span>
                                                        <span className="font-semibold">
                                                            ${appointment.items.reduce((sum, item) => sum + (item.service?.price || 0), 0).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {index < (vehicle.appointments?.length ?? 0) - 1 && <Separator />}
                                        </div>
                                    ))}
                                </div>
                            </DefaultCard>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Owner Information */}
                        <DefaultCard>
                            <div className="p-6 border-b border-gray flex items-center justify-between">
                                <h3 className="text-lg font-medium">Owner Information</h3>
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
                                        <p className="text-sm font-medium">Default Owner</p>
                                        <p className="text-sm">{vehicle.user?.email || 'No email available'}</p>
                                    </div>
                                </div>
                            </div>
                        </DefaultCard>



                        {/* Organize */}
                        <DefaultCard>
                            <div className="p-6 border-b  flex items-center justify-between">
                                <h3 className="text-lg font-medium">Organize</h3>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm mb-2">Tags</label>
                                    <p className="text-sm">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Type</label>
                                    <p className="text-sm">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Collection</label>
                                    <p className="text-sm">You May Also Like</p>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Categories</label>
                                    <p className="text-sm">-</p>
                                </div>
                            </div>
                        </DefaultCard>

                        {/* Attributes */}
                        <DefaultCard>
                            <div className="p-6 border-b  flex items-center justify-between">
                                <h3 className="text-lg font-medium">Attributes</h3>
                                <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm">Engine Type</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Transmission</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Mileage</label>
                                    <p className="text-sm text-gray-500">-</p>
                                </div>
                            </div>
                        </DefaultCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailScreen;