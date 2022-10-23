import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text } from "react-native";
import { Provider as PaperProvider, IconButton } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import NotesListScreen from "./NotesListScreen";
import NotesAddScreen from "./NotesAddScreen";

const StackNotes = createNativeStackNavigator();

export default function NotesNavigator() {
  return (
    <StackNotes.Navigator initialRouteName="NoteList">
      <StackNotes.Screen
        name="NotesList"
        component={NotesListScreen}
        options={({ navigation }) => ({
          title: "Note Pad",
        })}
      />
      <StackNotes.Screen
        name="NotesAdd"
        component={NotesAddScreen}
        options={{
          title: "Adicionando Nota",
        }}
      />
    </StackNotes.Navigator>
  );
}