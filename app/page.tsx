"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {toast} from "sonner"

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Toast */}
        <Button 
          variant="outline" 
          onClick={() => toast("Hello! This is a toast notification!")}
        >
          Click me for toast!
        </Button>

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        banana
      </footer>
    </div>
  );
}
