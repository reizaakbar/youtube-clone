import { Button, Text } from "react-native";

function FollowButton({ followed, pressHandler }) {
  if (followed) {
    return <Text>Follows</Text>;
  } else {
    return <Button title="Follows" onPress={pressHandler} color="red" />;
  }
}

export default FollowButton;
