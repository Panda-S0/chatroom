import { useState } from "react"
import {
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native"

import Inputext from "../components/inputext"
import Inpupass from "../components/inputpass.js"
import CoolButton from "../components/CoolButton.js"
import { signUp } from "../components/authcontext.js"
import Loading from "../components/Loading.js"

function SignUpScreen() {
  // console.log("WE REACHED SIGN UP 👆")
  const [isLoading, setIsLoading] = useState(false)
  const [currentUsername, setCurrentUsername] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")
  const [currentEmail, setCurrentEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  useState("")

  const [currentUser] = useState({
    username: "",
    profileUrl: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  function addUsername(Content) {
    setCurrentUsername(Content)
    currentUser.username = Content
  }
  function addUrl(Content) {
    setCurrentUrl(Content)
    currentUser.profileUrl = Content
  }
  function addEmail(Content) {
    setCurrentEmail(Content)
    currentUser.email = Content
  }
  function addPassword(Content) {
    setCurrentPassword(Content)
    currentUser.password = Content
  }

  const handleSignUp = async () => {
    if (
      currentUser.username != "" &&
      currentUser.email != "" &&
      currentUser.password != ""
    ) {
      setIsLoading(true)
      let response = await signUp(
        currentUser.email,
        currentUser.password,
        currentUser.username,
        currentUser.profileUrl
      )
      setIsLoading(false)
      // console.log(response)
      if (response.success) {
        // console.log("SIGNED UP")
      } else {
        Alert.alert("SignUp error", response.msg, [{ text: "OK" }])
      }
    } else {
      Alert.alert("SignUp error", "Input empty", [{ text: "OK" }])
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
        behavior="padding"
      >
        <View style={styles.innerView}>
          <Inputext
            placeholder="Username"
            funk={addUsername}
            value={currentUsername}
          />
          <Inputext
            placeholder="profile url"
            funk={addUrl}
            value={currentUrl}
          />
          <Inputext
            placeholder="email"
            keyboardType="email-address"
            funk={addEmail}
            value={currentEmail}
          />
          <Inpupass
            secureTextEntry={!showPassword}
            placeholder="password"
            funk={addPassword}
            value={currentPassword}
            showPassword={showPassword}
            onPress={handleTogglePasswordVisibility}
          />
          <View style={{ height: 40 }} />
          <CoolButton onPress={handleSignUp}>Sign Up</CoolButton>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  keyboardavoidingView: { flex: 1, paddingBottom: 20 },
  innerView: {
    padding: 25,
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  presableView: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "orange",
  },
  riblClr: { color: "white" },
})
