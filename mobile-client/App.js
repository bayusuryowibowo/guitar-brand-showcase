import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./screens/ProductListScreen";
import DetailProductScreen from "./screens/DetailProductScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Stack = createNativeStackNavigator();
const client = new ApolloClient({
  uri: "https://sweetwater-ver2.bayusuryowibowo.xyz",
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
          <Stack.Screen
            name="DetailProduct"
            component={DetailProductScreen}
            options={{ headerTransparent: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
