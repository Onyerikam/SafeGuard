import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scannerContainer: {
        height: '100%',
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
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

const ScanBarcode = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        Linking.openURL(data);
    };

    const requestPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    return (
        <View style={styles.container}>
            {hasPermission === null ? (
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Request Camera Permission</Text>
                </TouchableOpacity>
            ) : hasPermission === false ? (
                <Text>Camera permission is not granted.</Text>
            ) : (
        <View style={styles.scannerContainer}>
           <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />

            {scanned && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                  <Text style={styles.buttonText}>Scan Again</Text>
                </TouchableOpacity>
              </View>
            )}
              </View>
            )}
        </View>
    );
};
                
export default ScanBarcode;
