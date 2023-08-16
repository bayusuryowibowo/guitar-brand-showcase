import { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import BASE_URL from "../constants/baseUrl";
import styles from "../style";
import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

export default function DetailProductScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState({});

  const fetchDetailProduct = async (id) => {
    try {
      const response = await fetch(BASE_URL + `/products/${id}`, {
        method: "GET",
      });
      if (!response.ok) throw response;
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDetailProduct(id);
  }, [id]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.Onboarding}
        style={{ height, width, position: "absolute" }}
      />
      <View style={styles.container}>
        <View style={styles.container}>
          {/* {product.Images.map((el) => (
            <Image source={{ uri: el.imgUrl }} key={el.id} />
          ))} */}
        </View>
      </View>
    </View>
  )
}