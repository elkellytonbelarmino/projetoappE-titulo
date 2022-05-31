import React, { useState ,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet, Button, Modal } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { KeyboardAvoidingView, TextInput, Platform, Keyboard, Animated, TouchableOpacity, SafeAreaView } from 'react-native';
import TaskList from './src/index'
import { AsyncStorage } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}  options={{ title: 'Tribunal Superior Eleitoral' }} />
        <Stack.Screen name="Locais" component={Locais} options={{ title: 'Locais de Votação'}} />
        <Stack.Screen name="Acesso" component={Acesso} options={{ title: 'Acesso Para Cadastrados'}} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Registro de Novos Eleitores'}} />
        <Stack.Screen name="Realizado" component={Realizado} options={{ title: 'Sua Zona Eleitoral'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function HomeScreen({ navigation }) {
  
  const [offset, setOffset] =  useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity, setOpacity] =  useState(new Animated.Value(0));
  const [logo, setLogo] =  useState(new Animated.ValueXY({x: 250, y: 250}));

  

  useEffect(() => {
  keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);  
  Animated.parallel([
    Animated.spring(offset.y, {
      toValue: -25,
      speed: 50,
      bounciness: 15,
      duration: 2000,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
    })
  ]).start();
    
  }, []);


  //Teclado Aberto
  function keyboardDidShow () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: (Platform.OS === 'android' ? 70 : 90),
        duration: 100,
      }),
      Animated.timing(logo.x, {
        toValue: (Platform.OS === 'android' ? 70 : 90),
        duration: 100,
      }),
    ]).start();
  }

  //Teclado Fechou
  function keyboardDidHide () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: 250,
        duration: 1500,
      }),
      Animated.timing(logo.x, {
        toValue: 250,
        duration: 1500,
      }),
    ]).start();
  }

 return (
   <KeyboardAvoidingView  style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
     
     <View style={{flex:1, justifyContent: 'center'}}>
      <Animated.Image 
      style={[
        styles.logo,
        {
          width: logo.x,
          height: logo.y
        }
        ]} 
      source={require('./src/assets/logo.png')}
      />
    </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.titulo}>e-Título</Text>
    </View>
    

      <Animated.View 
      style={[
         styles.container,
        {
          opacity: opacity,
          transform: [
            { translateY: offset.y}
          ],
        },
        ]}
      >
        
        


        <View style={styles.input}>
          <Text style={styles.paragraph}></Text>
          <Button
        title="Consultar Locais de Votação"
        onPress={() => navigation.navigate('Locais')}
        />
         
        </View>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}></Text>
          <Button
        title="Status Titulo Eleitoral"
        onPress={() => navigation.navigate('Acesso')}
        />
        
        <Text style={styles.registerText}></Text>
          <Button
        title="Cadastro titulo eleitoral 16+"
        onPress={() => navigation.navigate('Register')}
        />
        </TouchableOpacity>
        

        </Animated.View>

        
     
   </KeyboardAvoidingView>
  );
}

function Locais() {
  return (
     
    <View style={styles.background}>
      <Text style={styles.submitText}>ZONA: 01ª - JOÃO PESSOA - PB</Text>      
      <Text style={styles.submitText}>ZONA: 02ª - SANTA RITA - PB </Text>
      <Text style={styles.submitText}>ZONA: 03ª - SANTA RITA - PB</Text>
      <Text style={styles.submitText}>ZONA: 04ª - SAPÉ - PB</Text>
      <Text style={styles.submitText}>ZONA: 05ª - SANTA RITA - PB</Text>
      <Text style={styles.submitText}>ZONA: 06ª - ITABAIANA - PB</Text>
      <Text style={styles.submitText}>ZONA: 07ª - MAMANGUAPE - PB</Text>
      <Text style={styles.submitText}>ZONA: 08ª - INGÁ - PB</Text>
      <Text style={styles.submitText}>ZONA: 09ª - ALAGOA GRANDE - PB</Text>
      <Text style={styles.submitText}>ZONA: 10ª - GUARABIRA - PB</Text>
      </View>
      
  );
}


function Realizado() {
  return (
    <View style={styles.background}>
    <Text style={styles.registerText0}>Olá: teste</Text>
    <Text style={styles.registerText0}>Cpf: 12345678910</Text>
    <Text style={styles.registerText0}>Local de Votação: ZONA: 01ª</Text>
    <Text style={styles.registerText0}>Local: EMEF CASTRO ALVES</Text>
    <Text style={styles.registerText0}>Rua das camboquinhas, 552</Text>
    <Text style={styles.registerText0}>Bairro dos Cachacinhas</Text>
    <Text style={styles.registerText0}>JOÃO PESSOA - PB</Text>
    </View>
  );
}

function Acesso({ navigation }) {
  const [offset, setOffset] =  useState(new Animated.ValueXY({x: 0, y: 200}));
  const [opacity, setOpacity] =  useState(new Animated.Value(0));
  const [logo, setLogo] =  useState(new Animated.ValueXY({x: 340, y: 200}));

  useEffect(() => {
  keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);  
  Animated.parallel([
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 5,
      bounciness: 15,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
    })
  ]).start();
    
  },[]);

   //Teclado Aberto
  function keyboardDidShow () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: (Platform.OS === 'android' ? 25 : 10),
        duration: 100,
      }),
      Animated.timing(logo.x, {
        toValue: (Platform.OS === 'android' ? 70 : 90),
        duration: 100,
      }),
    ]).start();
  }

  //Teclado Fechou
  function keyboardDidHide () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: 200,
        duration: 50,
      }),
      Animated.timing(logo.x, {
        toValue: 340,
        duration: 50,
      }),
    ]).start();
  }



  return (
    
     /*aqui fica o ID do SQlite*/
    <View style={styles.background}>
    
    <Animated.Image 
      style={[
        styles.input,
        {
          width: logo.x,
          height: logo.y
        }
        ]} 
      source={require('./src/assets/patria.png')}
      />
      
      <TextInput
          style={styles.btnSubmit1}
          placeholder="Digite seu CPF"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={()=> {}}
        />

        <TouchableOpacity style={styles.paragraph}>
        <Button
        title="Consultar"
        onPress={() => navigation.navigate('Realizado')}
        />
        </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function Register({ navigation }) {
  const [offset, setOffset] =  useState(new Animated.ValueXY({x: 0, y: 250}));
  const [opacity, setOpacity] =  useState(new Animated.Value(0));
  const [logo, setLogo] =  useState(new Animated.ValueXY({x: 250, y: 145}));

  useEffect(() => {
  keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);  
  Animated.parallel([
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 5,
      bounciness: 15,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
    })
  ]).start();
    
  },[]);

   //Teclado Aberto
  function keyboardDidShow () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: (Platform.OS === 'android' ? 70 : 90),
        duration: 1000,
      }),
      Animated.timing(logo.x, {
        toValue: (Platform.OS === 'android' ? 70 : 90),
        duration: 100,
      }),
    ]).start();
  }

  //Teclado Fechou
  function keyboardDidHide () {
    Animated.parallel([
      Animated.timing(logo.y, {
        toValue: 145,
        duration: 50,
      }),
      Animated.timing(logo.x, {
        toValue: 250,
        duration: 50,
      }),
    ]).start();
  }

  return (
     /*aqui fica o ID do SQlite*/
    <View style={styles.background}>
    
    <Animated.Image 
      style={[
        styles.input,
        {
          width: logo.x,
          height: logo.y
        }
        ]} 
      source={require('./src/assets/tempoder.png')}
      />
    
      <TextInput
          style={styles.btnSubmit1}
          placeholder="CPF"
          autoCorrect={false}
          autoCapitalize="none"

          onPress={() => navigation.navigate('Realizado')}
        />

        <TextInput
          style={styles.btnSubmit1}
          placeholder="Nome Completo"
          autoCorrect={false}
          autoCapitalize="none"
          onPress={() => navigation.navigate('Realizado')}
        />

        <TextInput
          style={styles.btnSubmit1}       
          placeholder="Data de Nascimento"
          autoCorrect={false}
          autoCapitalize="none"
          onPress={() => navigation.navigate('Realizado')}
        />
        
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.registerText}></Text>
          <Button
        title="Cadastrar" onPress={(OnPressButton) => navigation.navigate('Realizado')} customClick={console.log()}/>
        </TouchableOpacity>
    </View>
  );
 }


const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1CD09E'//#1CD09E-32CD32-32CD55
  },
  logo:{
   marginTop: 200,
   width: '50%',
    height: 600,    
  },
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '',
    padding: 8,
    width: '80%',
    height: 600,
    borderRadius: 5,
    paddingBottom: 50,
  },
  input:{
    fontSize: 17,
    borderRadius: 7,
    width: '90%',
    marginBottom: 15,
  },
  btnSubmit:{
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#32CD32',
    height: 45,
    width: '90%',
    borderRadius: 7,
    marginTop: 10,
  },
  submitText:{
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 35,
    width: '90%',
    borderRadius: 7,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 25,
  },
  btnRegister:{
    marginTop: 18,
  },
  registerText:{
    color: '#FFF',
  },
  registerText0:{
    color: 'white',
    marginTop: 18,
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  titulo:{
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 100,
  },
  btnSubmit1:{
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    backgroundColor: '#FFF',
    height: 45,
    width: '95%',
    borderRadius: 7,
    marginTop: 13,
    fontSize: 15,
    textAlign: 'center',
  },
  paragraph:{
    paddingTop: Constants.statusBarHeight,
  },
}); 