import{create}from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/v1/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/v1/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
      console.log("SIGNUP CLICKED");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed. Please try again.");
      console.log(error);
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
  try{
    const res = await axiosInstance.post("/auth/v1/login", data);
    set({authUser:res.data});
    toast.success("Logged in successfully");
    console.log("LOGIN CLICKED");
  }catch(error){
    toast.error(error.response.data.message || "Login failed. Please try again.");
    console.log(error);
  }finally{set({isLoggingIn:false});
  
  }
},

logout:async()=>{
  try{
    await axiosInstance.post("/auth/v1/logout");
    set({authUser:null});
    toast.success("Logged out successfully");
    console.log("LOGOUT CLICKED");
  }catch(error){
    toast.error(error.response.data.message || "Logout failed. Please try again.");
    console.log(error);
  }
},

}));
