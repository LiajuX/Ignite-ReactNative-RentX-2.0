import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;

  margin-top: ${getStatusBarHeight() + RFValue(115)}px;
`;

export const Title = styled.Text`
  width: 200px;

  margin-bottom: 16px;
  margin-left: 8px;

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

export const Form = styled.View`
  margin: 64px 0;
`;

export const Footer = styled.View``;
