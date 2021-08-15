import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  align-items: center;

  width: 100%;
  height: ${RFValue(227)}px;

  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-top: ${getStatusBarHeight() + 30}px;
`;

export const HeaderTitle = styled.Text`
  flex: 1;

  color: ${({ theme }) => theme.colors.background_secondary};

  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.primary_600};
  text-align: center;
`;

export const SignOutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;

  margin-top: 48px;
  border-radius: 90px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;

  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 4px;
  right: 4px;

  width: 44px;
  height: 44px;

  background-color: ${({ theme }) => theme.colors.main};
`;

export const Content = styled.View`
  margin-top: 128px;
  padding: 0 24px;
`;

export const Options = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<OptionProps>`
  padding-bottom: 14px;

  ${({ active }) => active && css`
    border-bottom-width: 2px;
    border-bottom-color: ${({ theme }) => theme.colors.main};
  `};
`;

export const OptionTitle = styled.Text<OptionProps>`
  color: ${({ active, theme }) => 
  active ? theme.colors.title : theme.colors.text_detail};

  font-size: ${RFValue(20)}px;
  font-family: ${({ active, theme }) => 
  active ? theme.fonts.primary_600 : theme.fonts.primary_400};
`;

export const Section = styled.View`
  margin: 24px 0 8px;
`;
