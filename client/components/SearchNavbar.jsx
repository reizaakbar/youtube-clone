import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import styles from "../utils/styles";

export default function SearchNavbar() {
  return (
    <View style={styles.postsNavbar}>
      <Searchbar style={{ width: 250 }} placeholder="Search User" />
    </View>
  );
}
