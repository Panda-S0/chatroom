import { View, StyleSheet, TextInput, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../assets/colors"

function Inputext({
  style,
  placeholder,
  funk,
  value,
  onBlur,
  styleTextBox,
  maxLength,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <View style={[styles.viewall, style]}>
      <Text>
        <Ionicons name={"person-outline"} size={24} color="white" />
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
  )
}

export default Inputext

const styles = StyleSheet.create({
  viewall: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 60,
    width: "90%",
    marginVertical: 4,
    borderWidth: 4,
    borderRadius: 1000,
    borderColor: colors.background[1],
    backgroundColor: colors.background[2],
  },
  infoInput: {
    overflow: "hidden",
    paddingLeft: 10,
    flex: 1,
    fontSize: 13,
    color: "white",
    height: "100%",
  },
})
