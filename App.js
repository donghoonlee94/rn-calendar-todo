import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { runPracticeDayjs } from './src/pratice-dayjs';
import { getCalendarColumns } from './src/util';
import dayjs from "dayjs";

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const renderItem = ({ item: date }) =>  {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b';
    const isCurrentMonth = dayjs(date).isSame(now, 'month');

    return (
      <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color, opacity: isCurrentMonth ? 1 : 0.4 }}>{dateText} </Text>
      </View>
    )
  }

  useEffect(() => {
    console.log(columns)
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        contentContainerStyle={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
        data={columns}
        numColumns={7}
        renderItem={renderItem}
      />
    </SafeAreaView>
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
