import { useEffect, useState } from "react";
import { Dimensions, FlatList, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import MyCard from "../components/MyCard";
import styles from "../style.js";
import BASE_URL from "../constants/baseUrl";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(BASE_URL + "/products", {
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
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      {/* <ImageBackground
        source={Images.Onboarding}
        style={{ height, width, position: "absolute" }}
      /> */}
      <View style={styles.cardContainer}>
        <FlatList
          style={styles.cardScrollView}
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginVertical: 5 }}
              onPress={() =>
                navigation.navigate("DetailProduct", {
                  id: item.id,
                })
              }
            >
              <MyCard item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
    // </SafeAreaView>
  );
}
