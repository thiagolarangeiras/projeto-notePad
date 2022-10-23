import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import LoginScreen from "./screens/login/LoginScreen";
import SinginScreen from "./screens/login/SinginScreen";
import Notesnavigator from "./screens/lista/NotesNavigator"

const StackLogin = createNativeStackNavigator();

export default function App() {
  const [ userId, setUserId] = useState(null);
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackLogin.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <StackLogin.Screen name="Login" component={LoginScreen}/>
          <StackLogin.Screen name="Singin" component={SinginScreen}/>
          <StackLogin.Screen name="NotesNavigator" component={Notesnavigator}/>
        </StackLogin.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
