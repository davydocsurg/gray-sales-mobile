import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../api';
import { endPoints } from '../api/endPoints';
import type {
  AuthStateType,
  AuthStockDetails,
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

// type AuthUserType = {
//   authUser: initialAuthType;
// };

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

const stockFields = [
  {
    _id: '',
    _v: 0,
    createdAt: '',
    updatedAt: '',
    price: 0,
    title: '',
    description: '',
    images: [],
    categoryId: '',
    user: 'string',
  },
];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      console.log(response.data);

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
      await AsyncStorage.removeItem(authTokenKey);
      setIsLoggedIn(false);
    } catch (error: Object | any) {
      console.error(error);
      setErrors(error);
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

  const handleFetchAuthUserData = async () => {
    const authUserData = await getAuthUserData();

    setAuthUser({
      ...authUser,
      user: authUserData,
    });
  };

  const setProfileUpdate = (payload: string) => {
    setAuthUser({
      ...authUser,
      profileUpdateSuccess: payload,
    });
  };

  const handleSetAuthUserStocks = (payload: []) => {
    setAuthUser({
      ...authUser,
      stocks: payload,
    });
  };

  const handleProfileUpdate = useCallback(
    async (values: ProfileUpdateFields) => {
      try {
        setLoading(true);
        setErrors(null);
        const data = new FormData();
        // console.log(values.profilePhoto, "log");

        const photo: any = {
          uri: values.profilePhoto[0].uri,
          name: values.profilePhoto[0].name,
          type: values.profilePhoto[0].type,
        };
        data.append('name', values.name);
        data.append('email', values.email);
        data.append('photo', photo);

        let authUserLocal = await AsyncStorage.getItem(authUserKey);
        authUserLocal = JSON.parse(authUserLocal!);
        console.log(authUserLocal?._id, 'direct');
        // handleFetchAuthUserData();
        // console.log(authUser.user._id, "id");

        const response = await api.put(
          endPoints.updateProfile + authUserLocal?._id,
          data,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );

        if (response.data?.success) {
          await setAuthUserData(response.data?.data?.updatedData);
          // setProfileUpdate("updated");
          console.log(authUser);

          return response.data?.success;
        }
        setLoading(false);
      } catch (error: unknown) {
        setErrors(error);
        console.error(authUser.errors);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleFetchAuthUserStocks = async () => {
    try {
      setLoading(true);
      const response = await api.get(endPoints.authUser);
      // console.log(response.data.data.authUserStocks);

      setAuthUserStocks(response.data.data.authUserStocks);

      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);
      setErrors(error);
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authUserStocks,
        handleLogin,
        handleLogout,
        handleFetchAuthUserData,
        handleProfileUpdate,
        handleFetchAuthUserStocks,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
