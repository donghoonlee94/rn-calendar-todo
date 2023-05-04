import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { runPracticeDayjs } from './src/pratice-dayjs';
import { getCalendarColumns } from './src/util';
import dayjs from "dayjs";

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  useEffect(() => {
    console.log(columns)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
