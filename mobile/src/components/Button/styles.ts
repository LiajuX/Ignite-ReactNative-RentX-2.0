import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface ButtonProps {
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 56px;

  margin-bottom: 8px;

  background-color: ${({ color }) => color};
`;

export const Title = styled.Text<ButtonTextProps>`
  color: ${({ theme, light }) => 
  light ? theme.colors.title : theme.colors.background_secondary};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
`;
