import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  Pressable,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../assets/colors"

function Inpupass({
  placeholder,
  funk,
  value,
  onBlur,
  styleTextBox,
  maxLength,
  keyboardType,
  secureTextEntry,
  onPress,
  showPassword,
}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        width: "90%",
        marginVertical: 4,
      }}
    >
      <View style={styles.viewall}>
        <View style={styles.textveu}>
          <Text>
            <Ionicons
              name={"lock-closed-outline"}
              size={24}
              color="white"
            />
          </Text>
          <TextInput
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            maxLength={maxLength}
            onChangeText={funk}
            onBlur={onBlur}
            style={[styles.infoInput, styleTextBox]}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor="#cccccc"
            value={value}
          ></TextInput>
        </View>
        <View
          style={{
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Pressable onPress={onPress}>
            <Text>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="#cccccc"
              />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Inpupass

const styles = StyleSheet.create({
  viewall: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  infoInput: {
    flex: 1,
    fontSize: 13,
    color: "white",
    paddingLeft: 10,
    height: "100%",
  },
  textveu: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    flex: 1,
    borderWidth: 4,
    borderRadius: 1000,
    borderColor: colors.background[1],
    backgroundColor: colors.background[2],
  },
})
