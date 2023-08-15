import { Text, View } from "react-native";


export default function DetailProductScreen({ route }) {
  const { id } = route.params

  return (
    <View>
      <Text>Detail {id}</Text>
    </View>
  )
}