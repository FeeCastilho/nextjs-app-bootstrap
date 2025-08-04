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
import { Calendar, Clock, Scissors, User } from "lucide-react";

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    customer: "John Doe",
    service: "Haircut & Beard Trim",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Mike Smith",
    service: "Haircut",
    date: "2023-06-15",
    time: "11:30 AM",
    status: "pending",
  },
  {
    id: 3,
    customer: "David Wilson",
    service: "Beard Trim",
    date: "2023-06-15",
    time: "2:00 PM",
    status: "completed",
  },
];

// Mock data for today's appointments
const todaysAppointments = mockAppointments.filter(
  (apt) => apt.date === "2023-06-15"
);

export default function BarberDashboard() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("barber");

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
    if (userRole !== "barber") {
      router.push(`/${userRole}/dashboard`);
    }
  }, [router]);

  return (
    <DashboardLayout role="barber">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Barber Dashboard</h1>
          <p className="text-gray-400">
            Welcome back! Here&apos;s your schedule for today.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today&apos;s Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-400">2 confirmed, 1 pending</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Weekly Earnings
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-amber-500"
              >
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="m17 5-5-5-5 5"></path>
                <path d="m17 19-5 5-5-5"></path>
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$420</div>
              <p className="text-xs text-gray-400">+15% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Customer Rating
              </CardTitle>
              <User className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-gray-400">Out of 5 stars</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Services Offered
              </CardTitle>
              <Scissors className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-gray-400">Haircut, beard, etc.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>
                Your appointments for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todaysAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.customer}
                      </TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            appointment.status === "confirmed"
                              ? "default"
                              : appointment.status === "pending"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            appointment.status === "confirmed"
                              ? "bg-green-600"
                              : appointment.status === "pending"
                              ? "bg-amber-600"
                              : ""
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-black"
                  onClick={() => router.push("/barber/schedule")}
                >
                  View Full Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you might need
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button 
                variant="outline" 
                className="justify-start border-gray-800 hover:bg-gray-800"
                onClick={() => router.push("/barber/schedule")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Manage Schedule
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-gray-800 hover:bg-gray-800"
                onClick={() => router.push("/barber/appointments")}
              >
                <Clock className="mr-2 h-4 w-4" />
                View All Appointments
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-gray-800 hover:bg-gray-800"
                onClick={() => router.push("/barber/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button 
                variant="outline" 
                className="justify-start border-gray-800 hover:bg-gray-800"
                onClick={() => router.push("/barber/settings")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
