"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
export default function Drake() {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        toast("Drake loves you!");
        setTimeout(() => setIsClicked(false), 1000);
    };

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            {/* Toast */}
            <Button 
                className="border-none hover:bg-transparent hover:text-blue-500 group"
                variant="link" 
                onClick={handleClick}
            >
                <div className="w-[500px] h-[500px] relative">
                    {/* Default image */}
                    <Image 
                        src="/drake.jpeg" 
                        alt="Drake" 
                        width={500} 
                        height={500}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                            isClicked ? 'opacity-0' : 'group-hover:opacity-0'
                        }`}
                    />
                    {/* Hover image */}
                    <Image 
                        src="/drake_hoverAlt.jpg" 
                        alt="Drake Hover" 
                        width={500} 
                        height={500}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            isClicked ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                        }`}
                    />
                    {/* Click image */}
                    <Image 
                        src="/drake_onClick.jpeg" 
                        alt="Drake Click" 
                        width={500} 
                        height={500}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            isClicked ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                </div>
            </Button>
    
            </main>
      </div>
    );
  }