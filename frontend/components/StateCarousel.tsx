import { FC, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { PageIndicator } from 'react-native-page-indicator';
import { AntDesign } from '@expo/vector-icons';
import { cardMargin, cardWidth } from '../constants';
import { StateCard } from './StateCard';

interface StateCarouselProps {
  data: string[];
}

export const StateCarousel: FC<StateCarouselProps> = ({ data }) => {
  const { width } = useWindowDimensions();
  const pageSize = cardWidth + cardMargin * 2;
  const totalWidth = pageSize * data.length;
  const scrollX = useRef(new Animated.Value(0)).current;
  const indicatorCount = data.length < 10 ? data.length : 10;
  const animatedCurrent = useRef(
    Animated.divide(
      Animated.multiply(
        scrollX,
        totalWidth / (totalWidth - (indicatorCount / data.length) * width),
      ),
      pageSize * (data.length / indicatorCount),
    ),
  ).current;

  const [selectedState, setSelectedState] = useState<string>('');

  return (
    <>
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.cardContainer}>
              <StateCard
                state={item}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
            </View>
          )}
        />
      </View>
      <View style={styles.indicatorContainer}>
        <AntDesign name="left" size={16} />
        <PageIndicator
          count={indicatorCount}
          current={animatedCurrent}
          variant="beads"
          size={8}
          scale={1}
          gap={12}
          opacity={0.2}
        />
        <AntDesign name="right" size={16} />
      </View>
      {selectedState && (
        <View style={styles.selectionContainer}>
          <Text style={{ fontSize: 28 }}>Selected State:</Text>
          <Text style={{ fontSize: 32, fontWeight: '500' }}>
            {selectedState}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 120,
    marginTop: 20,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: cardMargin,
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  selectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
