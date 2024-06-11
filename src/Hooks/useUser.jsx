import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useProUser = () => {
    
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isUser, isPending: isUserLoading } = useQuery({
      queryKey: [user?.email, "isUser"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/user/${user?.email}`);
        console.log(res.data);
        return res.data?.proUser;
      },
    });
  
    return [isUser, isUserLoading];
  };

export default useProUser;