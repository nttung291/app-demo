import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MonoText } from './StyledText';
import env from '@/utils/env';
import { useAppColors } from '@/hooks';

export const EnvironmentIndicator = () => {
  const { colors } = useAppColors();
  
  // Only show in development and staging environments
  if (env.environment === 'production') {
    return null;
  }
  
  const backgroundColor = 
    env.environment === 'development' 
      ? '#3b82f6' // blue
      : '#f59e0b'; // amber
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <MonoText style={styles.text}>
        {env.environment.toUpperCase()}
      </MonoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    zIndex: 999,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
