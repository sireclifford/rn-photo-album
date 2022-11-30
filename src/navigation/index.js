import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Albums from '../components/Albums';
import SharedAlbum from '../components/SharedAlbum';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Albums" component={Albums} />
      <Stack.Screen name="Shared Album" component={SharedAlbum} />
    </Stack.Navigator>
  );
};

export default Navigator;