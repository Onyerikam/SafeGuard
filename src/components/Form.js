import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        margin: 8,
        width: '90%',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

const Form = ({ onSubmit }) => {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => setText(text)}
                value={text}
                placeholder="Type something..."
                onSubmitEditing={() => onSubmit(text)}
            />
        </View>
    );
};

export default Form;
