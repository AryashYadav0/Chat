import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';


export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    message: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    isSoundEnable: JSON.parse(localStorage.getItem("isSoundEnable")) === true, //default false

    // toggleSound: () => {
    //     localStorage.setItem("isSoundEnable", !get().isSoundEnable);
    //     set({ isSoundEnable: !get().isSoundEnable });
    // },  
    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => { set({ activeTab: tab }) },
    setSelectedUser: (selectedUser) => { set({ selectedUser }) },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            // set({ isUsersLoading: false });
        }
    },
    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    
}))