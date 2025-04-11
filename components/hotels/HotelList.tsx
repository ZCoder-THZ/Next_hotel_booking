// components/hotels/HotelsList.tsx
"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const HotelsList = ({ searchQuery, rating, selectedCity }: { searchQuery: string, rating: number, selectedCity: string }) => {
    const fetchHotels = async () => {
        const response = await axios.get("/api/hotels", {
            params: {
                search: searchQuery,
                rating: rating,
                city: selectedCity
            },
        })
        return response.data.hotels
    }
    console.log(searchQuery, rating, selectedCity)
    const { data: hotels, isLoading } = useQuery({
        queryKey: ['hotels', searchQuery, rating, selectedCity],
        queryFn: fetchHotels,
    })


    const SkeletonCard = () => (
        <Card className="flex flex-col animate-pulse">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full bg-gray-200 rounded-t-lg" />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full" />
                        <div className="h-4 bg-gray-200 rounded w-4/5" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-6 w-16 bg-gray-200 rounded-full" />
                        ))}
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <div className="h-6 bg-gray-200 rounded w-16" />
                            <div className="h-4 bg-gray-200 rounded w-12" />
                        </div>
                        <div className="h-10 w-24 bg-gray-200 rounded-lg" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : !hotels || hotels.length === 0 ? (
                <div className="col-span-full text-center py-10">
                    <p className="text-lg text-muted-foreground">No hotels found</p>
                </div>
            ) : (
                hotels.map((hotel: any) => (
                    <Card key={hotel.id} className="flex flex-col">
                        <CardHeader className="p-0">
                            <div className="relative h-48 w-full">
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
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg">{hotel?.name}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                        <MapPin className="h-4 w-4" />
                                        {hotel?.city.name}, {hotel?.city.country.name}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                                {hotel?.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {hotel?.amenities.slice(0, 3).map((amenity: string) => (
                                    <Badge key={amenity} variant="secondary">
                                        {amenity}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-between items-end">
                                <Link href={`/hotels/${hotel?.id}`}>
                                    <Button>View Details</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    )
}
