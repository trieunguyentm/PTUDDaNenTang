import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Modal,
  PanResponder,
  ScrollView,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import React, { useState,useRef } from "react"
import { useNavigation } from '@react-navigation/native';
import TabViewGroup from "../component/TabViewGroup";

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const Group = () => {

  const [modalView,setModalView] = useState(false)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 30) {
          setModalView(false);
        }
      },
      onPanResponderRelease: () => {
        // Thực hiện bất kỳ xử lý sau khi người dùng thả tay
      },
    }),
  ).current
  const navigation = useNavigation()
  const handleCreate = () => {
    setModalView(false)
    navigation.navigate("CreateGroup")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.titleHeader}>Nhóm</Text>
            <View style={styles.btnHeaderContainer}>
              <TouchableOpacity
                style={styles.btnHeader}
                onPress={() => setModalView(true)}
              >
                <AntDesign name="pluscircle" size={28} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnHeader}>
                <FontAwesome name="search" size={28} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <TabViewGroup/>
          </View>
        </View>
      </SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={modalView}>
        <View style={styles.modalContainer}></View>
        <View style={styles.createGroupContainer} {...panResponder.panHandlers}>
          <View style={styles.createGroup}>
            <TouchableOpacity
              style={styles.btnHeaderGroup}
              onPress={handleCreate}
            >
              <AntDesign name="addusergroup" size={36} color="black" />
            </TouchableOpacity>
            <View style={styles.titleCreateContainer}>
              <Text style={styles.text1}>Tạo nhóm</Text>
              <Text style={styles.text2}>Tạo một cồng đồng dành cho bạn</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Group

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 0.07 * screenHeight,
    marginHorizontal: 0.025 * screenWidth,
  },
  titleHeader: {
    fontSize: 34,
    fontWeight: "bold",
  },
  btnHeaderContainer: {
    display: "flex",
    flexDirection: "row",
  },
  btnHeader: {
    borderRadius: 100,
    backgroundColor: "#E8E9EB",
    height: 0.11 * screenWidth,
    width: 0.11 * screenWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.2,
    position: "relative",
  },
  createGroupContainer: {
    height: 0.15 * screenHeight,
    width: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0,
    shadowRadius: 13.16,

    elevation: 1,
    zIndex: 99,
  },
  createGroup: {
    display: "flex",
    flexDirection: "row",
    padding: 30,
  },
  btnHeaderGroup: {
    borderRadius: 100,
    backgroundColor: "#E8E9EB",
    height: 0.15 * screenWidth,
    width: 0.15 * screenWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    alignSelf: "center",
  },
  titleCreateContainer: {
    marginLeft: 0.05 * screenWidth,
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
    color: "grey",
  },
  cardContainer: {
    flex : 1,
  },
})
