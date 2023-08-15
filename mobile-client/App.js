import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyCard from "./components/MyCard";
import styles from "./style";

const baseUrl = "https://sweetwater.bayusuryowibowo.xyz/pub";

export default function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(baseUrl + "/products", {
        method: "GET",
      });
      if (!response.ok) throw response;
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.cardScrollView}>
        <View style={styles.cardContainer}>
          {products.map((item) => {
            return <MyCard key={item.id} item={item} />;
          })}
          {products.map((item) => {
            return <MyCard key={item.id} item={item} />;
          })}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
