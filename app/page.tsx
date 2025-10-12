"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {toast} from "sonner";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent} from "@/components/ui/accordion";

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
                <Accordion
                  type = "single"
                  collapsible
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className = "text-4xl">
                      Student at UC Berkeley
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className = "text-lg">I currently study EECS + Business Administration as part of the M.E.T. Program! I love building AI systems that turn data into real-world impact.</p>
                      <br/>
                      <p className = "text-lg">I have worked across defense tech, venture intelligence, and humanitarian AI, from drone detection pipelines to real-time voice agents and climate analytics platforms.</p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className = "text-4xl">
                      From Michigan!
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className = "text-lg">I was born in Ohio, but raised in Rochester Hills, Michigan. I moved to the Bay Area in 2024 for the start of college. </p>
                    </AccordionContent>
                  </AccordionItem>
                  

                  <AccordionItem value="item-3">
                    <AccordionTrigger className = "text-4xl">
                      Risk Taker
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className = "text-lg">I’ve always been comfortable taking calculated risks — whether it’s diving into an unfamiliar technology, leading a project outside my comfort zone, or pitching unconventional ideas.</p>
                      <br/>
                      <p className = "text-lg">I love the thrill of building something new and seeing how far I can push my limits. </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className = "text-4xl">
                      Entrepreneur
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className = "text-lg">I was born in Ohio, but raised in Rochester Hills, Michigan. I moved to the Bay Area in 2024 for the start of college. </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
  
              </CardContent>
            </Card>
          </div>

        </div>
        

      </main>
    </div>
  );
}
