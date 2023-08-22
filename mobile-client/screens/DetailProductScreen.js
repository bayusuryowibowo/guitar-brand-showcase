import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../style";
import { gql, useQuery } from "@apollo/client";
import Loading from "../components/Loading";

const GET_DETAIL_PRODUCT = gql`
  query getDetailProduct($productId: ID) {
    product(id: $productId) {
      name
      price
      description
      createdAt
      updatedAt
      Category {
        name
      }
      Images {
        id
        imgUrl
      }
      User {
        username
      }
    }
  }
`;

export default function DetailProductScreen({ navigation, route }) {
  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_DETAIL_PRODUCT, {
    variables: {
      productId: id,
    },
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    if (data && data.product) {
      const productName = data.product.name;
      const firstThreeWords = productName.split(" ").slice(0, 3).join(" ");
      navigation.setOptions({
        headerTitle: firstThreeWords,
      });
    }
  }, [data]);

  if (loading)
    return (
      <Loading />
    );
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <View style={{ marginTop: 35, flex: 5 }}>
          <Image
            source={{ uri: data.product.Images[selectedImageIndex].imgUrl }}
            style={{ height: 450, width: 300, resizeMode: "contain" }}
          />
          <ScrollView
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: "white",
              width: 300,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontWeight: "400", fontSize: 20 }}>Price :</Text>
              <Text
                style={{ fontWeight: "700", color: "#d71920", fontSize: 20 }}
              >
                ${data.product.price}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontWeight: "400", fontSize: 20 }}>
                Category :
              </Text>
              <Text style={{ fontWeight: "500", fontSize: 20 }}>
                {data.product.Category.name}
              </Text>
            </View>
            <View style={{ marginTop: 5, flexDirection: "column", gap: 5 }}>
              <Text style={{ fontWeight: "500", fontSize: 15 }}>
                {data.product.name}
              </Text>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>
                {data.product.description}
              </Text>
            </View>
            <View
              style={{
                marginTop: 5,
                flexDirection: "column",
                marginBottom: 10,
              }}
            >
              <Text>Created By : {data.product.User.username}</Text>
              <Text>
                Created At :{" "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                  timeStyle: "long",
                  timeZone: "Asia/Jakarta",
                }).format(new Date(data.product.createdAt))}
              </Text>
              <Text>
                Updated At :{" "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "full",
                  timeStyle: "long",
                  timeZone: "Asia/Jakarta",
                }).format(new Date(data.product.updatedAt))}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.imageColumn}>
          {data.product.Images.map((image, index) => (
            <TouchableOpacity
              key={image.id}
              onPress={() => handleImageClick(index)}
              style={[
                styles.smallImage,
                selectedImageIndex === index && styles.activeSmallImage,
              ]}
            >
              <Image
                source={{ uri: image.imgUrl }}
                style={{ height: 75, width: 50, resizeMode: "contain" }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
