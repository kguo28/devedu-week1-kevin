"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {toast} from "sonner";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-1 pb-8 gap-5 sm:p-1">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Title Section */}
        <div className = "h-[40rem] w-full max-w-7xl flex items-center justify-center overflow-hidden">
          <TextHoverEffect 
            text = "Kevin Guo" 
          />
        </div>

        <div className = "w-full max-w-7xl flex items-center justify-center gap-8">
          <Card className = "w-fit flex items-center">
            {/* <CardHeader>
              <CardTitle className="whitespace-nowrap text-2xl font-bold">Hi there!</CardTitle>
            </CardHeader> */}
            <CardContent>
              <Image 
                src="/kevin.jpg" 
                alt="Kevin Guo" 
                width={500} 
                height={500} 
              />
            </CardContent>
          </Card>
          <div className = "w-fit">
            <Card className = "w-2xl flex items-center">
              <CardTitle className = "text-5xl font-bold text-center">
              Hi, I’m Kevin Guo! I . . .
              </CardTitle>
              <CardContent>
              <p className = "text-lg">
                - Am a UC Berkeley M.E.T. student (EECS + Business Administration) building AI systems that turn data into real-world impact. 
              </p>
              <p className = "text-lg">
                - Have worked across defense tech, venture intelligence, and humanitarian AI, from drone detection pipelines to real-time voice agents and climate analytics platforms. 
              </p>
              <p className = "text-lg">
                - Love creating systems that are technically rigorous, ethically grounded, and operational at scale.
              </p>
              </CardContent>
            </Card>
          </div>

        </div>
        

      </main>
    </div>
  );
}
