import Contacts from 'react-native-contacts';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native';
import List from './List';
import Form from './Form';
import * as Linking from 'expo-linking';
import SwipeableListItem from './SwipeableListItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 8,
    },
    button: {
        backgroundColor: '#4287f5',
        padding: 12,
        alignItems: 'center',
        margin: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});


const callEmergencyContact = async (name) => {
    // check if contact permission is granted
    const permissionGranted = await requestContactPermission();
    if (!permissionGranted) return;

    // retrieve contact by name
    Contacts.getContactsByName(name, (err, contacts) => {
        if (err) throw err;

        // check if contact with name exists
        if (contacts.length === 0) {
            console.log(`No contact with name ${name} found.`);
            return;
        }

        // retrieve phone number
        const phoneNumber = contacts[0].phoneNumbers[0].number;

        // make call using phone number
        Linking.openURL(`tel:${phoneNumber}`);
    });
};

    // function to request contact permissions
    const requestContactPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts Permission',
                    message:
                        'This app needs access to your contacts ' +
                        'so you can call your emergency contacts.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Contacts permission granted');
                return true;
            } else {
                console.log('Contacts permission denied');
                return false;
            }
        } catch (err) {
            console.warn(err);
            return false;
        }
    };
    
    const EmergencyContacts = () => {
        const [contacts, setContacts] = useState([]);
        const [showForm, setShowForm] = useState(false);
    
        const addContact = (name) => {
            setContacts([...contacts, { id: contacts.length + 1, name }]);
            setShowForm(false);
        };
    
        const deleteContact = (id) => {
            setContacts(contacts.filter(c => c.id !== id));
        };
    
        const callContact = (item) => {
            callEmergencyContact(item.name);
        };
    
        const renderItem = ({ item }) => (
            <SwipeableListItem
                item={item}
                onSwipeLeft={() => callContact(item)}
                onSwipeRight={() => deleteContact(item.id)}
                onPressLeft={() => callContact(item)}
                onPressRight={() => deleteContact(item.id)}
            />
        );
    
        return (
            <View style={styles.container}>
                {showForm ? (
                    <Form onSubmit={addContact} />
                ) : (
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
                            <Text style={styles.buttonText}>Add Contact</Text>
                        </TouchableOpacity>
                        <List data={contacts} renderItem={renderItem} />
                    </View>
                )}
            </View>
        );
    };    

export default EmergencyContacts;
