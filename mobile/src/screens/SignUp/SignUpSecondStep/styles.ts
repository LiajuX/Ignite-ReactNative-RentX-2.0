import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`  
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-top: ${getStatusBarHeight() + 31}px;
`;

export const Steps = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  width: 200px;

  margin: 60px 0 16px 8px;

  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(40)}px;
  font-family: ${({ theme }) => theme.fonts.primary_600};
`;

export const Subtitle = styled.Text`
  width: 250px;

  margin-left: 8px;

  color: ${({ theme }) => theme.colors.text};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  line-height: ${RFValue(25)}px;
`;

export const FormTitle = styled.Text`
  margin-bottom: 24px;

  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.primary_600};
`;

export const Form = styled.View`
  margin: 64px 0 8px;
`;
