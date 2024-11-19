import loginProps from '@/types/login';
import signUpProps from '@/types/signUp';
import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useSuperAdminLogin = create((set) => ({
  adminData: [],

  verifySuperADminLogin: async (data: loginProps) => {
    try {
      const verifyLogin = await axios.post(
        'http://localhost:3500/admin/login',
        data,
      );

      if (verifyLogin.status === 200) {
        set({ adminData: verifyLogin.data.response });
        localStorage.setItem('email', '673adb3b37d21f637988fda6');
        localStorage.setItem('custId', verifyLogin.data.adminId);
      }
    } catch (errors) {
      toast.error(`${errors?.response?.data?.response}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  },

  adminSignUp: async (data: signUpProps) => {
    try {
      const createNewAdmin = await axios.post(
        'http://localhost:3500/admin/create',
        data,
      );

      if (createNewAdmin.status === 200) {
        localStorage.setItem('email', '673adb3b37d21f637988fda6');
        localStorage.setItem('custId', createNewAdmin.data.adminId);
      }
    } catch (error) {
      console.log('failed to Sign up');
    }
  },
}));

export default useSuperAdminLogin;
