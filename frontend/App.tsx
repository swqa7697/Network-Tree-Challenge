import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { colors } from './constants';
import { StateCarousel } from './components/StateCarousel';

export default function App() {
  const [data, setData] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      // Hard coded url only for test
      const baseUrl =
        Platform.OS === 'android'
          ? 'http://10.0.2.2:3000'
          : 'http://localhost:3000';
      const res = await axios.get(`${baseUrl}/states`);
      setData(res.data?.states);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>State List in a Carousel</Text>
      </View>
      {data.length > 0 && <StateCarousel data={data} />}
    </SafeAreaView>
  );
}

/**
 * <View style={styles.indicatorContainer}>
        {Array.from({ length: indicatorCount }).map((_, idx) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (idx - 1) * pageSize,
              idx * pageSize,
              (idx + 1) * pageSize,
            ],
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={idx}
              style={{
                height: 8,
                width: 8,
                borderRadius: 8,
                backgroundColor: '#000',
                marginHorizontal: 10,
                opacity,
              }}
            />
          );
        })}
      </View>
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBg,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    marginTop: 60,
  },
  headerText: {
    fontSize: 30,
    fontWeight: '600',
  },
});
