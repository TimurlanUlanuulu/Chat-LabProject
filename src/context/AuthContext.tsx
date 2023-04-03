import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import {auth} from "../components/Auth/config/firebase"

interface AuthValue{
    currentUser?: any
}

export const AuthContext = createContext<AuthValue>({});


interface AuthProps{
    children: any
}

export const AuthContextProvider: React.FC<AuthProps> = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})



    useEffect(()=>{
        // const unsub = onAuthStateChanged(auth, (user) => {
        //     setCurrentUser(user!);
        //     console.log("asd", currentUser);
        // });
        // console.log("aaaansuc", unsub);
        

        // return () => {
        //     unsub();
        // }
        let res = JSON.parse(localStorage.getItem("user")!)
        console.log(res);
        
        // setCurrentUser()
    }, []);

    return (
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>

    )

};