import { Image, Text, View } from "react-native";
import styles from "../style";

export default function MyCard({ item }) {
  return (
    <View style={styles.card}>
      <Image src={item.mainImg} style={styles.card_mainImage} />
      <View style={styles.card_content}>
        <Text style={styles.card_text_title}>{item.name}</Text>
        <Text style={styles.card_text_price}>${item.price}</Text>
      </View>
    </View>
  );
}
