import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(()=>{console.log(user)
    },[user,setUser])

    // Load saved user on refresh
    useEffect(() => {
        const validateUser = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/users/validate`,
                    {},
                    { withCredentials: true }
                );
                setUser(response.data);
                console.log("User validated:", response.data);
            } catch (error) {
                console.log(
                    "Error while refreshing token :: ",
                    error || "Internal error"
                );
            }
        };

        validateUser();
    }, []);

    const login = (userData) => {
        setUser(userData);
        console.log(user);
        
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
