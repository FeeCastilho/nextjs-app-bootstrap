"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Scissors } from "lucide-react";

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    barber: "John Smith",
    service: "Haircut & Beard Trim",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "completed",
    price: 35,
  },
  {
    id: 2,
    barber: "Mike Johnson",
    service: "Haircut",
    date: "2023-06-20",
    time: "2:30 PM",
    status: "confirmed",
    price: 25,
  },
  {
    id: 3,
    barber: "David Wilson",
    service: "Beard Trim",
    date: "2023-06-25",
    time: "11:00 AM",
    status: "pending",
    price: 15,
  },
  {
    id: 4,
    barber: "John Smith",
    service: "Hot Towel Shave",
    date: "2023-05-10",
    time: "3:00 PM",
    status: "completed",
    price: 20,
  },
  {
    id: 5,
    barber: "Mike Johnson",
    service: "Hair Coloring",
    date: "2023-05-15",
    time: "1:00 PM",
    status: "completed",
    price: 50,
  },
  {
    id: 6,
    barber: "David Wilson",
    service: "Haircut",
    date: "2023-05-20",
    time: "9:30 AM",
    status: "cancelled",
    price: 25,
  },
];

export default function CustomerAppointmentsPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("customer");
  const [filter, setFilter] = useState("all");
  const [appointments, setAppointments] = useState(mockAppointments);

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

  // Filter appointments based on status
  useEffect(() => {
    if (filter === "all") {
      setAppointments(mockAppointments);
    } else {
      setAppointments(mockAppointments.filter(apt => apt.status === filter));
    }
  }, [filter]);

  const handleCancelAppointment = (id: number) => {
    // In a real app, this would call an API to cancel the appointment
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: "cancelled" } : apt
    ));
    
    // Update the mock data as well to maintain consistency
    mockAppointments.find(apt => apt.id === id)!.status = "cancelled";
    
    // Show success message
    alert("Appointment cancelled successfully!");
  };

  const handleRescheduleAppointment = (id: number) => {
    // In a real app, this would open a rescheduling modal or redirect to booking page
    router.push("/customer/book");
  };

  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Appointments</h1>
            <p className="text-gray-400">
              View and manage your appointment history
            </p>
          </div>
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-black"
            onClick={() => router.push("/customer/book")}
          >
            Book New Appointment
          </Button>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Appointment History</CardTitle>
                <CardDescription>
                  All your past and upcoming appointments
                </CardDescription>
              </div>
              <div className="w-40">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Appointments</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Barber</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      {appointment.barber}
                    </TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>
                      {appointment.date} at {appointment.time}
                    </TableCell>
                    <TableCell>${appointment.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.status === "completed"
                            ? "default"
                            : appointment.status === "confirmed"
                            ? "secondary"
                            : appointment.status === "pending"
                            ? "outline"
                            : "destructive"
                        }
                        className={
                          appointment.status === "completed"
                            ? "bg-green-600"
                            : appointment.status === "confirmed"
                            ? "bg-amber-600"
                            : appointment.status === "pending"
                            ? "bg-blue-600"
                            : appointment.status === "cancelled"
                            ? "bg-red-600"
                            : ""
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {appointment.status === "confirmed" || appointment.status === "pending" ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 border-gray-700 hover:bg-gray-700"
                            onClick={() => handleRescheduleAppointment(appointment.id)}
                          >
                            Reschedule
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                            onClick={() => handleCancelAppointment(appointment.id)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-700 hover:bg-gray-700"
                          onClick={() => router.push("/customer/book")}
                        >
                          Book Again
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
