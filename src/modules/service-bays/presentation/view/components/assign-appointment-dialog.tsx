"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Car, Wrench, Plus } from "lucide-react";
import { ServiceBayModel } from "../../../data/entities/model/service-bay-model";

interface AssignAppointmentDialogProps {
  serviceBay: ServiceBayModel;
  trigger?: React.ReactNode;
  onAssign?: (appointmentData: any) => void;
}

// Mock data for demonstration - in real app, this would come from API
const mockAppointments = [
  {
    id: "1",
    date: "2024-12-10",
    time: "09:00",
    customer: "John Doe",
    vehicle: "Toyota Camry - ABC-1234",
    service: "Oil Change",
    status: "PENDING",
  },
  {
    id: "2",
    date: "2024-12-10",
    time: "11:00",
    customer: "Jane Smith",
    vehicle: "Honda Civic - XYZ-5678",
    service: "Brake Service",
    status: "PENDING",
  },
  {
    id: "3",
    date: "2024-12-10",
    time: "14:00",
    customer: "Mike Johnson",
    vehicle: "Ford F-150 - DEF-9012",
    service: "Engine Repair",
    status: "PENDING",
  },
];

const mockCustomers = [
  { id: "1", name: "John Doe", phone: "0123456789" },
  { id: "2", name: "Jane Smith", phone: "0198765432" },
  { id: "3", name: "Mike Johnson", phone: "0167891234" },
];

const mockVehicles = [
  {
    id: "1",
    make: "Toyota",
    model: "Camry",
    plate: "ABC-1234",
    customerId: "1",
  },
  {
    id: "2",
    make: "Honda",
    model: "Civic",
    plate: "XYZ-5678",
    customerId: "2",
  },
  { id: "3", make: "Ford", model: "F-150", plate: "DEF-9012", customerId: "3" },
];

const mockServices = [
  { id: "1", name: "Oil Change", duration: 30, price: 50 },
  { id: "2", name: "Brake Service", duration: 90, price: 150 },
  { id: "3", name: "Engine Repair", duration: 180, price: 500 },
  { id: "4", name: "Tire Replacement", duration: 60, price: 200 },
];

export function AssignAppointmentDialog({
  serviceBay,
  trigger,
  onAssign,
}: AssignAppointmentDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [assignmentType, setAssignmentType] = React.useState<
    "existing" | "new"
  >("existing");
  const [selectedAppointment, setSelectedAppointment] = React.useState("");
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [selectedVehicle, setSelectedVehicle] = React.useState("");
  const [selectedService, setSelectedService] = React.useState("");
  const [appointmentDate, setAppointmentDate] = React.useState("");
  const [appointmentTime, setAppointmentTime] = React.useState("");

  const availableVehicles = mockVehicles.filter(
    (v) => v.customerId === selectedCustomer
  );

  const handleAssign = () => {
    if (assignmentType === "existing") {
      const appointment = mockAppointments.find(
        (a) => a.id === selectedAppointment
      );
      if (appointment) {
        onAssign?.({
          type: "existing",
          appointment,
          serviceBayId: serviceBay.id,
        });
      }
    } else {
      const customer = mockCustomers.find((c) => c.id === selectedCustomer);
      const vehicle = mockVehicles.find((v) => v.id === selectedVehicle);
      const service = mockServices.find((s) => s.id === selectedService);

      if (
        customer &&
        vehicle &&
        service &&
        appointmentDate &&
        appointmentTime
      ) {
        onAssign?.({
          type: "new",
          appointment: {
            customer,
            vehicle,
            service,
            date: appointmentDate,
            time: appointmentTime,
          },
          serviceBayId: serviceBay.id,
        });
      }
    }
    setOpen(false);
  };

  const isFormValid = () => {
    if (assignmentType === "existing") {
      return selectedAppointment !== "";
    } else {
      return (
        selectedCustomer &&
        selectedVehicle &&
        selectedService &&
        appointmentDate &&
        appointmentTime
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Assign Appointment
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Appointment to Service Bay</DialogTitle>
          <DialogDescription>
            Assign an appointment to {serviceBay.name} ({serviceBay.bay_number})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Service Bay Info */}
          <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{serviceBay.name}</div>
              <div className="text-sm text-muted-foreground">
                {/* Bay {serviceBay.bay_number} • Capacity: {serviceBay.capacity} •
                RM {serviceBay.hourly_rate}/hr
                {serviceBay.specializations?.map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))} */}
              </div>
              <div className="flex gap-1 mt-1">
                {serviceBay.specializations?.slice(0, 3).map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Assignment Type Selection */}
          <div className="space-y-3">
            <Label>Assignment Type</Label>
            <Select
              value={assignmentType}
              onValueChange={(value: "existing" | "new") =>
                setAssignmentType(value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="existing">
                  Assign Existing Appointment
                </SelectItem>
                <SelectItem value="new">Create New Appointment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Existing Appointment Selection */}
          {assignmentType === "existing" && (
            <div className="space-y-3">
              <Label>Select Pending Appointment</Label>
              <Select
                value={selectedAppointment}
                onValueChange={setSelectedAppointment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose an appointment" />
                </SelectTrigger>
                <SelectContent>
                  {mockAppointments.map((appointment) => (
                    <SelectItem key={appointment.id} value={appointment.id}>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {appointment.date} {appointment.time}
                        </span>
                        <span>•</span>
                        <User className="h-4 w-4" />
                        <span>{appointment.customer}</span>
                        <span>•</span>
                        <Car className="h-4 w-4" />
                        <span>{appointment.vehicle}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedAppointment && (
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  {(() => {
                    const appointment = mockAppointments.find(
                      (a) => a.id === selectedAppointment
                    );
                    return appointment ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">
                            {appointment.date} at {appointment.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-blue-600" />
                          <span>{appointment.customer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Car className="h-4 w-4 text-blue-600" />
                          <span>{appointment.vehicle}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Wrench className="h-4 w-4 text-blue-600" />
                          <span>{appointment.service}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {appointment.status}
                        </Badge>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          )}

          {/* New Appointment Creation */}
          {assignmentType === "new" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    value={selectedCustomer}
                    onValueChange={setSelectedCustomer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} - {customer.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Select
                    value={selectedVehicle}
                    onValueChange={setSelectedVehicle}
                    disabled={!selectedCustomer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVehicles.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.make} {vehicle.model} - {vehicle.plate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select
                  value={selectedService}
                  onValueChange={setSelectedService}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockServices.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - {service.duration} mins - RM{" "}
                        {service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!isFormValid()}>
            Assign Appointment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
