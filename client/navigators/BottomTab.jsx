import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchUserScreen from "../views/SearchUserScreen";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ProfileScreen from "../views/ProfileScreen";

import PostStack from "./PostStack";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Users") {
            iconName = "users";
          } else if (route.name === "Profile") {
            iconName = "user-tie";
          }

          // You can return any component that you like here!
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={PostStack} />
      <Tab.Screen name="Users" component={SearchUserScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTab;
