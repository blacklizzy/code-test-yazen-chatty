import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/LoginScreen';
import { UserProvider } from './src/context/UserContext';
import { MessageShape, UserShape } from './src/types';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<UserShape | undefined>(undefined);

  return (
    <UserProvider value={{ user, setUser }}>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
