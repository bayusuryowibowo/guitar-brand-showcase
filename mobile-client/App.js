import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./screens/ProductListScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import { StatusBar } from "expo-status-bar";
import DetailProductScreen from "./screens/DetailProductScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerTransparent: true, headerShown: false }}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{
            headerTitle: "Home",
            headerShown: true,
            headerTitleAlign: "center",
            headerBackButtonMenuEnabled: false
          }}
        />
        <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <StatusBar style="auto" />
  );
}
