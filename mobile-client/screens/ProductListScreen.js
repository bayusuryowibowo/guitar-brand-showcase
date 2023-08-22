import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MyCard from "../components/MyCard";
import styles from "../style.js";
import { gql, useQuery } from "@apollo/client";
import Loading from "../components/Loading";

export default function ProductListScreen({ navigation }) {
  const GET_PRODUCTS = gql`
    query getProducts {
      products {
        id
        mainImg
        name
        price
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return (
    <Loading />
  );
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <FlatList
          style={styles.cardScrollView}
          data={data.products}
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
  );
}
