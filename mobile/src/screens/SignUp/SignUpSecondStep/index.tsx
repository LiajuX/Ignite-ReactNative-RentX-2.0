import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  StatusBar,
  Alert, 
} from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
  Container, 
  Form, 
  FormTitle, 
  Header, 
  Steps, 
  Subtitle, 
  Title
} from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setCofirmPassword] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const theme = useTheme();
  
  const { user } = route.params as Params;
  
  function handleGoBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert('Informe a senha e confirme-a');
    }

    if (password !== confirmPassword) {
      return Alert.alert('As senhas não são iguais');
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: 'Agora é só fazer login',
        nextScreenRoute: 'SignIn',
      });
    })
    .catch((error) => {
      console.log(error)
      Alert.alert('Opa', 'Não foi possível cadastrar');
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <BackButton onPress={handleGoBack} />

            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua conta</Title>

          <Subtitle>
            Faça seu cadastro de{'\n'}forma rápida e fácil.
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              value={confirmPassword}
              onChangeText={setCofirmPassword}
            />

          </Form>

          <Button 
            title="Cadastrar"
            color={theme.colors.success}
            enabled={true}
            loading={false}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
