import React, { createContext, useCallback, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState{
    token: string;
    user: object;
}
interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData{
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);

    useEffect(()=>{
        async function loadStoragedData(): Promise<void>{
            const [ token, user ] = await AsyncStorage.multiGet([
                '@Gobarber:token',
                '@Gobarber:user'
            ]);

            if(token[0] && user[1]){
                setData({token: token[0], user: JSON.parse(user[1])})
            }
        }

        loadStoragedData();
    },[]);

    const signIn = useCallback(async ({ email, password }) => {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
          ['@GoBarber:token', token],
          ['@GoBarber:user', JSON.stringify(user)]
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ token, user });
    }, []);

    const signOut = useCallback(async() => {
        await AsyncStorage.multiRemove([
            '@GoBarber:user',
            '@GoBarber:token',
        ]);

        setData({} as AuthState);
      },[]);

    return (
      <AuthContext.Provider
        value={{ user: data.user, signIn, signOut }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('UseAuth must be used within an AuthProvider');
    }

    return context;
  }

  export { AuthProvider, useAuth };
