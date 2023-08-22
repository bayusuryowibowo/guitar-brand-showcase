import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
// import Images from "../constants/Images";

// const { height, width } = Dimensions.get("screen");

export default function OnboardingScreen({ navigation }) {
  const getStartClick = () => {
    navigation.replace("ProductList");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {/* <ImageBackground
        source={Images.Onboarding}
        style={{ height, width, position: "absolute" }}
      /> */}
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <Image
          style={{ width: 300, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://media.sweetwater.com/m/header/logo/sweetwater-logo.png?width=570&quality=90",
          }}
        />
        <Pressable
          onPress={getStartClick}
          style={{ backgroundColor: "#0d6efd", padding: 10, borderRadius: 15, paddingHorizontal: 20 }}
        >
          <Text style={{ fontSize: 25, color: "white" }}>GET STARTED</Text>
        </Pressable>
      </View>
    </View>
  );
}
