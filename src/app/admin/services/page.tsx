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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Scissors,
  Clock
} from "lucide-react";

// Mock data for services
const mockServices = [
  {
    id: 1,
    name: "Haircut",
    description: "Professional haircut with precision scissors and clippers",
    price: 25,
    duration: 30,
    category: "Hair",
    status: "active",
  },
  {
    id: 2,
    name: "Beard Trim",
    description: "Expert beard trimming and shaping for a clean look",
    price: 15,
    duration: 20,
    category: "Beard",
    status: "active",
  },
  {
    id: 3,
    name: "Hair & Beard",
    description: "Complete package including haircut and beard trim",
    price: 35,
    duration: 50,
    category: "Combo",
    status: "active",
  },
  {
    id: 4,
    name: "Hot Towel Shave",
    description: "Relaxing hot towel shave with premium products",
    price: 20,
    duration: 30,
    category: "Shave",
    status: "active",
  },
  {
    id: 5,
    name: "Hair Coloring",
    description: "Professional hair coloring service",
    price: 50,
    duration: 60,
    category: "Color",
    status: "inactive",
  },
];

export default function AdminServicesPage() {
  const router = useRouter();
  const [role, setRole] = useState<"admin" | "barber" | "customer">("admin");
  const [services, setServices] = useState(mockServices);
  const [isAddingService, setIsAddingService] = useState(false);
  const [isEditingService, setIsEditingService] = useState(false);
  const [currentService, setCurrentService] = useState<any>(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 30,
    category: "",
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

  const handleAddService = () => {
    if (!newService.name) {
      alert("Please fill in required fields");
      return;
    }

    const service = {
      id: services.length + 1,
      ...newService,
      status: "active",
    };

    setServices([...services, service]);
    setNewService({
      name: "",
      description: "",
      price: 0,
      duration: 30,
      category: "",
    });
    setIsAddingService(false);
  };

  const handleEditService = (service: any) => {
    setCurrentService(service);
    setNewService({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
    });
    setIsEditingService(true);
  };

  const handleUpdateService = () => {
    if (!newService.name) {
      alert("Please fill in required fields");
      return;
    }

    setServices(services.map(s => 
      s.id === currentService.id ? { ...s, ...newService } : s
    ));
    
    setNewService({
      name: "",
      description: "",
      price: 0,
      duration: 30,
      category: "",
    });
    setCurrentService(null);
    setIsEditingService(false);
  };

  const handleDeleteService = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s
    ));
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services Management</h1>
            <p className="text-gray-400">
              Manage all services offered at your barbershop
            </p>
          </div>
          <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
            <DialogTrigger asChild>
              <Button className="bg-amber-600 hover:bg-amber-700 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>
                  Add a new service to your barbershop
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService({...newService, name: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService({...newService, description: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration (min)
                  </Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value) || 0})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input
                    id="category"
                    value={newService.category}
                    onChange={(e) => setNewService({...newService, category: e.target.value})}
                    className="col-span-3 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddService}
                  className="bg-amber-600 hover:bg-amber-700 text-black"
                >
                  Add Service
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>All Services</CardTitle>
            <CardDescription>
              Manage and view all services offered at your barbershop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Scissors className="h-4 w-4 text-amber-500" />
                        {service.name}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {service.description}
                    </TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.duration} min
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-amber-600/20 text-amber-500">
                        {service.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={service.status === "active" ? "default" : "secondary"}
                        className={
                          service.status === "active"
                            ? "bg-green-600"
                            : "bg-gray-600"
                        }
                      >
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 border-gray-700 hover:bg-gray-700"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2 border-gray-700 hover:bg-gray-700"
                        onClick={() => handleToggleStatus(service.id)}
                      >
                        {service.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDeleteService(service.id)}
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

        {/* Edit Service Dialog */}
        <Dialog open={isEditingService} onOpenChange={setIsEditingService}>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
              <DialogDescription>
                Update service information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: parseFloat(e.target.value) || 0})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-duration" className="text-right">
                  Duration (min)
                </Label>
                <Input
                  id="edit-duration"
                  type="number"
                  value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: parseInt(e.target.value) || 0})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Input
                  id="edit-category"
                  value={newService.category}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                  className="col-span-3 bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={handleUpdateService}
                className="bg-amber-600 hover:bg-amber-700 text-black"
              >
                Update Service
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
