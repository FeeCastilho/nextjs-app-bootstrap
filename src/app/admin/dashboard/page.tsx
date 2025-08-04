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
import { Bar, BarChart, Line, LineChart, ResponsiveContainer } from "recharts";
import { Calendar, Clock, Scissors, User, Users } from "lucide-react";

// Mock data for statistics
const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
];

const appointmentsData = [
  { name: "Mon", appointments: 12 },
  { name: "Tue", appointments: 19 },
  { name: "Wed", appointments: 15 },
  { name: "Thu", appointments: 11 },
  { name: "Fri", appointments: 17 },
  { name: "Sat", appointments: 22 },
  { name: "Sun", appointments: 8 },
];

// Mock data for recent appointments
const recentAppointments = [
  {
    id: 1,
    customer: "John Doe",
    barber: "Mike Johnson",
    service: "Haircut & Beard Trim",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "completed",
  },
  {
    id: 2,
    customer: "Jane Smith",
    barber: "David Wilson",
    service: "Haircut",
    date: "2023-06-15",
    time: "11:30 AM",
    status: "confirmed",
  },
  {
    id: 3,
    customer: "Robert Brown",
    barber: "John Smith",
    service: "Beard Trim",
    date: "2023-06-15",
    time: "2:00 PM",
    status: "pending",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("admin");

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
    if (userRole !== "admin") {
      router.push(`/${userRole}/dashboard`);
    }
  }, [router]);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">
            Welcome back! Here&apos;s an overview of your barbershop.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
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
              <div className="text-2xl font-bold">$12,231.89</div>
              <p className="text-xs text-gray-400">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-gray-400">+19% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Barbers
              </CardTitle>
              <Scissors className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-400">+2 from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Customers
              </CardTitle>
              <Users className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-gray-400">+201 since last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="bg-gray-900 border-gray-800 md:col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <Bar dataKey="revenue" fill="#d97706" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800 md:col-span-3">
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>
                Appointments per day this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={appointmentsData}>
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#d97706"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>
                Latest appointments from your barbershop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Barber</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.customer}
                      </TableCell>
                      <TableCell>{appointment.barber}</TableCell>
                      <TableCell>{appointment.service}</TableCell>
                      <TableCell>
                        {appointment.date} at {appointment.time}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            appointment.status === "completed"
                              ? "default"
                              : appointment.status === "confirmed"
                              ? "secondary"
                              : "outline"
                          }
                          className={
                            appointment.status === "completed"
                              ? "bg-green-600"
                              : appointment.status === "confirmed"
                              ? "bg-amber-600"
                              : "bg-blue-600"
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
                  onClick={() => router.push("/admin/appointments")}
                >
                  View All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
