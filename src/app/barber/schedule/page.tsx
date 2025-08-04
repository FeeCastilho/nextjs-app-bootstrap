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
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { format, addDays, startOfWeek, endOfWeek } from "date-fns";
import { 
  Clock, 
  Plus, 
  Calendar as CalendarIcon,
  User,
  Scissors
} from "lucide-react";

// Mock data for barber availability
const mockAvailability = {
  "2023-06-12": [
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: false, customer: "John Doe" },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: false, customer: "Jane Smith" },
    { time: "12:00", available: true },
    { time: "12:30", available: true },
    { time: "13:00", available: false }, // Lunch break
    { time: "13:30", available: false }, // Lunch break
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: false, customer: "Robert Brown" },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: false, customer: "Emily Davis" },
    { time: "17:30", available: true },
  ],
  "2023-06-13": [
    { time: "09:00", available: true },
    { time: "09:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: true },
    { time: "11:30", available: true },
    { time: "12:00", available: true },
    { time: "12:30", available: true },
    { time: "13:00", available: false }, // Lunch break
    { time: "13:30", available: false }, // Lunch break
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
    { time: "17:00", available: true },
    { time: "17:30", available: true },
  ],
};

// Mock data for barber working hours
const workingHours = {
  start: "09:00",
  end: "18:00",
  lunchStart: "13:00",
  lunchEnd: "13:30",
};

export default function BarberSchedulePage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("barber");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availability, setAvailability] = useState<any>(mockAvailability);
  const [isEditing, setIsEditing] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState("");
  const [isAddingSlot, setIsAddingSlot] = useState(false);

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

  const handleToggleAvailability = (date: string, time: string) => {
    setAvailability((prev: any) => {
      const newAvailability = { ...prev };
      if (!newAvailability[date]) {
        newAvailability[date] = [];
      }
      
      const slotIndex = newAvailability[date].findIndex((slot: any) => slot.time === time);
      if (slotIndex !== -1) {
        newAvailability[date][slotIndex].available = !newAvailability[date][slotIndex].available;
        // Remove customer info when making slot available
        if (newAvailability[date][slotIndex].available) {
          delete newAvailability[date][slotIndex].customer;
        }
      }
      
      return newAvailability;
    });
  };

  const handleAddTimeSlot = () => {
    if (!newTimeSlot) return;
    
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    setAvailability((prev: any) => {
      const newAvailability = { ...prev };
      if (!newAvailability[dateStr]) {
        newAvailability[dateStr] = [];
      }
      
      // Check if slot already exists
      const exists = newAvailability[dateStr].some((slot: any) => slot.time === newTimeSlot);
      if (!exists) {
        newAvailability[dateStr].push({
          time: newTimeSlot,
          available: true
        });
        
        // Sort slots by time
        newAvailability[dateStr].sort((a: any, b: any) => 
          a.time.localeCompare(b.time)
        );
      }
      
      return newAvailability;
    });
    
    setNewTimeSlot("");
    setIsAddingSlot(false);
  };

  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return availability[dateStr] || [];
  };

  const getWeekDays = () => {
    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);
    const days = [];
    
    for (let i = 0; i <= 6; i++) {
      days.push(addDays(start, i));
    }
    
    return days;
  };

  return (
    <DashboardLayout role="barber">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Schedule</h1>
          <p className="text-gray-400">
            Manage your availability and view appointments
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Calendar */}
          <Card className="md:col-span-1 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view or edit availability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border border-gray-800"
              />
            </CardContent>
          </Card>

          {/* Availability for selected date */}
          <Card className="md:col-span-2 bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Availability for {format(selectedDate, "PPP")}
                  </CardTitle>
                  <CardDescription>
                    Toggle availability for each time slot
                  </CardDescription>
                </div>
                <Dialog open={isAddingSlot} onOpenChange={setIsAddingSlot}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-black">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Time Slot
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle>Add Time Slot</DialogTitle>
                      <DialogDescription>
                        Add a new time slot to your availability
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                          Time
                        </Label>
                        <Select value={newTimeSlot} onValueChange={setNewTimeSlot}>
                          <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 18 }, (_, i) => {
                              const hour = Math.floor(i / 2) + 9;
                              const minute = i % 2 === 0 ? "00" : "30";
                              const time = `${hour.toString().padStart(2, "0")}:${minute}`;
                              return (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleAddTimeSlot}
                        className="bg-amber-600 hover:bg-amber-700 text-black"
                      >
                        Add Slot
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {getSlotsForDate(selectedDate).map((slot: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      slot.available
                        ? "border-green-500/50 bg-green-500/10"
                        : slot.customer
                        ? "border-amber-500/50 bg-amber-500/10"
                        : "border-gray-700 bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {slot.customer && (
                        <Badge variant="secondary" className="bg-amber-600/20 text-amber-500">
                          <User className="mr-1 h-3 w-3" />
                          {slot.customer}
                        </Badge>
                      )}
                      <Switch
                        checked={slot.available}
                        onCheckedChange={() => handleToggleAvailability(format(selectedDate, "yyyy-MM-dd"), slot.time)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {getSlotsForDate(selectedDate).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No time slots available for this date. Add some time slots to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Weekly Overview */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>
              Your availability for the week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {getWeekDays().map((day, index) => (
                <div key={index} className="border border-gray-800 rounded-lg p-2">
                  <div className="text-center font-medium mb-2">
                    {format(day, "EEE")}
                  </div>
                  <div className="text-center text-sm text-gray-400">
                    {format(day, "MMM d")}
                  </div>
                  <div className="mt-2 space-y-1">
                    {getSlotsForDate(day)
                      .filter((slot: any) => !slot.available && slot.customer)
                      .slice(0, 3)
                      .map((slot: any, idx: number) => (
                        <div
                          key={idx}
                          className="text-xs bg-amber-600/20 text-amber-500 px-2 py-1 rounded truncate"
                        >
                          {slot.time} - {slot.customer}
                        </div>
                      ))}
                    {getSlotsForDate(day).filter((slot: any) => !slot.available && slot.customer)
                      .length > 3 && (
                      <div className="text-xs text-gray-400 text-center">
                        +{getSlotsForDate(day).filter((slot: any) => !slot.available && slot.customer).length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
