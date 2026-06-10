'use client';
import React, { useState } from 'react';
import { Church } from 'lucide-react';
import LoginForm from './loginForm';

const LoginPage = () => {
  
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-900 via-purple-800 to-purple-900 px-4 sm:px-6 lg:px-8">
      {/* Login Card */}
      <div className="w-full max-w-md">
        {/* Church Logo/Branding */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Church className="h-10 w-10 text-purple-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            New Covenant Church
          </h1>
          <p className="text-purple-200">Ifako Admin Portal</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-600 mt-1">
              Sign in to access the admin dashboard
            </p>
          </div>

          <LoginForm />

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a
                href="#"
                className="font-medium text-purple-600 hover:text-purple-700 transition-colors"
              >
                Contact administrator
              </a>
            </p>
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="mt-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-sm text-white font-medium">
              "For I know the plans I have for you," declares the LORD
            </p>
            <p className="text-xs text-purple-200 mt-1">- Jeremiah 29:11</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-xs text-purple-200">
            © 2025 New Covenant Church, Ifako. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;