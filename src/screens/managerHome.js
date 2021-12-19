import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { db, query, getDocs, collection, where } from '../../config/firebase';


export default function ManagerLogin({ navigation }) {

    const [serial, setSerila] = useState()

    const CheckData = async () => {
        console.log(serial, 'ssssssss')

        const q = query(collection(db, "users"), where("uid", "==", serial));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data()) {
                alert('User Verified')
                console.log('elseeeee')
            }
        });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading} > MANAGER </Text>
            <Text style={styles.lable} > Verify By Serial No</Text>

            <TextInput
                placeholder='Enter Serial Number'
                value={serial}
                onChangeText={(text) => setSerila(text)}
                style={styles.input}>
            </TextInput>
            
            <TouchableOpacity onPress={CheckData} style={styles.submit}>
                <Text style={styles.submit_text}>VERIFY</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate('QR_CODE')} style={styles.submit}>
                <Text style={styles.submit_text}>VERIFY by QR Code</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 60
    },
    heading: {
        color: 'green',
        fontSize: 40,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'grey',
        color: 'white',
        width: '90%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    submit: {
        backgroundColor: 'green',
        color: 'white',
        width: '90%',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    submit_text: {
        color: 'white',
        textAlign: 'center'
    },
    lable: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
        width: "90%",
        marginTop: 15
    }

});