import { Image } from "expo-image"
import { useContext, useEffect, useState } from "react"
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { UserContext } from "../components/UserContext"
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { db, usersRef } from "../firebaseConfig"
import Loading from "../components/Loading"

const getRoomId = (id1, id2) => {
  const sorted = [id1, id2].sort()
  const roomId = sorted.join("-")
  return roomId
}
const formatDate = (date) => {
  var day = date.getDate()
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  var month = monthNames[date.getMonth()]
  var formattedDate = day + " " + month
  return formattedDate
}
const MessageItem = ({ userId, otherId, name, avatar, onPress }) => {
  const [lastMessages, setLastMessages] = useState(undefined)
  useEffect(() => {
    roomId = getRoomId(userId, otherId)
    const docRef = doc(db, "rooms", roomId)
    const messagesRef = collection(docRef, "messages")
    const q = query(messagesRef, orderBy("createdAt", "desc"))
    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data()
      })
      // console.log(allMessages)
      setLastMessages(allMessages[0] ? allMessages[0] : null)
    })
    return unsub
  }, [])
  const renderLastMessage = () => {
    if (typeof lastMessages == "undefined") return "Loading..."
    if (lastMessages) {
      if (userId == lastMessages.userId)
        return "You: " + lastMessages.text
      else {
        return lastMessages.text
      }
    } else {
      return "Say hi 👋"
    }
  }
  const renderTime = () => {
    if (lastMessages) {
      let date = lastMessages?.createdAt
      return formatDate(new Date(date?.seconds * 1000))
    }
  }
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
        transition={500}
        placeholder={require("../assets/defaultProfile.jpg")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{renderLastMessage()}</Text>
      </View>
      <Text style={styles.time}>{renderTime()}</Text>
    </TouchableOpacity>
  )
}

//MAIN FUNCITON
function HomePageScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const { user } = useContext(UserContext)
  useEffect(() => {
    // console.log("user in effect: ", JSON.stringify(user, null, 2))
    if (user?.userId || user?.uid) {
      getUsers()
    }
  }, [user])

  useEffect(() => {
    navigation.setOptions({
      animation: "fade_from_bottom",
    })
  }, [navigation])

  // console.log("UID: ",user?.uid)
  // console.log("USERID: ",user?.userId)

  const getUsers = async () => {
    const q = query(
      usersRef,
      where("userId", "!=", user.uid ? user.uid : user?.userId)
    )
    setIsLoading(true)
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() })
    })
    setUsers(data)
    setIsLoading(false)
    // console.log("GOT USERS: ", JSON.stringify(data, null, 2))
  }

  const handlePress = (item) => {
    // console.log("User Context: ",JSON.stringify(UserContext, null, 2))
    // console.log("Pressed:", item.username) // Handle the press action, such as navigation or showing a detail screen
    navigation.navigate("ChatroomScreen", {
      passedUser: item,
      currentUser: user,
    })
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <MessageItem
          userId={user?.userId}
          otherId={item.userId}
          name={item.username}
          message={item.message}
          time={item.time}
          avatar={item.profileUrl}
          onPress={() => handlePress(item)}
        />
      )}
      keyExtractor={(item, index) => index.toString()} // Use index as fallback
    />
  )
}

export default HomePageScreen

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  message: {
    color: "lightgray",
    fontSize: 14,
    marginTop: 4,
  },
  time: {
    color: "#999",
    fontSize: 12,
  },
})
