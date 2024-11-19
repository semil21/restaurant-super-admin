'use client';

import '../styles/globals.css';

import React, { useEffect, useState } from 'react';

import { Inter } from 'next/font/google';

import Header from '@/components/header';
import HeaderMobile from '@/components/header-mobile';
import MarginWidthWrapper from '@/components/margin-width-wrapper';
import PageWrapper from '@/components/page-wrapper';
import SideNav from '@/components/side-nav';
import useSuperAdminLogin from '@/service/admin/admin';
import loginProps from '@/types/login';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import signUpProps from '@/types/signUp';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setIsLogIn(true);
    }
  }, []);

  const [isLogIn, setIsLogIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const { verifySuperADminLogin, adminSignUp } = useSuperAdminLogin() as {
    verifySuperADminLogin: (data: loginProps) => Promise<void>;
    adminSignUp: (data: signUpProps) => Promise<void>;
  };

  const validateInputs = (data: any) => {
    let isValid = true;

    if (!data.email) {
      setError('email', { type: 'manual', message: 'Email is required' });
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError('email', { type: 'manual', message: 'Invalid email format' });
      isValid = false;
    }

    if (!data.password) {
      setError('password', { type: 'manual', message: 'Password is required' });
      isValid = false;
    } else if (data.password.length < 6) {
      setError('password', {
        type: 'manual',
        message: 'Password must be at least 6 characters',
      });
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (data: loginProps) => {
    if (validateInputs(data)) {
      await verifySuperADminLogin(data).then(() => {
        const email = localStorage.getItem('email');
        if (email) {
          setIsLogIn(true);
        }
      });
    }
  };

  const handleSignUp = async (data: signUpProps) => {
    if (validateInputs(data)) {
      await adminSignUp(data).then(() => {
        const email = localStorage.getItem('email');

        if (email) {
          setIsLogIn(true);
        }
      });
    }
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
        ) : signUp == false ? (
          <div className="antialiased text-gray-900 font-sans bg-gradient-to-br   from-[#05051F] to-[#023298]">
            <div className="flex items-center h-screen w-full">
              <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-xl uppercase font-bold mb-4 text-center font-bold text-[22px]">
                  Welcome to Smart Serve
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
                  <div className="mt-4">
                    <p className="text-center text-sm text-gray-500 text-[15px] text-medium">
                      Don&#x27;t have an account yet?
                      <a
                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none pl-3 text-bolder text-[15px]"
                        onClick={() => setSignUp(true)}
                      >
                        Sign up
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full px-[calc(theme(spacing.16)*4)] font-[sans-serif] p-6 bg-gradient-to-br from-[#05051F] to-[#023298]">
            <div className="text-center mb-16">
              <img
                src="https://readymadeui.com/readymadeui.svg"
                alt="logo"
                className="w-52 inline-block"
              />

              <h4 className="text-white text-base font-semibold mt-6">
                Create New Account here
              </h4>
            </div>

            <form>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md t outline-blue-500 transition-all"
                    placeholder="Enter Restaurant name"
                    {...register('restaurant')}
                  />
                  {errors.firstName?.type === 'required' && (
                    <p role="alert text-red-400">First name is required</p>
                  )}
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Restaurant Type
                  </label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter Restaurant Type"
                    {...register('type')}
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Restaurant Address
                  </label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder=" Enter Restaurant Address"
                    {...register('restaurantAddress')}
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Restaurant Contact
                  </label>
                  <input
                    type="number"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter Restaurant Contact Number"
                    {...register('restaurantContact')}
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter Restaurant Owner Name"
                    {...register('owner')}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Owner Contact
                  </label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter Restaurant Owner number"
                    {...register('ownerContact')}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Owner Email
                  </label>
                  <input
                    type="email"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter Restaurant Owner Email"
                    {...register('email')}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Owner Password
                  </label>
                  <input
                    type="password"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter Password"
                    {...register('password')}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Parking available ?
                  </label>
                  <select
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    {...register('parking')}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    GST Number
                  </label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter GST number"
                    {...register('gst')}
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Owner Address
                  </label>
                  <input
                    type="text"
                    className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md  outline-blue-500 transition-all"
                    placeholder="Enter Restaurant Owner Address"
                    {...register('ownerAddress')}
                    required
                  />
                </div>
              </div>

              <div className="!mt-12 flex justify-center">
                <button
                  type="button"
                  className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-green-600  focus:outline-none"
                  onClick={handleSubmit(handleSignUp)}
                >
                  Sign up
                </button>
              </div>
              <div className="mt-4">
                <p className="text-center text-sm text-[15px] text-medium text-white">
                  Already have an account ?
                  <a
                    className="font-semibold  hover:underline focus:text-gray-800 focus:outline-none pl-3 text-bolder text-[15px]"
                    onClick={() => setSignUp(false)}
                  >
                    Log In here
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        )}
      </body>
    </html>
  );
}
