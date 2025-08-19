//for states
import { create } from 'zustand';
import axiosInstance from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningIn:false,
  isLoggingIn:false,
  isUpdatingProfile:false,

  isCheckingAuth:true,

  setAuthUser: (user) => set({ authUser: user }),

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
      set({authUser:null});
    }finally{
        set({isCheckingAuth:false});
    }
    
  },

   signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

})); 