import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Toast from "react-native-toast-message"
import ToastConfigParams from "./src/toast/ToastConfigParams"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./src/redux/store"
import { LoginStack, MainStack } from "./src/navigation/StackNavigation"
import { useSelector } from "react-redux"

const Stack = createNativeStackNavigator()

const Navigators = () => {
  const user = useSelector((state) => state.user?.currentUser)



  return (
    <NavigationContainer>
      {user ? <MainStack /> : <LoginStack />}
      <Toast config={ToastConfigParams} />
    </NavigationContainer>
  )
}


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigators />
      </PersistGate>
    </Provider>
  )
}

export default App
