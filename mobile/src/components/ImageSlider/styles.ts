import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  align-items: center;

  padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
  align-items: center;
  justify-content: center;

  margin-top: 36px;

  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;
`;

export const CarImage = styled(FastImage)`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
