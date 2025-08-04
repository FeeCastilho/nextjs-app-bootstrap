"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const router = useRouter();

  // For now, we'll redirect to login page
  // In a real app, we would check authentication status
  useEffect(() => {
    // Simulate checking auth status
    const checkAuth = () => {
      // For demo purposes, always redirect to login
      router.push("/login");
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="border-b border-gray-800 bg-black/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-700"></div>
            <span className="text-xl font-bold">Barber Shop Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-amber-500 transition-colors">Services</a>
            <a href="#" className="text-sm font-medium hover:text-amber-500 transition-colors">Barbers</a>
            <a href="#" className="text-sm font-medium hover:text-amber-500 transition-colors">Gallery</a>
            <a href="#" className="text-sm font-medium hover:text-amber-500 transition-colors">Contact</a>
          </nav>
          <Button 
            onClick={() => router.push("/login")}
            className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
          >
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-amber-600 hover:bg-amber-700 text-black">Professional Service</Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Premium Barber Shop Experience
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                  Book your appointment with our expert barbers. Quality cuts, premium service, and a relaxing atmosphere.
                </p>
              </div>
              <div className="space-x-4">
                <Button 
                  onClick={() => router.push("/login")}
                  className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-8 py-6 text-lg"
                >
                  Book Appointment
                </Button>
                <Button 
                  variant="outline" 
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-black px-8 py-6 text-lg"
                  onClick={() => router.push("/login")}
                >
                  Meet Our Barbers
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Haircut</CardTitle>
                  <CardDescription className="text-amber-500">From $25</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Professional haircut with precision scissors and clippers.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Beard Trim</CardTitle>
                  <CardDescription className="text-amber-500">From $15</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Expert beard trimming and shaping for a clean look.</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Hair & Beard</CardTitle>
                  <CardDescription className="text-amber-500">From $35</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Complete package including haircut and beard trim.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 bg-black py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4">Barber Shop Pro</h3>
              <p className="text-gray-400">Premium barber shop services for the modern gentleman.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Haircuts</li>
                <li>Beard Trims</li>
                <li>Hair Coloring</li>
                <li>Hot Towel Shave</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hours</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Mon-Fri: 9am - 8pm</li>
                <li>Sat: 8am - 6pm</li>
                <li>Sun: 10am - 4pm</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Barber Street</li>
                <li>City, State 12345</li>
                <li>(555) 123-4567</li>
                <li>info@barbershop.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2023 Barber Shop Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
