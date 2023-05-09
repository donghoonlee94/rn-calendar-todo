import React from "react";
import { TextInput, View } from "react-native";
import { bottomSpace, ITEM_WIDTH } from "./util";

export default ({
  value, 
  onChangeText
}) => {
  return (
    <View style={{ marginBottom: bottomSpace }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={{
          width: ITEM_WIDTH,
          backgroundColor: 'yellow'
        }}
      />
    </View>
  )
};