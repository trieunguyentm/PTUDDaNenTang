import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../views/Home"
import Group from "../views/Group"
import Profile from "../views/Profile"
import { Ionicons } from "@expo/vector-icons"
import { ProfileStack } from "./StackNavigation"

export default function TabNavigation() {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          // tabBarStyle: { display: getTabBarVisibility(route) },
        })}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={({ route }) => ({
          tabBarLabel: "Group",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={24} color={color} />
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
            <Ionicons name="person" size={24} color={color} />
          ),
          // tabBarStyle: { display: getTabBarVisibility(route) },
        })}
      />
    </Tab.Navigator>
  )
}
