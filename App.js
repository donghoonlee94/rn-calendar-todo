import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { runPracticeDayjs } from './src/pratice-dayjs';
import { getCalendarColumns, getDayColor, getDayText } from './src/util';
import dayjs from "dayjs";
import Margin from './src/Margin';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from './src/hook/use-calendar';

export default function App() {
  const now = dayjs();

  const { selectedDate, isDatePickerVisible, showDatePicker, hideDatePicker, handleConfirm, add1Month, subtract1Month, setSelectedDate } = useCalendar(now);

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;

  const onPressRightArrow = add1Month;

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

          <TouchableOpacity onPress={showDatePicker}>
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
    const onPress = () => {
      setSelectedDate(date);
    };
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

  useEffect(() => {
    console.log('selectedDate', selectedDate)
  }, [selectedDate])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c", }}
      />
      <FlatList 
        contentContainerStyle={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
        data={columns}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
