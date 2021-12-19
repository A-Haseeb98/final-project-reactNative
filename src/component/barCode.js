import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { db, query, getDocs, collection, where } from '../../config/firebase';

export default function QrCode() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    verifyUser

    const verifyUser = async (serial) => {
        console.log(serial, 'ssssssss')

        const q = query(collection(db, "users"), where("uid", "==", serial));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data()) {
                alert('user verified')
                return 'verifyUser'
            }
            alert('user verified')
        });

    }


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);

        const q = query(collection(db, "users"), where("uid", "==", data));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data()) {
                alert('user verified')
            }
        });


    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})