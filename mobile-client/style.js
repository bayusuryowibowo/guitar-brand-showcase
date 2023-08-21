import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardScrollView: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 5
  },
  card: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  card_mainImage: {
    width: 300,
    height: 300,
    borderRadius: 10
  },
  card_content: {
    flex: 1,
    padding: 5
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
    color: "#d71920",
    alignSelf: "flex-end"
  },
  loading: {
    justifyContent: "center"
  },
  imageRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    marginHorizontal: 10,
    gap: 5
  },
  imageColumn: {
    flex: 1,
    flexDirection: "column",
    gap: 4,
    alignItems: "center"
  },
  smallImage: {
    borderColor: "transparent",
    borderWidth: 2,
  },
  activeSmallImage: {
    borderColor: "#2e68a9",
  },
  
});

export default styles;