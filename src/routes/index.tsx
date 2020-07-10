import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes:React.FC = () =>(
  <Auth.Navigator screenOptions={{
    headerShown: false,
    cardStyle:{ backgroundColor: '#321e38'}
  }}
  //initialRouteName="SignUp" so caso eu queria usar um dia - ele inicia nessa pagina
  >
    <Auth.Screen name="SignIn" component={SignIn}/>
    <Auth.Screen name="SignUp" component={SignUp}/>
  </Auth.Navigator>
);

export default AuthRoutes;
