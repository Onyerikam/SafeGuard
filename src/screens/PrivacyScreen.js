import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const PrivacyScreen = () => {
    const [isLocationSharingOn, setIsLocationSharingOn] = useState(false);
    const [isPanicAlarmOn, setIsPanicAlarmOn] = useState(false);
    const [isSecretPhraseOn, setIsSecretPhraseOn] = useState(false);
    const [isPasswordOn, setIsPasswordOn] = useState(false);

    const handleLocationSharing = () => {
        setIsLocationSharingOn(!isLocationSharingOn);
    };

    const handlePanicAlarm = () => {
        setIsPanicAlarmOn(!isPanicAlarmOn);
    };

    const handleSecretPhrase = () => {
        setIsSecretPhraseOn(!isSecretPhraseOn);
    };

    const handlePassword = () => {
        setIsPasswordOn(!isPasswordOn);
    };

    return (
        <View style={styles.container}>
            <View style={styles.privacyOptionContainer}>
                <Text style={styles.privacyOptionText}>Location Sharing</Text>
                <TouchableOpacity style={styles.privacyOptionButton} onPress={handleLocationSharing}>
                    <Text style={styles.privacyOptionButtonText}>{isLocationSharingOn ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.privacyOptionContainer}>
                <Text style={styles.privacyOptionText}>Panic Alarm</Text>
                <TouchableOpacity style={styles.privacyOptionButton} onPress={handlePanicAlarm}>
                    <Text style={styles.privacyOptionButtonText}>{isPanicAlarmOn ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.privacyOptionContainer}>
                <Text style={styles.privacyOptionText}>Secret Phrase</Text>
                <TouchableOpacity style={styles.privacyOptionButton} onPress={handleSecretPhrase}>
                    <Text style={styles.privacyOptionButtonText}>{isSecretPhraseOn ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.privacyOptionContainer}>
                <Text style={styles.privacyOptionText}>Password</Text>
                <TouchableOpacity style={styles.privacyOptionButton} onPress={handlePassword}>
                    <Text style={styles.privacyOptionButtonText}>{isPasswordOn ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PrivacyScreen;