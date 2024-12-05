import React, { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native"
import Animated, {
  LightSpeedInLeft,
  LightSpeedInRight,
} from "react-native-reanimated"
import colors from "../assets/colors"
import { Image } from "expo-image"
import {
  setDoc,
  doc,
  Timestamp,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore"
import { db } from "../firebaseConfig"
import Loading from "../components/Loading.js"

const getRoomId = (id1, id2) => {
  const sorted = [id1, id2].sort()
  const roomId = sorted.join("-")
  return roomId
}

function ChatroomScreen({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false)
  const passedUser = route.params.passedUser
  const currentUser = route.params.currentUser
  let roomId = getRoomId(passedUser?.userId, currentUser?.userId)
  const textRef = useRef("")
  const inputRef = useRef(null)

  // console.log("PASSED USER: ", passedUser.username)
  // console.log("CURRENT USER: ", currentUser.username)
  useEffect(() => {
    navigation.setOptions({
      title: passedUser.username,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerRight: () => (
        <Image
          source={{ uri: passedUser.profileUrl }}
          style={styles.image}
          transition={500}
          placeholder={require("../assets/defaultProfile.jpg")}
        />
      ),
    })
  }, [navigation])

  useEffect(() => {
    creatRoomIfNotExists()
    const docRef = doc(db, "rooms", roomId)
    const messagesRef = collection(docRef, "messages")
    const q = query(messagesRef, orderBy("createdAt", "asc"))
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data()
      })
      setMessages([...allMessages])
    })
    return unsub
  }, [])

  const creatRoomIfNotExists = async () => {
    setIsLoading(true)
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    })
    setIsLoading(false)
  }

  const [messages, setMessages] = useState([])
  const flatListRef = useRef(null)

  const sendMessage = async () => {
    let message = textRef.current.trim()
    if (!message) return
    try {
      const docRef = doc(db, "rooms", roomId)
      const messagesRef = collection(docRef, "messages")
      if (inputRef) inputRef?.current?.clear()
      setIsLoading(true)
      const newDoc = await addDoc(messagesRef, {
        userId: currentUser.userId,
        text: message,
        profileUrl: currentUser?.profileUrl,
        senderName: currentUser?.username,
        createdAt: Timestamp.fromDate(new Date()),
      })
      setIsLoading(false)
      // console.log("new Message: ", newDoc.id)
    } catch (e) {
      // console.log("message: ", e.message)
    }
    // setMessages([...messages, newMessage])
    // setInputText("")

    // Scroll to the bottom when a new message is added
    flatListRef.current?.scrollToEnd({ animated: true })
  }

  const renderItem = ({ item }) => {
    const isMyMessage = item.userId === currentUser.userId
    // console.log("Message: ",messages[1].createdAt)
    return (
      <Animated.View
        entering={isMyMessage ? LightSpeedInRight : LightSpeedInLeft}
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </Animated.View>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              placeholder="Type a message"
              placeholderTextColor={"white"}
              style={styles.textInput}
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={styles.sendButton}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ChatroomScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-end", // Makes sure the input stays at the bottom
  },
  messageList: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: "75%",
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: colors.background[1],
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: colors.background[3],
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.background[4],
  },
  textInput: {
    color: "white",
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.background[2],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
})
