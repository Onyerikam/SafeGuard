import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Picker } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

const ChangeEmergencyContacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [emergencyType, setEmergencyType] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const requestContactsPermission = async () => {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                  title: 'Contacts Permission',
                  message: 'This app requires access to your contacts.',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the contacts');
                Contacts.getAll((err, contacts) => {
                    if (err === 'denied') {
                        console.log("cannot access contacts.")
                    } else {
                        setContacts(contacts);
                    }
                })
              } else {
                console.log('Contacts permission denied');
              }
            } catch (err) {
              console.warn(err);
            }
          };
        requestContactsPermission();
    }, []);

    const handleAddContact = () => {
        if (selectedContact){
            setContacts([...contacts, { name: selectedContact.givenName, number: selectedContact.phoneNumbers[0].number }]);
        } else if(newName && newNumber) {
            setContacts([...contacts, { name: newName, number: newNumber }]);
        } else {
            console.log("Name and number is required")
        }
        setNewName('');
        setNewNumber('');
    };

    const handleEditContact = (index) => {
        // Code for editing a contact
    };

    const handleDeleteContact = (index) => {
        setContacts(contacts.filter((contact, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={emergencyType}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => setEmergencyType(itemValue)}
            >
                <Picker.Item label="Emergency Type" value="" />
                <Picker.Item label="Police" value="police" />
                <Picker.Item label="Fire Department" value="fire" />
                <Picker.Item label="Ambulance" value="ambulance" />
                <Picker.Item label="Hospital" value="hospital" />
            </Picker>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Name"
                    value={newName}
                    onChangeText={text => setNewName(text)}
                />
                <TextInput
                    placeholder="Number"
                    value={newNumber}
                    onChangeText={text => setNewNumber(text)}
                />
            </View>
            <Button title="Add Contact" onPress={handleAddContact} />
            <FlatList
                data={contacts}
                renderItem={({ item, index }) => (
                    <View style={styles.contactContainer}>
                        <Text>{item.name}</Text>
                        <Text>{item.number}</Text>
                        <View style={styles.buttonsContainer}>
                            <Button title="Edit" onPress={() => handleEditContact(index)} />
                            <Button title="Delete" onPress={() => handleDeleteContact(index)} />
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default ChangeEmergencyContacts;

