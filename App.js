import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FetchPrizes from "./src/screens/home";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Define your screens here */}
        {/* Example: <Stack.Screen name="Home" component={HomeScreen} /> */}
        <Stack.Screen name="Home" component={FetchPrizes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
