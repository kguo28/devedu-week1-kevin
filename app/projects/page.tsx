'use client';

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { toast } from "sonner";
import {z} from "zod";

const signupSchema = z.object({
  name: z.string()
    .min(1, "Enter your first name")
    .max(30, "Your first name can't be that long bro")
    .regex(/^[a-zA-Z\s]+$/, "Your first name can only contain letters and spaces"),
  lastName: z.string()
    .min(1, "Enter your last name")
    .max(30, "Your last name can't be that long bro")
    .regex(/^[a-zA-Z\s]+$/, "Your last name can only contain letters and spaces"),
  email: z.string()
    .min(1, "Enter your email")
    .email("Invalid email"),
  phoneNumber: z.string()
    .min(1, "Enter your phone number")
    .regex(/^\d+$/, "Phone numbers must only contain numbers")
    .length(10, "Phone numbers are 10 digits long stupid"),
  password: z.string()
    .min(1, "Enter your password")
    .min(8, "Passwords must be at least 8 characters long"),
  confirmPassword: z.string()
    .min(1, "Confirm your password")
    .min(8, "Passwords must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

export default function Projects() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);  
  const clearForm = () => {
    setFormData({
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });
  }
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Zod validation
      const validatedData = signupSchema.parse(formData);
      
      const { data, error } = await supabase
        .from('userinfo')
        .insert([
          {
            name: validatedData.name,
            last_name: validatedData.lastName,
            email: validatedData.email,
            phone_number: validatedData.phoneNumber,
            password: validatedData.password,
            confirm_password: validatedData.confirmPassword
          }
        ])
        .select();
  
      if (error) throw error;
      
      console.log('Data inserted:', data);
      toast.success('Account Created!');
      clearForm();
      
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      } else if (error.code === '23505' && error.message.includes('password')) { 
        toast.error('Password already exists');
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Card className = "w-2xl flex items-center">
              <CardTitle className = "text-5xl font-bold text-center">
                Create an account
              </CardTitle>
                <CardContent>
                  <div className="flex gap-4 items-center">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"     
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                    />
                  </div>        
                </CardContent>
              <CardContent>
                <input 
                  type="text" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </CardContent>
              <CardContent>
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </CardContent>
              <CardContent>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </CardContent>
              <CardContent>
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                />
              </CardContent>
              <CardContent>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
                <Button onClick={clearForm} variant="ghost" size="sm" disabled={loading}>
                  Clear
                </Button>
              </CardContent>
            </Card>
      
      </main>
    </div>
  );
}
