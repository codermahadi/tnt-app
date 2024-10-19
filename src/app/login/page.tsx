"use client"
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

// Define the schema using Zod
const schema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" {...register('email')} placeholder="Enter your email"
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" {...register('password')} placeholder="Enter your password"
                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-center text-base font-medium text-gray-500">Don&apos;t have an account? <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</a></p>
      </div>
    </div>
  );
}

export default SignIn;
