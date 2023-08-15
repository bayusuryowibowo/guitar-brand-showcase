import { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import MyCard from "../components/MyCard";
import styles from "../style.js";

const baseUrl = "https://sweetwater.bayusuryowibowo.xyz/pub";

export default function ProductListScreen({ navigation }) {
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
    <View style={styles.cardContainer}>
      <FlatList
        style={styles.cardScrollView}
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity style={{marginVertical: 5}} onPress={() => navigation.navigate("DetailProduct", {
            id: item.id
          })}>
            <MyCard item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
