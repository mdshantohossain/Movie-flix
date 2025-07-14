import { getCurrentUser } from "@/libs/appwrite";
import { UserType } from "@/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type GlobalContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalContextType>({
  isLoading: false,
  isLoggedIn: false,
  user: null,
  setUser: () => {},
  setIsLoading: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context)
    throw Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
          setIsloading(true);
          setUser({
            username: res.username,
            email: res.email,
          });
          setIsLoggedIn(true);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsloading(false));
  }, []);

  const values = {
    isLoading,
    isLoggedIn,
    user,
    setUser: (user: React.SetStateAction<UserType | null>) => {
          setUser(user);
    },
    setIsLoading: (loginStatus: React.SetStateAction<boolean>) => {
      setIsloading(loginStatus);
    }
  }

  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
