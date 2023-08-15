import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./screens/ProductListScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./style";
import { StatusBar } from "expo-status-bar";
import DetailProductScreen from "./screens/DetailProductScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{ headerTitle: "Guitar List", headerTitleAlign: "center" }}
          />
          <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
