import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { call } from 'react-native-phone-call';
import { sendSMS } from 'react-native-sms';
import { Ionicons } from '@expo/vector-icons';

const ContactsScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        const requestContactsPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    {
                        title: 'Safety App Contacts Permission',
                        message:
                            'Safety App needs access to your contacts to show emergency contacts.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasPermission(true);
                    Contacts.getAll((err, contacts) => {
                        if (err) {
                            console.log("Error fetching contacts: ", err);
                            setContacts([]);
                        } else {
                            setContacts(contacts);
                        }
                    });
                } else {
                    setHasPermission(false);
                }
            } catch (err) {
                console.warn(err);
            }
        };

        requestContactsPermission();
    }, []);

    const handleCallContact = (number) => {
        const args = {
            number: number, // String value with the number to call
        };
        call(args).catch(console.error);
    };

    const handleChatContact = (number) => {
        sendSMS(number, 'Emergency message from Safety App')
            .catch(console.error);
    };

    return (
        <View style={styles.container}>
            {hasPermission ? (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.recordID}
                    renderItem={({ item }) => (
                        <View style={styles.contactContainer}>
                            <View style={styles.contactInfoContainer}>
                                <Text style={styles.contactName}>
                                    {item.givenName} {item.familyName}
                                </Text>
                                {item.phoneNumbers.length > 0 ? (
                                    <Text style={styles.contactNumber}>
                                        {item.phoneNumbers[0].number}
                                    </Text>
                                ) : (
                                    <Text style={styles.errorMessage}>
                                        No phone number found
                                    </Text>
                                )}
                            </View>
                            <View style={styles.contactActionsContainer}>
                            {item.phoneNumbers.length > 0 ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => handleCallContact(item.phoneNumbers[0].number)}
                                        >
                                            <Ionicons
                                                name="ios-call"
                                                size={24}
                                                color="#4F8EF7"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleChatContact(item.phoneNumbers[0].number)}
                                        >
                                            <Ionicons
                                                name="ios-chatbubbles"
                                                size={24}
                                                color="#4F8EF7"
                                            />
                                        </TouchableOpacity>
                                    </>
                                ) : null}
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View style={styles.permissionContainer}>
                    <Text style={styles.permissionText}>
                        We need your permission to access your contacts.
                    </Text>
                    <TouchableOpacity
                        style={styles.permissionButton}
                        onPress={() => requestContactsPermission()}
                    >
                        <Text style={styles.permissionButtonText}>
                            Grant Permission
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.aboutContainer}>
                <Text style={styles.aboutText}>Made by: Onyerikam</Text>
            </View>
        </View>
    );
};

export default ContactsScreen;