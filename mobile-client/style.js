import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardScrollView: {
    backgroundColor: "gray",
    paddingHorizontal: 20,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },
  card: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10
  },
  card_mainImage: {
    resizeMode: "contain",
    flex: 1
  },
  card_content: {
    flex: 2
  },
  card_text_title: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16
  },
  card_text_price: {
    flex: 1,
    fontWeight: "700",
    fontSize: 24,
    color: "#d71920"
  }
  
});

export default styles;