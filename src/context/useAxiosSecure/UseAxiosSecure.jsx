import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import AuthContext from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UseAxiosSecure() {  /// ai components ta bananor karon holo amare ekjini jodi onek jaigei use kori jno amader bar bar create korte na hoy.............
    
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
        withCredentials: true
    });
   
    const { signOutUser } = useContext(AuthContext);
    const Navigate = useNavigate();

    useEffect(() => {
        axiosInstance.interceptors.response.use(response => {  /// atar j khane use kora hobe sei api ta chekc hobe and check korbe se valid jinish potro use kortese ki na >>>>>>> and ata use kora hoyse axios js er interseptor theke.
            return response;
        }, error => {
            console.log('error caught in interceptor', error.status);

            if (error.status === 401 || error.status === 403) {
                console.log("neeed to logout the user");
                signOutUser()
                .then(()=>{
                 Navigate('signIn')
                })
                .catch(err => console.log("error caught in interceptor", err))
            }

            return Promise.reject(error);

        })
    }, [])

    return axiosInstance;
}
