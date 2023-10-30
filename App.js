import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignIn from "./src/views/SignIn"
import SignUp from "./src/views/SignUp"
import VerifyOTP from "./src/views/VerifyOTP"

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }} // Ẩn header trên trang SignIn
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }} // Ẩn header trên trang SignUp
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTP}
          options={{ headerShown: true }} // Hiển thị header trên trang VerifyOTP
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
