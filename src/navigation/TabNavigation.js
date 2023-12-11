import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Group from "../views/Group"
import Profile from "../views/Profile"
import { Ionicons } from "@expo/vector-icons"
import { FunctionStack, HomeStack, HomeTab, ProfileStack } from "./StackNavigation"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

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
        name="HomeTab"
        component={FunctionStack}
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
