"use client"

import { hotels } from "@/data/hotels"
import { useState } from "react"
import { CustomLink as Link } from "@/components/ui/custom-link"
import { HomeIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"
export default function SearchPage() {

  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [rating, setRating] = useState(0)

  const fetchHotels = async () => {
    const response = await axios.get("/api/hotels")
    return response.data
  }

  const { data: hotels, isLoading } = useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels,
  })
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }
  if (!hotels) {
    return notFound()
  }
  if (hotels.length === 0) {
    return <div className="flex justify-center items-center h-screen">No hotels found</div>
  }

  const filteredHotels = hotels ? hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = hotel.pricePerNight >= priceRange[0] && hotel.pricePerNight <= priceRange[1]
    const matchesRating = hotel.rating >= rating

    return matchesSearch && matchesPrice && matchesRating
  }) : []

  return (
    <>
      <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
        {/* Mobile filter button */}
        <Button
          variant="outline"
          className="w-full mb-4 lg:hidden"
          onClick={() => document.getElementById('filters')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Show Filters
        </Button>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Now responsive */}
          <div id="filters" className="order-2 lg:order-1 space-y-6 lg:sticky lg:top-6 lg:h-fit">
            <div>
              <h3 className="font-semibold mb-4">Search</h3>
              <Input
                placeholder="Search hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={50}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Minimum Rating</h3>
              <div className="flex flex-wrap items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button
                    key={star}
                    variant={rating === star ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRating(rating === star ? 0 : star)}
                  >
                    {star}
                  </Button>
                ))}
              </div>
            </div>
            {/* Close missing div here */}
          </div>

          {/* Results - Now responsive */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="flex flex-col">
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{hotel.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {hotel.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{hotel.rating}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="secondary">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center p-4">
                      <span className="font-semibold">${hotel.pricePerNight} / night</span>
                      <Link href={`/hotel/${hotel.id}`} className="text-primary-600">View Details</Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-lg text-muted-foreground">No hotels found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
