import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key present:', !!supabaseKey)

// Add error handling for missing environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables!')
  throw new Error('Supabase configuration is missing')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})