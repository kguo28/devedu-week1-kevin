'use client';

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
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
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('Starting fetchUsers...');
      
      // Try to fetch users with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      console.log('Making Supabase request...');
      const {data, error} = await supabase
        .from('userinfo')
        .select('first_name, last_name, email, phone_number')
        .abortSignal(controller.signal);
      
      clearTimeout(timeoutId);
      
      console.log('Supabase response:', { data, error });
      
      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      setUsers(data || []);
      console.log('Successfully fetched users:', data);
      
    } catch (error: any) {
      console.error('Fetch error details:', {
        name: error.name,
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      
      if (error.name === 'AbortError') {
        toast.error('Connection timeout - Supabase may be offline');
      } else if (error.message?.includes('Failed to fetch')) {
        toast.error('Cannot connect to Supabase - check your internet connection');
      } else if (error.code === 'PGRST301') {
        toast.error('Table not found - check your Supabase table name');
      } else if (error.code === 'PGRST301') {
        toast.error('Permission denied - check RLS policies');
      } else {
        toast.error(`Database error: ${error.message || 'Unknown error'} (Code: ${error.code || 'N/A'})`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);  
  
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
            first_name: validatedData.name,
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
      
      // Refresh the users list after successful insert
      fetchUsers();
      
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      } else if (error.code === '23505' && error.message.includes('password')) { 
        toast.error('Password already exists');
      } else if (error.message?.includes('Failed to fetch')) {
        toast.error('Cannot connect to database - please try again');
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


            <Card className="w-2xl">
              <CardTitle className="text-2xl font-bold text-center mb-4">
                Registered Users
              </CardTitle>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading users...</div>
                ) : users.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">No users found</div>
                ) : (
                  <div className="space-y-3">
                    {users.map((user, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                        <div>
                          <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.phone_number}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Add Friend
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
      
      </main>
    </div>
  );
}
