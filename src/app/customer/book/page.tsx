"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Scissors } from "lucide-react";
import { toast } from "sonner";

// Mock data for barbers
const mockBarbers = [
  {
    id: 1,
    name: "John Smith",
    specialty: "Haircuts, Beard Trims",
    rating: 4.9,
    experience: "5 years",
  },
  {
    id: 2,
    name: "Mike Johnson",
    specialty: "Hair Coloring, Styling",
    rating: 4.7,
    experience: "8 years",
  },
  {
    id: 3,
    name: "David Wilson",
    specialty: "Beard Design, Hot Towel Shave",
    rating: 4.8,
    experience: "6 years",
  },
];

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: "Haircut",
    description: "Professional haircut with precision scissors and clippers",
    price: 25,
    duration: 30,
  },
  {
    id: 2,
    name: "Beard Trim",
    description: "Expert beard trimming and shaping for a clean look",
    price: 15,
    duration: 20,
  },
  {
    id: 3,
    name: "Hair & Beard",
    description: "Complete package including haircut and beard trim",
    price: 35,
    duration: 50,
  },
  {
    id: 4,
    name: "Hot Towel Shave",
    description: "Relaxing hot towel shave with premium products",
    price: 20,
    duration: 30,
  },
  {
    id: 5,
    name: "Hair Coloring",
    description: "Professional hair coloring service",
    price: 50,
    duration: 60,
  },
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("customer");
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);

  // Mock available times for the selected date
  useEffect(() => {
    if (selectedDate) {
      // Generate mock available times (9am to 6pm with 30min intervals)
      const times = [];
      for (let hour = 9; hour <= 18; hour++) {
        times.push(`${hour}:00`);
        if (hour < 18) times.push(`${hour}:30`);
      }
      setAvailableTimes(times);
    }
  }, [selectedDate]);

  useEffect(() => {
    // Check if user is authenticated
    const userRole = localStorage.getItem("userRole") as
      | "admin"
      | "barber"
      | "customer"
      | null;

    if (!userRole) {
      router.push("/login");
      return;
    }

    setRole(userRole);

    // Redirect if role doesn't match
    if (userRole !== "customer") {
      router.push(`/${userRole}/dashboard`);
    }
  }, [router]);

  const handleBookAppointment = () => {
    if (!selectedBarber || !selectedService || !selectedDate || !selectedTime) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      toast.success("Appointment booked successfully!");
      router.push("/customer/appointments");
    }, 1500);
  };

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Book Appointment</h1>
          <p className="text-gray-400">
            Select a barber, service, and time to book your appointment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Barber Selection */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Select a Barber</CardTitle>
              <CardDescription>
                Choose from our experienced barbers
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {mockBarbers.map((barber) => (
                <div
                  key={barber.id}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-colors",
                    selectedBarber === barber.id
                      ? "border-amber-600 bg-amber-600/10"
                      : "border-gray-800 hover:bg-gray-800"
                  )}
                  onClick={() => setSelectedBarber(barber.id)}
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
                    <span className="text-lg font-bold text-black">
                      {barber.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{barber.name}</h3>
                    <p className="text-sm text-gray-400">{barber.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-amber-600/20 text-amber-500 px-2 py-1 rounded">
                        ★ {barber.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        {barber.experience} experience
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Service Selection */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Select a Service</CardTitle>
              <CardDescription>
                Choose the service you want
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {mockServices.map((service) => (
                <div
                  key={service.id}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors",
                    selectedService === service.id
                      ? "border-amber-600 bg-amber-600/10"
                      : "border-gray-800 hover:bg-gray-800"
                  )}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${service.price}</p>
                    <p className="text-xs text-gray-400">{service.duration} min</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Date and Time Selection */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>
                Choose a date for your appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border border-gray-800"
              />
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Select Time</CardTitle>
              <CardDescription>
                Choose a time for your appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={cn(
                      "h-12",
                      selectedTime === time
                        ? "bg-amber-600 text-black hover:bg-amber-700"
                        : "border-gray-800 hover:bg-gray-800"
                    )}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary and Confirmation */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
            <CardDescription>
              Review your appointment details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {selectedBarber && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Barber</span>
                  <span className="font-medium">
                    {mockBarbers.find(b => b.id === selectedBarber)?.name}
                  </span>
                </div>
              )}
              {selectedService && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Service</span>
                  <span className="font-medium">
                    {mockServices.find(s => s.id === selectedService)?.name}
                  </span>
                </div>
              )}
              {selectedDate && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="font-medium">
                    {format(selectedDate, "PPP")}
                  </span>
                </div>
              )}
              {selectedTime && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
              )}
              {selectedService && (
                <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                  <span className="text-gray-400">Total</span>
                  <span className="text-xl font-bold">
                    ${mockServices.find(s => s.id === selectedService)?.price}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-amber-600 hover:bg-amber-700 text-black"
              onClick={handleBookAppointment}
              disabled={!selectedBarber || !selectedService || !selectedDate || !selectedTime || isBooking}
            >
              {isBooking ? "Booking..." : "Confirm Appointment"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
