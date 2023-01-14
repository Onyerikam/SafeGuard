import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import Voice from 'react-native-voice';
import { navigate } from '../navigationRef';
import { callEmergencyNumber, sendTextMessage } from '../api/emergency';
import {getContactNumber} from '../api/contacts'
import {activateAlarm} from '../api/alarm'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    result: {
        margin: 8,
        fontSize: 18,
    },
});

const VoiceCommand = () => {
    const [results, setResults] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    Voice.onSpeechStart = (e) => {
        setIsRecording(true);
    };

    Voice.onSpeechEnd = (e) => {
        setIsRecording(false);
    };

    Voice.onSpeechResults = (e) => {
        setResults(e.value);
        handleCommand(e.value);
    };

    const startRecording = () => {
        if (Platform.OS === 'android') {
            Voice.requestPermissions();
        }
        Voice.start('en-US');
    };

    const stopRecording = () => {
        Voice.stop();
    };

    const handleCommand = (commands) => {
        // Example command: "Call John Doe" or "Send message to Jane Smith"
        const words = commands[0].split(" ");
        if(words[0] === 'Call'){
            callEmergencyNumber(getEmergencyNumber(words.slice(1).join(" ")));
        }
        else if(words[0] === 'Send' && words[1] === 'message'){
            sendTextMessage(getEmergencyNumber(words.slice(3).join(" ")));
        }
        else if(words[0] === 'Activate' && words[1] === 'alarm'){
            activateSafetyAlarm();
        }
        else if(words[0] === 'Navigate' && words[1] === 'to'){
            navigate(words.slice(2).join(" "));
        }    
        else{
            Alert.alert("Invalid Command", "Please say a valid command such as 'Call John Doe' or 'Send message to Jane Smith'");
        }
    }

    const getEmergencyNumber = (name) => {
        return getContactNumber(name);
    };
    
    const activateSafetyAlarm = () => {
        activateAlarm();
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={startRecording} disabled={isRecording}>
                <Text style={styles.buttonText}>Start Recording</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={stopRecording} disabled={!isRecording}>
                <Text style={styles.buttonText}>Stop Recording</Text>
            </TouchableOpacity>
            {results.map((result, index) => (
                <Text key={index} style={styles.result}>{result}</Text>
            ))}
        </View>
    );
};
    
export default VoiceCommand;
