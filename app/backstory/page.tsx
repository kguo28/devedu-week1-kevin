import { Carousel } from "@/components/ui/carousel";
import Image from "next/image";

import { CarouselContent } from "@/components/ui/carousel";
import { CarouselItem } from "@/components/ui/carousel";
import { CarouselPrevious } from "@/components/ui/carousel";
import { CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
// app/about/page.tsx       
export default function About() {
    return (
      <div className = "text-white min-h-screen flex items-center justify-center">
        <Carousel className = "w-[700px] max-w-7xl">
          <CarouselContent>
            <CarouselItem>
                <Card>
                    <CardHeader className = "text-4xl text-center">Moved into a new house!</CardHeader>
                    <CardContent className = "text-center">
                        <div className="w-[500px] h-[700px] mb-4 mx-auto">
                            <Image src = "/house.jpeg" alt = "1" width = {1000} height = {900} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <p>I moved into a new house with my friends in the Bay Area. It's a great place to live and I'm excited to start a new chapter of my life.</p>
                    </CardContent>  
                </Card>
            </CarouselItem>
            <CarouselItem>
            <Card>
                    <CardHeader className = "text-4xl text-center">B@B</CardHeader>
                    <CardContent className = "text-center">
                        <div className="w-[500px] h-[700px] mb-4 mx-auto">
                            <Image src = "/blockchain.jpeg" alt = "1" width = {1000} height = {900} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <p>Joined Blockchain at Berkeley! SOO excited for what's to come!</p>
                    </CardContent>  
                </Card>
            </CarouselItem>
            <CarouselItem>
                <Card>
                    <CardHeader className = "text-4xl text-center">Yummy food!</CardHeader>
                    <CardContent className = "text-center">
                        <div className="w-[500px] h-[700px] mb-4 mx-auto">
                            <Image src = "/banana.jpeg" alt = "1" width = {1000} height = {900} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <p>Delicious banana icecream I had with my housemates. Looked just like a real banana!</p>
                    </CardContent>  
                </Card>
            </CarouselItem>
             <CarouselItem>
                 <Card>
                     <CardHeader className = "text-4xl text-center">Coming Soon</CardHeader>
                     <CardContent className = "text-center">
                         <p>More to come...</p>
                     </CardContent>  
                 </Card>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
            
        </Carousel>
        
      </div>
    );
  }