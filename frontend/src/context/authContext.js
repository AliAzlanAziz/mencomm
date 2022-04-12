import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { auth } from '../global/url'

export const AuthContext = React.createContext()

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = React.useState('')
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [userType, setUserType] = React.useState('')
    const [profileUpdated, setProfileUpdated] = React.useState(true)
    const [profile, setProfile] = React.useState({
        name: '',
        birthday: '',
        gender: '',
        email: '',
        location: {
            address: '',
            longitude: '',
            latitude: ''
        },
        user_type: '',
        avatar_url: ''
    })

    const getProfile = async () => {
        // console.log("get Profile")
        try {
            setLoading(true)
            if(loggedIn && profileUpdated){
                // console.log("get Profile API")
                const res = await axios({
                    url: `${auth}/profile`,
                    method: 'get',
                    headers: {
                        token: token
                    },
                })
                if(res.status == 200){
                    //set user info context
                    // console.log(JSON.stringify(res.data))
                    setProfile(res.data)
                    if(res.data.user_type === 'std'){
                        setUserType('0')
                    }else if(res.data.user_type === 'ttr'){
                        setUserType('1')
                    }
                }
                setProfileUpdated(false)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    } 

    // Get current auth state from AsyncStorage
    const getAuthState = async () => {
        // console.log("get auth")
        try {
            setLoading(true)
            const authDataString = await AsyncStorage.getItem("token");
            const authData = JSON.parse(authDataString || '');
            // Configure axios headers
            // configureAxiosHeaders(authData.token);
            setToken(authData);
            if(authData != ''){
                setLoggedIn(true)
            }
            setLoading(false)
        } catch (err) {
            setToken('');
            setLoading(false)
        }
    };

    // Update AsyncStorage & context state
    const setAuth = async (token) => {
        // console.log("set auth")
        try {
            setLoading(true)
            await AsyncStorage.setItem("token", JSON.stringify(token));
            // Configure axios headers
            // configureAxiosHeaders(auth.token);
            setToken(token);
            setLoggedIn(true)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    const removeAuthState = async () => {
        try {
            setLoading(true)
            await AsyncStorage.removeItem("token");
            // Configure axios headers
            // configureAxiosHeaders('');
            setToken('');
            setLoggedIn(false)
            setProfileUpdated(true)
            setProfile({
                name: '',
                birthday: '',
                gender: '',
                email: '',
                location: {
                    address: '',
                    longitude: '',
                    latitude: ''
                },
                user_type: '',
                avatar_url: ''
            })
            setUserType('')
            setLoading(false)
        } catch (err) {
            setToken('');
            setLoading(false)
        }
    };
    
    // const configureAxiosHeaders = (token) => {
    //     axios.defaults.headers["token"] = token
    // };

    React.useEffect(() => {
        getAuthState();
    }, []);

    React.useEffect(() => {
        getProfile()
    }, [loggedIn, profileUpdated])
    
    return (
        <AuthContext.Provider 
            value={{
                token,
                setAuth,
                removeAuthState,
                loggedIn,
                loading,
                setLoading,
                profile,
                setProfile,
                setProfileUpdated,
                userType,
                setUserType
            }}>
            {children}
        </AuthContext.Provider>
    )
}