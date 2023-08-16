import {
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import Images from "../constants/Images";

const { height, width } = Dimensions.get("screen");

export default function OnboardingScreen({ navigation }) {
  const getStartClick = () => {
    navigation.replace("ProductList")
  } 

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ImageBackground
        source={Images.Onboarding}
        style={{ height, width, position: "absolute" }}
      />
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <Text style={{ backgroundColor: "white" }}>SWEETWATER (Brand Logo)</Text>
        <Text style={{ backgroundColor: "white" }}>TEXT PANJANG</Text>
        <Pressable onPress={getStartClick} style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}>
          <Text>GET STARTED</Text>
        </Pressable>
      </View>
    </View>
  );
}
