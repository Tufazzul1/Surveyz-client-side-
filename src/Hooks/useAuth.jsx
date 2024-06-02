import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";


const useAuth = () => {
    const useAuth = useContext(AuthContext)
    return useAuth;
};

export default useAuth;