import { StyleSheet, View, SafeAreaView } from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import LottieView from "lottie-react-native"
function Loading() {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <View style={styles.load}>
        <LottieView
          style={{ flex: 1 }}
          source={require("../assets/loadingAnimation.json")}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  )
}

export default Loading

const styles = StyleSheet.create({
  load: { width: wp(60), aspectRatio: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
})
