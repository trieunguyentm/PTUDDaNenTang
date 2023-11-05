import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TabNavigation from "./TabNavigation"
import SuccessRegister from "../views/SuccessRegister"
import SignIn from "../views/SignIn"
import SignUp from "../views/SignUp"
import VerifyOTP from "../views/VerifyOTP"


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
export { MainStack, LoginStack }