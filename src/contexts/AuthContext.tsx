import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../api';
import { endPoints } from '../api/endPoints';
import type {
  AuthUserDetails,
  initialAuthType,
  LoginFields,
  ProfileUpdateFields,
} from '../types';

type AuthContextType = {
  authUser: initialAuthType;
  authUserStocks: any[];
  handleLogin: (fields: LoginFields) => void;
  handleLogout: () => void;
  handleFetchAuthUserData: () => void;
  handleFetchAuthUserStocks: () => void;
  handleProfileUpdate: (fields: ProfileUpdateFields) => void;
  // handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const authUserKey = 'auth-user';
const authTokenKey = 'auth-token';

const userFields = {
  _id: '',
  _v: 0,
  createdAt: '',
  email: '',
  name: '',
  photo: '',
  role: '',
  slug: '',
  type: '',
  updatedAt: '',
  verificationStatus: '',
};

const setAuthUserData = async (authUser: initialAuthType): Promise<void> => {
  try {
    const processedData = JSON.stringify(authUser);
    await AsyncStorage.setItem(authUserKey, processedData);
  } catch (error: unknown) {
    console.error(error);
  }
};

const getAuthUserData = async (): Promise<AuthUserDetails> => {
  try {
    const result = await AsyncStorage.getItem(authUserKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch (error: unknown) {
    console.error(error);
  }
  return userFields;
};

const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(authTokenKey, token);
  } catch (error: unknown) {
    console.error(error);
  }
};

const getAuthToken = async (): Promise<string | null> => {
  try {
    const result = await AsyncStorage.getItem(authTokenKey);
    if (result) {
      return result;
    }
  } catch (error: unknown) {
    console.error(error);
  }
  return null;
};

const AuthContext = createContext<AuthContextType>({
  authUser: {
    errors: [],
    isLoggedIn: false,
    loading: false,
    profileUpdateSuccess: '',
    user: userFields,
    stocks: [],
  },
  authUserStocks: [],
  handleLogin: () => {},
  handleLogout: () => {},
  handleFetchAuthUserData: () => {},
  handleProfileUpdate: () => {},
  handleFetchAuthUserStocks: () => {},
});

export const AuthProvider: React.FC = ({
  children,
}: React.EmbedHTMLAttributes<any>) => {
  const [authUser, setAuthUser] = useState<initialAuthType>({
    errors: [],
    isLoggedIn: false,
    loading: false,
    profileUpdateSuccess: '',
    user: userFields,
    stocks: [],
  });

  const [authUserStocks, setAuthUserStocks] = useState([]);

  useEffect(() => {
    getAuthTokenFromStorage();
    // console.log(authUser.isLoggedIn);
  }, []);

  const getAuthTokenFromStorage = async () => {
    const token = await getAuthToken();
    if (token) {
      setIsLoggedIn(true);

      setAuthUser({
        ...authUser,
        isLoggedIn: true,
      });
    }
  };

  const setLoading = (payload: boolean) => {
    setAuthUser({
      ...authUser,
      loading: payload,
    });
  };

  const setErrors = (payload: any) => {
    setAuthUser({
      ...authUser,
      errors: payload,
    });
  };

  const setIsLoggedIn = (payload: boolean) => {
    setAuthUser({
      ...authUser,
      isLoggedIn: payload,
    });
  };

  const handleFetchAuthUserData = async () => {
    const authUserData = await getAuthUserData();

    setAuthUser({
      ...authUser,
      user: authUserData,
    });
  };

  const handleLogin = useCallback(async (fields: LoginFields) => {
    try {
      setLoading(true);
      setErrors([]);
      const response = await api.post(endPoints.login, {
        email: fields.email,
        password: fields.password,
      });

      if (response.data?.success === false) {
        return setErrors(response.data?.message);
      }

      await setAuthToken(response.data?.token);
      // console.log(response.data);

      await setAuthUserData(response.data?.user);
      setIsLoggedIn(true);
      setLoading(false);
    } catch (error: Object | any) {
      console.error(error?.content);
      setErrors(error?.content);
    }
    // eslint
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authUserStocks,
        handleLogin,
        // handleLogout,
        handleFetchAuthUserData,
        // handleProfileUpdate,
        // handleFetchAuthUserStocks,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
