import { StatusBar } from "expo-status-bar"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { SafeAreaView } from "react-native"
import { MenuProvider } from "react-native-popup-menu"
import { auth, db } from "./firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { UserProvider } from "./components/UserContext"

import colors from "./assets/colors"
import RightHeader from "./components/rightHeader"

import LogInScreen from "./screens/LogInScreen"
import SignUpScreen from "./screens/SignUpScreen"
import HomePageScreen from "./screens/HomePageScreen"
import ChatroomScreen from "./screens/ChatroomScreen"
import { sighOut } from "./components/authcontext"

const Stack = createNativeStackNavigator()

export default function App() {
  const [user, setUser] = useState(null)
  const [authed, setIsAuthed] = useState(undefined)
  useEffect(() => {
    const authChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthed(true)
        setUser(user)
        updateUserData(user.uid)
      } else {
        setIsAuthed(false)
        setUser(null)
      }
      // console.log(JSON.stringify(user, null, 2))
    })
    return authChange
  }, [])

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      let data = docSnap.data()
      setUser({
        ...user,
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      })
      // console.log("user in app: ", JSON.stringify(user, null, 2))
    }
  }

  if (!authed) {
    return (
      <>
        <StatusBar style="dark" />
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: colors.background[2] },
                headerTitleStyle: { color: "white" },
                contentStyle: { backgroundColor: colors.background[4] },
              }}
            >
              <Stack.Screen name="LogInScreen" component={LogInScreen} />
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </>
    )
  } else {
    return (
      <MenuProvider>
        <UserProvider user={user}>
          <StatusBar style="dark" />
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: colors.background[2] },
                  headerTitleStyle: { color: "white" },
                  contentStyle: { backgroundColor: colors.background[4] },
                }}
              >
                <Stack.Screen
                  name="HomePageScreen"
                  component={HomePageScreen}
                  options={() => ({
                    animation: "fade_from_bottom", 
                    title: "chats",
                    headerRight: () => (
                      <RightHeader
                        onPress={sighOut}
                        profileUrl={user?.profileUrl}
                        profileName={user?.username}
                      ></RightHeader>
                    ),
                  })}
                />
                <Stack.Screen
                  name="ChatroomScreen"
                  component={ChatroomScreen}
                  options={() => ({
                    animation: "fade_from_bottom", // Slide in from right
                  })}
                />
              </Stack.Navigator>
            </SafeAreaView>
          </NavigationContainer>
        </UserProvider>
      </MenuProvider>
    )
  }
}
