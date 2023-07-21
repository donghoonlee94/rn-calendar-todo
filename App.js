import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Pressable, Keyboard, Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StatusBar } from 'expo-status-bar';
import dayjs from "dayjs";
import { Ionicons } from '@expo/vector-icons'

import { bottomSpace, getCalendarColumns, getDayColor, getDayText, ITEM_WIDTH, statusBarHeight } from './src/util';
import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list'
import Calendar from './src/Calendar';
import Margin from './src/Margin';
import AddTodoInput from './src/AddTodoInput';

export default function App() {
  const now = dayjs();

  const { selectedDate, isDatePickerVisible, showDatePicker, hideDatePicker, handleConfirm, add1Month, subtract1Month, setSelectedDate } = useCalendar(now);

  const { filteredTodoList, todoList, input, setInput, addTodo, toggleTodo, removeTodo, resetInput } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month;
  const onPressRightArrow = add1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressDate = setSelectedDate;

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);    
  };

  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };

  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };

  const onFocus = () => {
    scrollToEnd();
  };

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
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?', '', [
        {
          style: 'cancel',
          text:'아니요'
        },
        {
          text: '네',
          onPress: () => removeTodo(todo.id),
        }
      ]);
    };

    return (
      <Pressable 
        style={{ flexDirection: "row", width: ITEM_WIDTH, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 5, borderBottomWidth: 0.2, borderColor: '#a6a6a6' }}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>{todo.content}</Text>
        <Ionicons name="ios-checkmark" size={17} color={todo.isSuccess ? '#595959' : '#bfbfbf'} />
      </Pressable>
    )
  };


  useEffect(() => {
    console.log('selectedDate', selectedDate)
  }, [selectedDate])

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={{ uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c", }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />


      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <>
          <FlatList
            ref={flatListRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingTop: statusBarHeight + 30 }}
            data={filteredTodoList}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('MM.DD')}에 추가할 Todo`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />        
        </>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace} />
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />      
    </Pressable>
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
