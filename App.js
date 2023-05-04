import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { runPracticeDayjs } from './src/pratice-dayjs';
import { getCalendarColumns, getDayColor, getDayText } from './src/util';
import dayjs from "dayjs";

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const Column = ({ text, color, opacity }) => {

    return (
      <View style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color, opacity }}>{text} </Text>
      </View>      
    );
  };

  const ListHeaderComponent = () => {
    <View>
      { /* YYYY MM DD */ }
      {[0, 1, 2, 3, 4, 5, 6].map(day => {
        const dateText = getDayText(day);
        const color = getDayColor(day);

        return (
          <Column text={dateText} color={color} opacity={1} />
        )
      })}
    </View>
  };

  const renderItem = ({ item: date }) =>  {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(now, 'month');

    return (
      <Column text={dateText} color={color} opacity={isCurrentMonth ? 1 : 0.4} />
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
        ListHeaderComponent={ListHeaderComponent}
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
