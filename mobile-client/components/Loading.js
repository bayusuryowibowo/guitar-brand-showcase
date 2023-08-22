import { ActivityIndicator, View } from "react-native";
import styles from "../style";


export default function Loading() {
  return (
    <View style={[styles.container, styles.loading]}>
      <ActivityIndicator size="large" />
    </View>
  )
}