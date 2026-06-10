"use client"
import { Eye, EyeOff, Lock, Mail, } from 'lucide-react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { z} from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase.config';
import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';


 
export default function LoginForm(){

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

     const loginSchema = z.object({
        email:z.email("invalid email address"),
        password: z.string().min(1, "Please enter your password")
    })
      type User = z.infer<typeof loginSchema>
    const{register, handleSubmit, formState:{errors}}= useForm<User>({
        resolver:zodResolver(loginSchema)
    })


    

    async function onSubmit(data:User){
        setLoading(true);
        
        try{
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success('Login successful!');
            router.push('/admin');
        }catch(error){
            const errorMessage = (error as Error).message;
            toast.error(`Error: ${errorMessage}`);}
            finally{
            setLoading(false);
        }
        
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          {...register('email')}
                          className={`block w-full pl-10 pr-3 py-3 border ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                          placeholder="admin@ncc-ifako.org"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
        
                    {/* Password Input */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          {...register('password')}
                          className={`block w-full pl-10 pr-10 py-3 border ${
                            errors.password ? 'border-red-300' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors`}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                      )}
                    </div>
        
                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-700 cursor-pointer"
                        >
                          Remember me
                        </label>
                      </div>
        
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
        
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02]"
                    >
                      {loading?<Spinner /> : "Sign in to Dashboard" }
                    </button>
                  </form>
    )
}