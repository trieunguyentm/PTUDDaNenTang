import { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from "react-native"
import { Dimensions } from "react-native"
import moment from "moment"

const screenHeight = Dimensions.get("window").height
const screenWidth = Dimensions.get("window").width

const Post = ({ Event, id }) => {
  const convertTime = (timestampStr) => {
    const timestampMoment = moment(timestampStr)
    const formattedTimestamp = timestampMoment.format("DD/MM/YYYY HH:mm:ss")
    return formattedTimestamp
  }

  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity style={styles.displayInfo}>
          <Image
            style={styles.userAvatar}
            source={{
              uri: Event.urlAvatar
                ? Event.urlAvatar
                : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.pngz",
            }}
          ></Image>

          <View style={(flexDirection = "column")}>
            <Text style={styles.userName}>
              {Event.displayName ? Event.displayName : Event.createdBy}
            </Text>
            <Text style={styles.time}>{convertTime(Event.createAt)}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>{Event.title}</Text>
      </View>
      <View>
        <Text style={styles.description}>{Event.description}</Text>
      </View>

      <View style={styles.PostImgContainer}>
        {Event?.images?.map((img, index) => (
          <TouchableOpacity style={{ flex: 1 }} key={index}>
            <Image
              style={styles.PostImage}
              source={{ uri: img }}
              key={index}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: screenWidth,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  displayInfo: {
    marginTop: 15,
    flexDirection: "row",
    resizeMode: "contain",
    height: screenHeight * 0.05,
    maxWidth: screenWidth * 0.6,
    paddingLeft: screenWidth * 0.025,
    marginBottom: screenHeight * 0.03,
  },
  userAvatar: {
    // resizeMode: "center",
    width: screenHeight * 0.06,
    height: screenHeight * 0.06,
    borderRadius: screenHeight * 0.03,
  },
  userName: {
    paddingLeft: 5,
    fontSize: 24,
  },
  time: {
    paddingLeft: 5,
    fontSize: 15,
  },
  PostImgContainer: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: "#cccccc",
    borderBottomColor: "#cccccc",
    marginBottom: 3,
  },

  PostImage: {
    height: 300,
    resizeMode: "cover",
  },
  Spacer: {
    width: screenWidth,
    backgroundColor: "#A8A3A3",
    height: screenHeight * 0.003,
  },
  description: {
    flex: 1,
    paddingLeft: screenWidth * 0.025,
    paddingRight: screenWidth * 0.025,
    fontSize: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: screenWidth * 0.025,
  },
  topNavigation: {
    flexDirection: "row",
    width: screenWidth,
  },
  manageButton: {
    marginLeft: "auto",
    paddingRight: screenWidth * 0.02,
  },
})

export default Post
