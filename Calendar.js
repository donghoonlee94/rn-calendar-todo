import React from "react";
import { FlatList, View, TouchableOpacity, Text } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { getDayColor, getDayText } from './src/util';
import dayjs from "dayjs";
import Margin from './src/Margin';
import { SimpleLineIcons } from '@expo/vector-icons'; 


const statusBarHeight = getStatusBarHeight(true);



export default ({ selectedDate, onPressLeftArrow, onPressRightArrow, onPressHeaderDate, onPressDate, columns }) => {
  const Column = ({ text, color, opacity, disabled, onPress, isSelected }) => {

    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: isSelected ? "#c2c2c2" : 'transparent', borderRadius: 17.5 }}>
        <Text style={{ color, opacity }}>{text} </Text>
      </TouchableOpacity>      
    );
  };

  const ArrowButton = ({ iconName, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <SimpleLineIcons name={iconName} size={15} color="#404040" />
      </TouchableOpacity>
    )
  }

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD');

    return (
      <View>
        <Margin height={15} />

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} />

          <TouchableOpacity onPress={onPressHeaderDate}>
            <Text style={{ fontSize: 20, color: "#404040" }}>{currentDateText}</Text>
          </TouchableOpacity>

          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} />
        </View>

        <Margin height={15} />

        <View  style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dateText = getDayText(day);
            const color = getDayColor(day);

            return (
              <Column key={`day-${day}`} text={dateText} color={color} opacity={1} disabled />
            )
          })}
        </View>
      </View>      
    )
  };

  const renderItem = ({ item: date }) =>  {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const onPress = () => onPressDate(date)
    const isSelected = dayjs(date).isSame(selectedDate, 'date');

    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
      />
    )
  }
  
  return (
    <FlatList 
      contentContainerStyle={{ paddingTop: statusBarHeight }}
      scrollEnabled={false}
      data={columns}
      keyExtractor={(_, index) => `column-${index}`}
      numColumns={7}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
    />
  )
}
