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
  RegisterFields,
} from '../types';

type AuthContextType = {
  authUser: initialAuthType;
  authUserStocks: any[];
  registered: boolean;
  handleLogin: (fields: LoginFields) => void;
  handleLogout: () => void;
  handleFetchAuthUserData: () => void;
  handleFetchAuthUserStocks: () => void;
  handleProfileUpdate: (fields: ProfileUpdateFields) => void;
  handleRegister: (fields: RegisterFields) => void;
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
  registered: false,
  authUserStocks: [],
  handleLogin: () => {},
  handleLogout: () => {},
  handleFetchAuthUserData: () => {},
  handleProfileUpdate: () => {},
  handleFetchAuthUserStocks: () => {},
  handleRegister: () => {},
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

  const [registered, setRegistered] = useState(false);

  const [authUserStocks, setAuthUserStocks] = useState([]);

  useEffect(() => {
    getAuthTokenFromStorage();

    console.log(authUser.isLoggedIn, 'authUser.isLoggedIn');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAuthTokenFromStorage = async () => {
    const token = await getAuthToken();
    // console.log(token, 'token');

    if (token) {
      setIsLoggedIn(true);
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
    try {
      const authUserData = await getAuthUserData();

      setAuthUser({
        ...authUser,
        user: authUserData,
      });
    } catch (error: Object | any) {
      console.error(error);
    }
    // console.log(authUser.user, 'authUser state');
  };

  const handleFetchAuthUserStocks = async () => {
    try {
      setLoading(true);
      const response = await api.get(endPoints.authUser);

      setAuthUserStocks(response.data?.data?.authUserStocks);

      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      setErrors(error);
      console.error(error);
    }
  };

  const handleRegister = useCallback(async (fields: RegisterFields) => {
    try {
      setLoading(true);
      setErrors([]);
      const response = await api.post(endPoints.register, {
        name: fields.name,
        email: fields.email,
        password: fields.password,
        passwordConfirmation: fields.passwordConfirmation,
      });

      if (response.data?.success === false) {
        return setErrors(response.data?.message);
      }

      return setRegistered(response.data?.success);
    } catch (error: Object | any) {
      console.error(error?.content);
      setErrors(error?.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = useCallback(async (fields: LoginFields) => {
    try {
      setErrors([]);
      setLoading(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      console.log('logout');

      await AsyncStorage.removeItem(authTokenKey);
      setIsLoggedIn(false);
    } catch (error: Object | any) {
      console.error(error);
      setErrors(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        registered,
        authUserStocks,
        handleLogin,
        handleLogout,
        handleFetchAuthUserData,
        handleRegister,
        // handleProfileUpdate,
        handleFetchAuthUserStocks,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
