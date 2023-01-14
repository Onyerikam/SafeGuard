import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-swipeable';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        margin: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    text: {
        fontSize: 18,
    },
    leftAction: {
        backgroundColor: '#388e3c',
        justifyContent: 'center',
        flex: 1,
        marginRight: 8
    },
    rightAction: {
        backgroundColor: '#dd2c00',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 8
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        padding: 8,
    },
});


const SwipeableListItem = ({ item, onSwipeLeft, onSwipeRight, onPressLeft, onPressRight }) => (
    <Swipeable
        leftActionActivationDistance={75}
        onLeftActionActivate={onSwipeLeft}
        onRightActionActivate={onSwipeRight}
        leftContent={(
            <TouchableOpacity style={styles.leftAction} onPress={onPressLeft}>
                <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
        )}
        rightContent={(
            <TouchableOpacity style={styles.rightAction} onPress={onPressRight}>
                <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
        )}
    >
        <View style={styles.container}>
            <Text style={styles.text}>{item.name}</Text>
        </View>
    </Swipeable>
);

export default SwipeableListItem;
