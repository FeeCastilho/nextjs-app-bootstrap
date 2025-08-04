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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  User, 
  Scissors,
  Calendar,
  Star
} from "lucide-react";

// Mock data for barbers
const mockBarbers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    specialty: "Haircuts, Beard Trims",
    rating: 4.9,
    experience: "5 years",
    status: "active",
    appointments: 124,
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 234-5678",
    specialty: "Hair Coloring, Styling",
    rating: 4.7,
    experience: "8 years",
    status: "active",
    appointments: 98,
  },
  {
    id: 3,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 345-6789",
    specialty: "Beard Design, Hot Towel Shave",
    rating: 4.8,
    experience: "6 years",
    status: "inactive",
    appointments: 76,
  },
  {
    id: 4,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "+1 (555) 456-7890",
    specialty: "All Services",
    rating: 4.9,
    experience: "10 years",
    status: "active",
    appointments: 156,
  },
];

export default function AdminBarbersPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("admin");
  const [barbers, setBarbers] = useState(mockBarbers);
  const [isAddingBarber, setIsAddingBarber] = useState(false);
  const [isEditingBarber, setIsEditingBarber] = useState(false);
  const [currentBarber, setCurrentBarber] = useState<any>(null);
  const [newBarber, setNewBarber] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
  });

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

  const handleAddBarber = () => {
    if (!newBarber.name || !newBarber.email) {
      alert("Please fill in required fields");
      return;
    }

    const barber = {
      id: barbers.length + 1,
      ...newBarber,
      rating: 0,
      status: "active",
      appointments: 0,
    };

    setBarbers([...barbers, barber]);
    setNewBarber({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      experience: "",
    });
    setIsAddingBarber(false);
  };

  const handleEditBarber = (barber: any) => {
    setCurrentBarber(barber);
    setNewBarber({
      name: barber.name,
      email: barber.email,
      phone: barber.phone,
      specialty: barber.specialty,
      experience: barber.experience,
    });
    setIsEditingBarber(true);
  };

  const handleUpdateBarber = () => {
    if (!newBarber.name || !newBarber.email) {
      alert("Please fill in required fields");
      return;
    }

    setBarbers(barbers.map(b => 
      b.id === currentBarber.id ? { ...b, ...newBarber } : b
    ));
    
    setNewBarber({
      name: "",
      email: "",
      phone: "",
      specialty: "",
      experience: "",
    });
    setCurrentBarber(null);
    setIsEditingBarber(false);
  };

  const handleDeleteBarber = (id: number) => {
    if (confirm("Are you sure you want to delete this barber?")) {
      setBarbers(barbers.filter(b => b.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setBarbers(barbers.map(b => 
      b.id === id ? { ...b, status: b.status === "active" ? "inactive" : "active" } : b
    ));
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Barbers Management</h1>
            <p className="text-gray-400">
              Manage all barbers in your barbershop
            </p>
          </div>
          <Dialog open={isAddingBarber} onOpenChange={setIsAddingBarber}>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Add Barber
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle>Add New Barber</DialogTitle>
                <DialogDescription>
                  Add a new barber to your barbershop
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newBarber.name}
                    onChange={(e) => setNewBarber({...newBarber, name: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newBarber.email}
                    onChange={(e) => setNewBarber({...newBarber, email: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={newBarber.phone}
                    onChange={(e) => setNewBarber({...newBarber, phone: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specialty" className="text-right">
                    Specialty
                  </Label>
                  <Input
                    id="specialty"
                    value={newBarber.specialty}
                    onChange={(e) => setNewBarber({...newBarber, specialty: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="experience" className="text-right">
                    Experience
                  </Label>
                  <Input
                    id="experience"
                    value={newBarber.experience}
                    onChange={(e) => setNewBarber({...newBarber, experience: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddBarber}
                  className="bg-amber-600 hover:bg-amber-700 text-black"
                >
                  Add Barber
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>All Barbers</CardTitle>
            <CardDescription>
              Manage and view all barbers in your barbershop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Barber</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Appointments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {barbers.map((barber) => (
                  <TableRow key={barber.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
                          <span className="text-xs font-bold text-black">
                            {barber.name.charAt(0)}
                          </span>
                        </div>
                        {barber.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-400">{barber.email}</div>
                      <div className="text-sm text-gray-400">{barber.phone}</div>
                    </TableCell>
                    <TableCell>{barber.specialty}</TableCell>
                    <TableCell>{barber.experience}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span>{barber.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{barber.appointments}</TableCell>
                    <TableCell>
                      <Badge
                        variant={barber.status === "active" ? "default" : "secondary"}
                        className={
                          barber.status === "active"
                            ? "bg-green-600"
                            : "bg-gray-600"
                        }
                      >
                        {barber.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 border-gray-700 hover:bg-gray-700"
                        onClick={() => handleEditBarber(barber)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 border-gray-700 hover:bg-gray-700"
                        onClick={() => handleToggleStatus(barber.id)}
                      >
                        {barber.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDeleteBarber(barber.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Barber Dialog */}
        <Dialog open={isEditingBarber} onOpenChange={setIsEditingBarber}>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle>Edit Barber</DialogTitle>
              <DialogDescription>
                Update barber information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={newBarber.name}
                  onChange={(e) => setNewBarber({...newBarber, name: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={newBarber.email}
                  onChange={(e) => setNewBarber({...newBarber, email: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={newBarber.phone}
                  onChange={(e) => setNewBarber({...newBarber, phone: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-specialty" className="text-right">
                  Specialty
                </Label>
                <Input
                  id="edit-specialty"
                  value={newBarber.specialty}
                  onChange={(e) => setNewBarber({...newBarber, specialty: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-experience" className="text-right">
                  Experience
                </Label>
                <Input
                  id="edit-experience"
                  value={newBarber.experience}
                  onChange={(e) => setNewBarber({...newBarber, experience: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleUpdateBarber}
                className="bg-amber-600 hover:bg-amber-700 text-black"
              >
                Update Barber
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
