'use client';

import '../styles/globals.css';

import React, { useState } from 'react';

import { Inter } from 'next/font/google';

import Header from '@/components/header';
import HeaderMobile from '@/components/header-mobile';
import MarginWidthWrapper from '@/components/margin-width-wrapper';
import PageWrapper from '@/components/page-wrapper';
import SideNav from '@/components/side-nav';
import useSuperAdminLogin from '@/service/login';
import loginProps from '@/types/login';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { register, handleSubmit } = useForm();

  const [isLogIn, setIsLogIn] = useState(false);
  const { verifySuperADminLogin } = useSuperAdminLogin() as {
    verifySuperADminLogin: (data: loginProps) => Promise<void>;
  };

  const handleLogin = async (data: loginProps) => {
    await verifySuperADminLogin(data).then(() => {
      const email = localStorage.getItem('email');

      if (email) {
        setIsLogIn(true);
      }
    });
  };

  return (
    <html lang="en">
      <body className={`bg-white ${inter.className}`}>
        <div id="toast-container mt-30">
          <ToastContainer />
        </div>
        {isLogIn === true ? (
          <div className="flex">
            <SideNav />
            <main className="flex-1">
              <MarginWidthWrapper>
                <Header />
                <HeaderMobile />
                <PageWrapper>{children}</PageWrapper>
              </MarginWidthWrapper>
            </main>
          </div>
        ) : (
          <div className="antialiased text-gray-900 font-sans bg-gradient-to-br   from-[#05051F] to-[#023298]">
            <div className="flex items-center h-screen w-full">
              <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-xl uppercase font-bold mb-4 text-center font-bold text-[22px]">
                  Welcome to Super Admin
                </span>
                <form
                  className="mb-4 "
                  action="/"
                  method="post"
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className="mb-4 md:w-full mt-[50px]">
                    <label className="block text-xs mb-1 text-[15px] font-medium	">
                      Email
                    </label>
                    <input
                      className="w-full border rounded p-2 outline-none focus:shadow-outline"
                      type="email"
                      id="email"
                      placeholder="Enter your Email"
                      {...register('email')}
                    />
                  </div>
                  <div className="mb-6 md:w-full">
                    <label className="block text-xs mb-1 text-[15px] font-medium">
                      Password
                    </label>
                    <input
                      className="w-full border rounded p-2 outline-none focus:shadow-outline"
                      type="password"
                      id="password"
                      placeholder="Enter your Password"
                      {...register('password')}
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <button className="bg-green-600 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded ">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
