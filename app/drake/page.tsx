"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Drake() {
    const [isClicked, setIsClicked] = useState(false);
    const [msg, setMsg] = useState("");
    const [reply, setReply] = useState("");

    const handleClick = () => {
        setIsClicked(true);
        toast("Drake loves you!");
        setTimeout(() => setIsClicked(false), 1000);
    };

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col row-start-2 items-center sm:items-start">
            <div className="flex flex-col items-center gap-16 mt-16">
                {/* Toast */}
                
                <Card>
                    <CardHeader className="flex flex-col items-center space-y-4 p-0 pt-0">
                        <Button 
                            className="border-none hover:bg-transparent hover:text-blue-500 group p-0 m-0"
                            variant="link" 
                            onClick={handleClick}
                        >
                            <div className="w-[200px] h-[120px] relative rounded-full overflow-hidden shrink-0">
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
                        <CardTitle className="text-center m-0 p-0">Drake</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Talk to Drake:
                        </p>
                        <Input 
                            type="text" 
                            placeholder="Tell him anything!" 
                            value={msg}
                            onChange={(e) => setMsg(e.target.value)}
                            onKeyDown={async (e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (!msg.trim()) return;
                                    try {
                                        const res = await fetch("/api/chat", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ message: msg }),
                                        });
                                        const data = await res.json();
                                        setReply(data?.reply ?? "");
                                        setMsg("");
                                    } catch (err) {
                                        // no-op: keep silent
                                    }
                                }
                            }}
                        />
                        {reply && (
                            <p className="mt-3 text-sm opacity-80">{reply}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
    );
}