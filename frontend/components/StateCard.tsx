import { FC } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cardHeight, cardRadius, cardWidth, colors } from '../constants';

interface StateCardProps {
  state: string;
  selectedState: string;
  setSelectedState(state: string): any;
}

export const StateCard: FC<StateCardProps> = ({
  state,
  selectedState,
  setSelectedState,
}) => {
  const toggleSelection = () => {
    if (state === selectedState) {
      setSelectedState('');
    } else {
      setSelectedState(state);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor:
          state === selectedState ? colors.cardSelected : colors.cardNormal,
      }}
    >
      <Pressable style={styles.button} onPress={toggleSelection}>
        <Text style={styles.btnText}>{state}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: cardHeight,
    width: cardWidth,
    borderRadius: cardRadius,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  btnText: {
    fontSize: 16,
  },
});
