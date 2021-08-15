import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import api from '../../services/api';
import { database } from '../../database';

import { Car as ModelCar } from '../../database/model/Car';

import { CarDTO } from '../../dtos/carDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import Logo from '../../assets/logo.svg';

import {
  CarList,
  Container, 
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const netInfo = useNetInfo();

  const navigation = useNavigation();

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      // Back-end -> App 
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api
        .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = response.data;

        return { changes, timestamp: latestVersion }
      },
      // App -> Back-end
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        
        await api.post('/users/sync', user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
  
        const  cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }

      } catch (error) {
        console.log(error);

      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCars();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
    
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          { !isLoading &&
            <TotalCars>Total de { cars.length } carros</TotalCars>
          }
        </HeaderContent>
      </Header>

      { isLoading
        ? <LoadAnimation />
        : <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
              <Car data={item} onPress={() => handleCarDetails(item)} />
            }
          />
      }
    </Container>
  );
}
