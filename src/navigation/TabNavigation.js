import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Group from "../views/Group"
import Profile from "../views/Profile"
import { Ionicons } from "@expo/vector-icons"
import { GroupStack, HomeStack, ProfileStack } from "./StackNavigation"
import { FontAwesome } from "@expo/vector-icons"
export default function TabNavigation() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
          marginTop: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
          // tabBarStyle: { display: getTabBarVisibility(route) },
        })}
      />
      <Tab.Screen
        name="GroupStack"
        component={GroupStack}
        options={({ route }) => ({
          tabBarLabel: "Group",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={22} color={color} />
          ),
          // tabBarStyle: { display: getTabBarVisibility(route) },
        })}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={({ route }) => ({
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={22} color={color} />
          ),
          // tabBarStyle: { display: getTabBarVisibility(route) },
        })}
      />
    </Tab.Navigator>
  )
}
