import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
export const useChatStore = create((set, get) => ({
    allContacts: [],
    chat: [],
    message: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,
    isSoundEnable: localStorage.getItem("isSoundEnable") === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnable", get().isSoundEnable)
        set({ isSoundEnable: !get().isSoundEnable })
    },

    setActiveTab: (tab) => { set({ activeTab: tab }) },
    setSelectedUser: (selectedUser) => { set({ selectedUser: selectedUser }) },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error( error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error( error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
}))