import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar } from 'expo-status-bar';
import dayjs from "dayjs";
import { Ionicons } from '@expo/vector-icons'

import { getCalendarColumns, getDayColor, getDayText, ITEM_WIDTH, statusBarHeight } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list'
import Calendar from './src/Calendar';
import Margin from './src/Margin';
import AddTodoInput from './src/AddTodoInput';

export default function App() {
  const now = dayjs();

  const { selectedDate, isDatePickerVisible, showDatePicker, hideDatePicker, handleConfirm, add1Month, subtract1Month, setSelectedDate } = useCalendar(now);

  const { todoList, input, setInput } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressDate = setSelectedDate;

  const onPressAdd = () => {};

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressDate={onPressDate}
        columns={columns}
      />    
      <Margin height={15} />
      <View style={{ width: 4, height: 4, borderRadius: 4 / 2, backgroundColor: '#a3a3a3', alignSelf: 'center' }} />
      <Margin height={15} />
    </View>
  );

  const renderItem = ({ item: todo }) => {
    return (
      <View style={{ flexDirection: "row", width: ITEM_WIDTH, backgroundColor: todo.id % 2 === 0 ? 'pink' : 'lightblue', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 5, borderBottomWidth: 0.2, borderColor: '#a6a6a6' }}>
        <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>{todo.content}</Text>
        <Ionicons name="ios-checkmark" size={17} color={todo.isSuccess ? '#595959' : '#bfbfbf'} />
      </View>
    )
  };


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


      <FlatList
        contentContainerStyle={{ paddingTop: statusBarHeight }}
        data={todoList}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
      />

      <AddTodoInput
        value={input}
        onChangeText={setInput}
        placeholder={`${dayjs(selectedDate).format('MM.DD')}에 추가할 Todo`}
        onPressAdd={onPressAdd}
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
