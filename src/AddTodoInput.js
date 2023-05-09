import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { bottomSpace, ITEM_WIDTH } from "./util";

export default ({
  value, 
  onChangeText,
  placeholder,
  onPressAdd
}) => {
  return (
    <View style={{ width: ITEM_WIDTH, marginBottom: !!bottomSpace ? bottomSpace : 25 , flexDirection: 'row', alignItems: "center" }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          flex: 1,
          backgroundColor: 'yellow',
          padding: 5,
          paddingBottom: 10
        }}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <AntDesign name="plus" size={18} color="#595959" />
      </TouchableOpacity>
    </View>
  )
};