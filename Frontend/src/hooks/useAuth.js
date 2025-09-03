import { useSelector } from "react-redux";
const useAuth = () => {
  const { user, isAuth, isLoading, error } = useSelector((state) => state.auth);
  return { user, isAuth, isLoading, error };
};
export default useAuth;
