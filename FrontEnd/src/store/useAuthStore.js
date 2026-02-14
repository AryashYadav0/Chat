import {create} from 'zustand';
export const useAuthStore = create((set) => ({
    authUser: { name: "Abhishek", _id: 1234, age: 22 },
    isLoggedIn: false,
    isLoading: false,

    login:()=>{
        console.log("We just logged in ");
        set({isLoggedIn: true, isLoading:true});
    }
}))