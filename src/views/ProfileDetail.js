import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
} from "react-native"
import React from "react"
import { Dimensions } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import ProfileProperties from "../component/ProfileProperties"
import ProfilePassword from "../component/ProfilePassword"
import { Ionicons } from "@expo/vector-icons" // Import Ionicons or any other icon library
import { useSelector } from "react-redux"
import { userRequest } from "../api/requestMethod"

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const renderScene = SceneMap({
  profile: ProfileProperties,
  changePassword: ProfilePassword,
})

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderIcon={({ route, focused }) => (
      <Ionicons
        name={route.key === "profile" ? "person" : "lock-closed-sharp"} // Use the appropriate icon name
        size={24}
        color={focused ? "black" : "#A9A9A9"}
      />
    )}
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{ color: focused ? "black" : "#A9A9A9", fontWeight: "bold" }}
      >
        {route.title}
      </Text>
    )}
    scrollEnabled={false}
    style={{
      backgroundColor: "white",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    }}
    indicatorStyle={{ borderBottomColor: "black", borderBottomWidth: 2 }}
  />
)

const ProfileDetail = () => {
  const user = useSelector((state) => state.user?.currentUser)
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "profile", title: "Profile" },
    { key: "changePassword", title: "Password" },
  ])

  const [point, setPoint] = React.useState()

  React.useEffect(() => {
    const getPoint = async () => {
      try {
        const res = await userRequest.get(`user/getTotalPoint/${user.username}`)
        setPoint(res.data.point)
        console.log(res.data.point)
      } catch (error) {
        console.log(error)
      }
    }
    getPoint()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.contentHeader}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                accessibilityLabel="User Image"
                source={{
                  uri: user.urlAvatar
                    ? `${user.urlAvatar}`
                    : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.pngz",
                }}
                // resizeMode="contain"
              />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.textName}>
                {user.displayName ? user.displayName : user.username}
              </Text>
              <Text style={styles.textEmail}>{user.gmail}</Text>
              <Text style={styles.textEmail}>Điểm : {point}</Text>
            </View>
          </View>
          <View style={styles.contentDetail}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: screenWidth }}
              renderTabBar={renderTabBar}
              swipeEnabled={false}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default ProfileDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    overflow: "scroll",
    backgroundColor: "dodgerblue",
    height: screenHeight,
  },
  contentHeader: {
    height: "20%",
    width: "100%",
    paddingLeft: 0.03 * screenWidth,
    paddingRight: 0.03 * screenWidth,
    flexDirection: "row",
  },
  imageContainer: {
    backgroundColor: "#F89E90",
    width: 0.35 * screenWidth,
    height: 0.35 * screenWidth,
    borderRadius: 30,
    alignItems: "center",
    zIndex: 9,
    padding: 3,
    marginTop: 0.02 * screenHeight,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  detailContainer: {
    marginTop: 0.02 * screenHeight,
    marginLeft: 0.02 * screenWidth,
    width: "100%",
  },
  textName: {
    fontSize: 30,
    width: 0.65 * screenWidth,
    color: "white",
    fontWeight: "bold",
  },
  textEmail: {
    width: 0.7 * screenWidth,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  contentDetail: {
    backgroundColor: "white",
    height: "80%",
    width: "100%",
    alignSelf: "flex-end",
    borderRadius: 50,
  },
})
