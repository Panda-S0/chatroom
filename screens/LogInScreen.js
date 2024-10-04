import { useEffect, useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import Inputext from "../components/inputext"
import Inpupass from "../components/inputpass.js"
import colors from "../assets/colors.js"
import CoolButton from "../components/CoolButton.js"
import { signIn } from "../components/authcontext.js"
import Loading from "../components/Loading.js"

const space =
  "                                                                                                    "

function LogInScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentUserName, setCurrentUserName] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [currentUser] = useState({
    username: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  function addUserName(Content) {
    setCurrentUserName(Content)
    currentUser.username = Content
  }

  function addPassword(Content) {
    setCurrentPassword(Content)
    currentUser.password = Content
  }

  function SignUp() {
    navigation.navigate("SignUpScreen")
  }

  const handleSignIn = async () => {
    if (currentUser.username != "" && currentUser.password != "") {
      setIsLoading(true)
      let response = await signIn(
        currentUser.username,
        currentUser.password
      )
      setIsLoading(false)
      if (response.success) {
        // console.log("loged in")
      } else {
        Alert.alert("Sign In error", response.msg, [{ text: "OK" }])
      }
    } else {
      Alert.alert("Sign In error", "Input empty", [{ text: "OK" }])
    }
  }

  if (isLoading) {
    return (
        <Loading/>
    )
  }

  return (
    <ScrollView style={styles.mainView}>
      <KeyboardAvoidingView
        style={styles.keyboardavoidingView}
        behavior="position"
      >
        <View style={styles.innerView}>
          <Text style={styles.texts}>Log In</Text>
          <Inputext
            placeholder="Email"
            funk={addUserName}
            value={currentUserName}
          />
          <Inpupass
            secureTextEntry={!showPassword}
            placeholder="Password"
            funk={addPassword}
            value={currentPassword}
            showPassword={showPassword}
            onPress={handleTogglePasswordVisibility}
          />
          <View style={{ height: 20 }}></View>
          <CoolButton onPress={handleSignIn}>Log in</CoolButton>
          <View style={{ height: 40 }} />
          <View style={styles.textcontainer}>
            <Text style={styles.saparatext}>{space}</Text>
            <Text style={{ color: "#cccccc" }}>
              Don't have an account
            </Text>
            <Text style={styles.saparatext}>{space}</Text>
          </View>
          <CoolButton
            onPress={SignUp}
            btnclr={"white"}
            txtclr={colors.background[6]}
            btnStyle={styles.signBtn}
          >
            Sign up
          </CoolButton>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default LogInScreen

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  keyboardavoidingView: { flex: 1, paddingBottom: 20 },
  innerView: {
    alignItems: "center",
    marginTop: 100,
  },
  texts: { color: "white", fontSize: 18 },
  saparatext: {
    color: "#cccccc",
    textDecorationLine: "line-through",
    flex: 1,
  },
  textcontainer: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  signBtn: {
    width: "90%",
    flexDirection: "row",
  },
})
