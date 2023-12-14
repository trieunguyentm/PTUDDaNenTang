import React from "react"
import { Button } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TabNavigation from "./TabNavigation"
import SuccessRegister from "../views/SuccessRegister"
import SignIn from "../views/SignIn"
import SignUp from "../views/SignUp"
import VerifyOTP from "../views/VerifyOTP"
import ProfileDetail from "../views/ProfileDetail"
import Profile from "../views/Profile"
import Home from "../views/Home"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import CreatePost from "../views/CreatePost"

const Stack = createNativeStackNavigator()
const TopTab = createMaterialTopTabNavigator()


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

const FunctionStack = ({navigation,route}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
         name="Home"
         component={HomeTab}
         options={{headerShown:false}}/>
      <Stack.Screen
         name="Posting"
         component={CreatePost}
         options={({navigation,route})=>({
          headerRight: () => (
            <Button title="Upload"/>
          )
         })}
      />
    </Stack.Navigator>
  )
}

const HomeTab = ({route}) => {
  return (
    <TopTab.Navigator initialRouteName="News">
      <TopTab.Screen name="News" component={Home}/>
      <TopTab.Screen name="Events" component={Home}/>
    </TopTab.Navigator>

  )

}
export { MainStack, LoginStack, ProfileStack, HomeTab, FunctionStack }
