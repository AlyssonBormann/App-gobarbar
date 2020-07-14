import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Platform } from 'react-native';


export const Container = styled.View`
  flex:1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150: 40}px;
  position: relative;

`;

export const Title = styled.Text`
  font-size: 18px;
  color: #f4ede8;
  font-family: 'Roboto-Medium';
  margin: 24px 0;
  text-align: left;
`;

export const UserAvatarButton = styled.TouchableOpacity`
margin-top: 5px;
`;

export const UserAvatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top:20px;
`;
