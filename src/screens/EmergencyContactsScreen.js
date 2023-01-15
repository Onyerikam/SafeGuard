import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Contacts from 'expo-contacts';
import * as Phone from 'react-native-phone-number';
import * as SMS from 'expo-sms';

const EmergencyContactsScreen = () => {
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [hasContactsPermission, setHasContactsPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [dialPadNumber, setDialPadNumber] = useState('');
    const [smsText, setSmsText] = useState('');

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                setHasContactsPermission(true);
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });
                const trustedContacts = data.filter((contact) =>
                    contact.phoneNumbers.some((phoneNumber) => phoneNumber.label === 'trusted')
                );
                setEmergencyContacts(trustedContacts);
            }
            setIsLoading(false);
        })();
    }, []);

    const handleCallEmergencyContact = async (number) => {
        // Check if the number is an emergency number
        if (await Phone.isEmergencyNumberAsync(number)) {
            // Code to handle calling the emergency contact
            Phone.startPhoneCallAsync(number);
        } else {
            Alert.alert('Error', 'Invalid number');
        }
    };

    const handleDialEmergencyNumber = async () => {
        // Check if the number is an emergency number
        if (await Phone.isEmergencyNumberAsync(dialPadNumber)) {
            // Code to handle calling the emergency number
            Phone.startPhoneCallAsync(dialPadNumber);
        } else {
            Alert.alert('Error', 'Invalid number');
        }
    };

    const handleSendSms = async (number) => {
        // Check if the device is able to send SMS
        if (SMS.isAvailableAsync()) {
            // Code to handle sending SMS
            SMS.sendSMSAsync([number], smsText);
            setSmsText('');
        } else {
            Alert.alert('Error', 'SMS not available on this device');
        }
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {hasContactsPermission ? (
                <>
                    {emergencyContacts.length > 0 ? (
                        <><FlatList
                            data={emergencyContacts}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => (
                                <View style={styles.emergencyContactContainer}>
                                    <View style={styles.emergencyContactInfoContainer}>
                                        <Text>{item.name}</Text>
                                        {item.phoneNumbers.length > 0 ? (
                                            <>
                                                <TouchableOpacity
                                                    onPress={() => handleCallEmergencyContact(item.phoneNumbers[0].number)}
                                                >
                                                    <Ionicons
                                                        name="ios-call"
                                                        size={24}
                                                        color="#4F8EF7"
                                                        style={styles.emergencyContactIcon} />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => handleSendSms(item.phoneNumbers[0].number)}
                                                >
                                                    <Ionicons
                                                        name="ios-chatbubbles"
                                                        size={24}
                                                        color="#4F8EF7"
                                                        style={styles.emergencyContactIcon} />
                                                </TouchableOpacity>
                                            </>
                                        ) : (
                                            <Text>No phone number</Text>
                                        )}
                                    </View>
                                </View>
                            )} /><View style={styles.dialPadContainer}>
                                <TextInput
                                    style={styles.dialPadInput}
                                    placeholder="Enter emergency number"
                                    value={dialPadNumber}
                                    onChangeText={setDialPadNumber} />
                                <TouchableOpacity onPress={handleDialEmergencyNumber}>
                                    <Ionicons
                                        name="ios-call"
                                        size={24}
                                        color="#4F8EF7"
                                        style={styles.dialPadIcon} />
                                </TouchableOpacity>
                            </View><View style={styles.smsContainer}>
                                <TextInput
                                    style={styles.smsInput}
                                    placeholder="Enter SMS message"
                                    value={smsText}
                                    onChangeText={setSmsText} />
                            </View></>
                    ) : (
                        <Text>You don't have any emergency contacts.</Text>
                    )}
                </>
            ) : (
                <Text>Please grant the app permission to access your contacts.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emergencyContactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    emergencyContactInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    emergencyContactIcon: {
        marginLeft: 16,
    },
    dialPadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    dialPadInput: {
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 8,
    },
    dialPadIcon: {
        padding: 8,
    },
    smsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    smsInput: {
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 8,
    },
    smsIcon: {
        padding: 8,
    },
});

export default EmergencyContactsScreen;
