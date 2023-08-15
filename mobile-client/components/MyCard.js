import { Image, Text, View } from "react-native";
import styles from "../style";
// import { Avatar, Card } from "react-native-paper";

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function MyCard({ item }) {
  return (
    <View style={styles.card}>
      <Image src={item.mainImg} style={styles.card_mainImage} />
      <View style={styles.card_content}>
        <Text style={styles.card_text_title}>{item.name}</Text>
        <Text style={styles.card_text_price}>${item.price}</Text>
      </View>
    </View>
    // <Card>
    //   <Card.Cover source={{ uri: `${item.mainImg}` }} />
    //   <Card.Title
    //     title={item.name}
    //     subtitle={item.price}
    //     left={LeftContent}
    //   />
    // </Card>
  );
}
