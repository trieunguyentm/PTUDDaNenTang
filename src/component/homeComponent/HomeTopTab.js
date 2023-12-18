import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity,View } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Feed from "./Feed";
import UserView from "../../views/UserView";
import { FontAwesome } from '@expo/vector-icons';
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const renderScene = SceneMap({
    home:Feed,
    profile:UserView
})

const renderTabBar = (props) => {
    const {navigationState} = props
    
    return (
        <View style={styles.tabBar}>
         {navigationState.routes.map((route,index) => {
            const isFocused = navigationState.index == index
           return (
             <TouchableOpacity
               key={index}
               style={isFocused ? styles.tabItem1 : styles.tabItem}
               onPress={() => props.jumpTo(route.key)}
             >
               <FontAwesome
                 name={route.icon}
                 size={22}
                 color={isFocused ? "#327fd2" : "black"}
               />
               <Text style={isFocused ? styles.text1 : styles.text}>
                 {route.title}
               </Text>
             </TouchableOpacity>
           )
         })}
       </View>
    )

}

const HomeTopTab =() => { 
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Yêu cầu mới nhất', icon:"newspaper-o" },
    { key: 'profile', title: 'Yêu cầu của bạn', icon:'user' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{ width: screenWidth }}
      swipeEnabled={false}
    />
  );
  


}

const styles = StyleSheet.create({
    tabBar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 0.06 * screenHeight,
        marginTop: 5,
        borderBottomColor: "#E8E9EB",
        borderBottomWidth: 1,
        marginHorizontal: 0.025 * screenWidth,
      },
      tabItem: {
        backgroundColor: "#E8E9EB",
        borderRadius: 20,
        height: 0.05 * screenHeight,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      },
      tabItem1: {
        backgroundColor: "#eef4fb",
        borderRadius: 20,
        height: 0.05 * screenHeight,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      },
      text: {
        fontWeight: "bold",
        marginLeft: 5,
      },
      text1: {
        fontWeight: "bold",
        marginLeft: 5,
        color: "#327fd2",
      },
})

export default HomeTopTab
