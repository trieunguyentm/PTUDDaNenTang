import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TabNavigation from "./TabNavigation"
import SuccessRegister from "../views/SuccessRegister"
import SignIn from "../views/SignIn"
import SignUp from "../views/SignUp"
import VerifyOTP from "../views/VerifyOTP"
import ProfileDetail from "../views/ProfileDetail"
import Profile from "../views/Profile"

const Stack = createNativeStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="TabNavigation"
    >
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  )
}
const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={VerifyOTP}
        name="VerifyOTP"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SuccessRegister"
        component={SuccessRegister}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
export { MainStack, LoginStack, ProfileStack }
