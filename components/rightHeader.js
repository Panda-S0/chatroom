import { StyleSheet, Text, View } from "react-native"
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu"
import { Ionicons } from "@expo/vector-icons"
import { Image } from "expo-image"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import colors from "../assets/colors"

function RightHeader({ profileName,profileUrl, onPress }) {
  const checkIfImageUrl = async (profileUrl) => {
    try {
      const response = await fetch(profileUrl, { method: "HEAD" }) // Use HEAD request to fetch only headers
      if (response.ok) {
        const contentType = response.headers.get("Content-Type")
        if (contentType && contentType.startsWith("image/")) {
          return true
        } else return false
      } else return false
    } catch (e) {
      return false
    }
  }

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <View style={styles.pfpname}>
          <Text style={styles.pfptxt}>{profileName}</Text>
          <Image
            source={
              checkIfImageUrl(profileUrl)
                ? { uri: profileUrl }
                : require("../assets/defaultProfile.jpg")
            }
            style={styles.avatar}
            transition={500}
            placeholder={require("../assets/defaultProfile.jpg")}
          /></View>
        </MenuTrigger>
        <MenuOptions
          customStyles={{ optionsContainer: styles.optionsContainer }}
        >
          <MenuOption onSelect={() => onPress()}>
            <View style={styles.menutileView}>
              <Text style={styles.text}>Sign Out</Text>
              <Ionicons
                name={"log-out-outline"}
                size={24}
                color="brown"
              />
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  )
}

export default RightHeader

const styles = StyleSheet.create({
  redText: { color: colors.background[0] },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  menutileView: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "brown",
    fontSize: hp(1.7),
    fontWeight: "bold",
  },
  optionsContainer: {
    borderRadius: 10,
    borderCurve: "continuous",
    marginTop: 40,
    marginLeft: -30,
    backgroundColor: "white",
  },pfpname:{
    flexDirection:"row",
    alignItems:"center"
  },pfptxt:{
    paddingRight:10,
    color:"white"
  }
})
