import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useProUser = () => {
    
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isProUser, isPending: isProUserLoading } = useQuery({
      queryKey: [user?.email, "isProUser"],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users/prouser/${user?.email}`);
        console.log(res.data);
        return res.data?.proUser;
      },
    });
  
    return [isProUser, isProUserLoading];
  };

export default useProUser;
