import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns/esm';
import { useNetInfo } from '@react-native-community/netinfo';

import { CarDTO } from '../../dtos/carDTO';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import api from '../../services/api';

import {
  Accessories,
  Brand,
  CalendarIcon,
  CarImages,
  Container, 
  Content, 
  DateInfo, 
  DateTitle, 
  DateValue, 
  Description, 
  Details, 
  Footer, 
  Header,
  Name,
  Period,
  Price,
  Rent,
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriodProps {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps);
  const [isLoading, setIsLoading] = useState(false);

  const netInfo = useNetInfo();

  const navigation = useNavigation();
  const route = useRoute();
  
  const theme = useTheme();
  
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setIsLoading(true);

    await api.post('/rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    })    
    .then(() => {
      navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: 'Agora voc?? s?? precisa ir at?? a concession??ria da RENTX pegar o seu autom??vel',
        nextScreenRoute: 'Home',
      })
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error)
      Alert.alert('N??o foi poss??vel confirmar o agendamento');
    })
  }
  
  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);

      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar 
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={
            !!carUpdated.photos ? 
            carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
          } 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{ car.brand }</Brand>
            <Name>{ car.name }</Name>
          </Description>

          <Rent>
            <Period>{ car.period }</Period>
            <Price>R$ { car.price }</Price>
          </Rent>
        </Details>

        { 
          carUpdated.accessories &&
          <Accessories>
            {
              carUpdated.accessories.map(accessory => (
                <Accessory
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))  
            }
          </Accessories>
        }

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.background_secondary}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{ rentalPeriod.start }</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(12)}
            color={theme.colors.text_detail}
          />

          <DateInfo>
            <DateTitle>AT??</DateTitle>
            <DateValue>{ rentalPeriod.end }</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>

          <RentalPriceDetails>
            <RentalPriceQuota>
              {`R$ ${ car.price } x${ dates.length } di??rias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ { rentTotal }</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success}
          enabled={!isLoading}
          loading={isLoading}
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
