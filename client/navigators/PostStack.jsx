import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsScreen from "../views/PostsScreen";
import CreatePostScreen from "../views/CreatePostScreen";
import PostDetailScreen from "../views/PostDetailScreen";

function PostStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Posts" component={PostsScreen} />
      <Stack.Screen name="AddPost" component={CreatePostScreen} />
      <Stack.Screen
        name="PostDetail"
        options={{ headerTitle: "Post Detail" }}
        component={PostDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default PostStack;
