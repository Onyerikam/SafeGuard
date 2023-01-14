import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Linking, TextInput, Alert } from 'react-native';
import { shareLocation, activateSafetyAlarm } from '../services/emergency'
import { BarCodeScanner } from 'expo-barcode-scanner';

const emergencyNumbers = [
    {
        name: 'Police',
        number: '911'
    },
    {
        name: 'Fire Department',
        number: '112'
    },
    {
        name: 'Ambulance',
        number: '911'
    },
    {
        name: 'Poison Control',
        number: '800-222-1222'
    }
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emergencyButton: {
        backgroundColor: 'red',
        padding: 12,
        alignItems: 'center',
        margin: 8,
        borderRadius: 4,
    },
    emergencyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    locationText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    shareLocationButton: {
        backgroundColor: '#4287f5',
        padding: 12,
        alignItems: 'center',
        margin: 8,
        borderRadius: 4,
    },
    shareLocationButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    emergencyNumbersContainer: {
        padding: 12,
        alignItems: 'center',
        margin: 8,
    },
    emergencyNumberText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    panicAlarmButton: {
        backgroundColor: '#f54242',
        padding: 12,
        alignItems: 'center',
        margin: 8,
        borderRadius: 4,
    },
    panicAlarmButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    tutorialContainer: {
        padding: 12,
        alignItems: 'center',
        margin: 8,
    },
    tutorialText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    passwordInput: {
        borderWidth: 1,
        padding: 8,
        marginRight: 8,
    },
    passwordButton: {
        backgroundColor: '#4287f5',
        padding: 12,
        alignItems: 'center',
    },
    passwordButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    secretPhraseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 8,
    },
    secretPhraseInput: {
        borderWidth: 1,
        padding: 8,
        marginRight: 8,
    },
    secretPhraseButton: {
        backgroundColor: '#4287f5',
        padding: 12,
        alignItems: 'center',
    },
    secretPhraseButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    aboutContainer: {
        margin: 8,
    },
    aboutText: {
        fontSize: 18,
    },
});

const HomeScreen = () => {
    const [location, setLocation] = useState(null);
    const [password, setPassword] = useState('');
    const [secretPhrase, setSecretPhrase] = useState('');
    const [hasPermission, setHasPermission] = useState(null);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Location Permission",
                    message: "This App needs access to your location",
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
                // set location
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleEmergencyCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };
    
    const handleShareLocation = () => {
        shareLocation();
    };
    
    const handlePanicAlarm = () => {
        activateSafetyAlarm(location);
    };
    
    const handleSetPassword = (text) => {
        setPassword(text);
    };
    
    const handleCheckPassword = (password) => {
        if (password === this.state.password) {
            setPasswordCheck(true);
        } else {
            setPasswordCheck(false);
            Alert.prompt('Incorrect Password');
        }
    };
    
    const handleSetSecretPhrase = (secretPhrase) => {
        setSecretPhrase(secretPhrase);
    };
    
    const handleActivateSecretPhrase = (spokenPhrase) => {
        if (spokenPhrase === this.state.secretPhrase) {
            activateSafetyAlarm(location);
        } else {
            Alert.alert('Incorrect Phrase');
        }
    };
    
    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.emergencyButton} onPress={() => handleEmergencyCall(911)}>
            <Text style={styles.emergencyButtonText}>Emergency Call</Text>
        </TouchableOpacity>

        <Text style={styles.locationText}>{location}</Text>

        <TouchableOpacity style={styles.shareLocationButton} onPress={handleShareLocation}>
            <Text style={styles.shareLocationButtonText}>Share Location</Text>
        </TouchableOpacity>

        <View style={styles.emergencyNumbersContainer}>
            <Text style={styles.emergencyNumberText}>Emergency Numbers</Text>
            {emergencyNumbers.map((number) => (
                <TouchableOpacity key={number.name} onPress={() => handleEmergencyCall(number.number)}>
                    <Text style={styles.emergencyNumberText}>{number.name} : {number.number}</Text>
                </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity style={styles.panicAlarmButton} onPress={handlePanicAlarm}>
          <Text style={styles.panicAlarmButtonText}>Panic Alarm</Text>
        </TouchableOpacity>
       
        <View style={styles.tutorialContainer}>
            <Text style={styles.tutorialText}>Tutorial:</Text>
            <Text style={styles.tutorialText}>- To add emergency contacts, go to the Contacts tab in the app.</Text>
            <Text style={styles.tutorialText}>- To activate the panic alarm, press the Panic Alarm button on the home page.</Text>
            <Text style={styles.tutorialText}>- To share your location with trusted contacts, press the Share Location button on the home page.</Text>
        </View>

        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.passwordInput}
                placeholder="Set Password"
                value={password}
                onChangeText={handleSetPassword}
            />
            <TouchableOpacity style={styles.passwordButton} onPress={() => handleCheckPassword(password)}>
                <Text style={styles.passwordButtonText}>Check Password</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.secretPhraseContainer}>
            <TextInput
                style={styles.secretPhraseInput}
                placeholder="Set Secret Phrase"
                value={secretPhrase}
                onChangeText={handleSetSecretPhrase}
            />
            <TouchableOpacity style={styles.secretPhraseButton} onPress={() => handleActivateSecretPhrase(secretPhrase)}>
                <Text style={styles.secretPhraseButtonText}>Activate Secret Phrase</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.aboutContainer}>
            <Text style={styles.aboutText}>Made by: Onyerikam</Text>
        </View>
    </View>

);
}

export default HomeScreen;
