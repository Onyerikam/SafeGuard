import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50',
        padding: 12,
        alignItems: 'center',
        borderRadius: 4
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});

const Button = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

export default Button;
