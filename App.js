import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar } from 'expo-status-bar';
import dayjs from "dayjs";

import { getCalendarColumns, getDayColor, getDayText } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list'
import Calendar from './Calendar';

export default function App() {
  const now = dayjs();

  const { selectedDate, isDatePickerVisible, showDatePicker, hideDatePicker, handleConfirm, add1Month, subtract1Month, setSelectedDate } = useCalendar(now);

  const { todoList } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressDate = setSelectedDate;


  useEffect(() => {
    console.log('selectedDate', selectedDate)
  }, [selectedDate])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c", }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
      <Calendar
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressDate={onPressDate}
        columns={columns}
      />

      <FlatList
        data={todoList}
        // ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item: todo }) => {
          return (
            <Text>{todo.content}</Text>
          )
        }}
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
