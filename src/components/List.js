import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    item: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    }
});

const List = ({ data, renderItem }) => (
    <FlatList
        style={styles.container}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
    />
);

export default List;
