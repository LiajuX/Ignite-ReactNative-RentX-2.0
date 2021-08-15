import React from 'react';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { Car as ModelCar } from '../../database/model/Car';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  About,
  Brand,
  CarImage,
  Container, 
  Details,
  Name,
  Period,
  Price,
  Rent,
  Type
} from './styles';

interface Props extends RectButtonProps {
  data: ModelCar;
}

export function Car({ data, ...rest }: Props) {
  const netInfo = useNetInfo();

  const theme = useTheme();

  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>R$ { netInfo.isConnected ? data.price : '...'}</Price>
          </Rent>

          <Type>
            <MotorIcon 
              width={RFValue(20)} 
              height={RFValue(20)} 
              fill={theme.colors.text_detail}
            />
          </Type>
        </About>
      </Details>

      <CarImage 
        resizeMode="contain" 
        source={{ uri: data.thumbnail }} 
      />
    </Container>
  );
}
