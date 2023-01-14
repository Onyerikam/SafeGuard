import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: 8,
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 8,
    },
});

const Card = ({ title, image }) => (
    <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
);

export default Card;
