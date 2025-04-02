"use client"
import { hotels } from "@/data/hotels"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Star, MapPin, Search } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const featuredHotels = hotels.featured.slice(0, 3)
  const popularDestinations = [
    {
      name: "Paris",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2070&auto=format&fit=crop",
      hotels: 240
    },
    {
      name: "London",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
      hotels: 185
    },
    {
      name: "New York",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
      hotels: 310
    },
    {
      name: "Tokyo",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2070&auto=format&fit=crop",
      hotels: 275
    },
  ]

  return (
    <main>

      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop "
          alt="Luxury Hotel"
          fill
          priority
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold text-center max-w-3xl">
            Find Your Perfect Stay
            Whatever
          </h1>
          <p className="mt-4 text-xl text-center max-w-2xl">
            Discover handpicked hotels for your next adventure
          </p>
          <Link href="/search">
            <Button size="lg" className="mt-8">
              <Search className="mr-2 h-5 w-5" />
              Search Hotels
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Hotels */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredHotels.map((hotel) => (
            <Card key={hotel?.id}>
              <div className="relative h-48">
                <Image
                  src={hotel?.image}
                  alt={hotel?.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {hotel?.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{hotel?.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {hotel?.location}
                </p>
                <p className="mt-4 font-bold text-lg">
                  ${hotel?.pricePerNight} <span className="text-sm font-normal text-muted-foreground">per night</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <Link key={destination?.name} href={`/search?location=${destination?.name}`}>
                <Card className="group cursor-pointer overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={destination?.image}
                      alt={destination?.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-bold text-xl">{destination?.name}</h3>
                        <p className="text-sm">{destination?.hotels} hotels</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - update icons */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">Best Rates</h3>
            <p className="text-muted-foreground">Guaranteed best prices for quality stays</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">24/7 Support</h3>
            <p className="text-muted-foreground">Round-the-clock assistance for any concern</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-2">Secure Booking</h3>
            <p className="text-muted-foreground">Safe and secure payment systems</p>
          </div>
        </div>
      </section>
    </main>
  )
}