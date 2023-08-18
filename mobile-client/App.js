import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./screens/ProductListScreen";
import DetailProductScreen from "./screens/DetailProductScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: "https://3b23-202-46-68-112.ngrok-free.app",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
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
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen name="DetailProduct" component={DetailProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
