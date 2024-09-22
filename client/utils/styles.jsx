import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postHeaderDetails: {
    marginLeft: 10,
  },
  postAuthorName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  postAuthorHandle: {
    color: "gray",
    fontSize: 14,
  },
  postContent: {
    fontSize: 14,
    textAlign: "justify",
    marginBottom: 10,
  },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  postStat: {
    color: "gray",
    fontSize: 12,
  },
  postTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  postTag: {
    marginHorizontal: 5,
    marginTop: 5,
  },
  postDivider: {
    marginVertical: 10,
  },
  postButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;
