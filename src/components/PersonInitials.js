import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getRandomColor = () => {
    const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#2ecc71', '#34495e'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

const getInitials = (name) => {
  const names = name.split(' ');
  return names
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
};

export const PersonInitials = ({name}) => {
  return (
        <View
          style={[styles.circle, { backgroundColor: getRandomColor() }]}
        >
          <Text style={styles.initials}>{getInitials(name)}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: 'white',
    fontWeight: 'bold',
  },
});

