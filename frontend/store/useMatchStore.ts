import {create } from "zustand";
import { axiosInstance } from "../libs/axios";
import ROUTES from "@/constants/route.constants";

export const useMatchStore = create((set, get) =>({
    upcomingMatches: [],
    pastMatches: [],
    isLoading: false,
    
    getUpcomingMatches: async () => {
        set({isLoading:true});
        try {
            const res = await axiosInstance.get(ROUTES.UPCOMING_MATCHES);
            console.log(res);

        } catch (error) {
            console.log(error)
        }finally{
            set({isMessagesLoading:false});
        }
    }
}));

export default useMatchStore;