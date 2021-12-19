import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { db, doc, setDoc,query,getDocs, collection,where } from '../../config/firebase';


export default function ApplyRation({ navigation, route }) {
    const [name, setName] = useState('')
    const [cnic, setCNIC] = useState('')
    const [dob, setDob] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [familyMember, setFamilyMember] = useState('')

    let validateUser = async () => {
        const q = query(collection(db, "users"), where("uid", "==", route.params.paramKey));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            navigation.navigate('USER_HOME',{
                paramKey: route.params.paramKey
            })
        });
    }
    useEffect(() => {
        validateUser()
    },[])

    const applyRation = async () => {
        console.log(name, cnic, dob, fatherName, familyMember)
        let Data = {
            name, cnic, dob, fatherName, familyMember, uid: route.params.paramKey, status: 'pending'
        }
        console.log('dd', Data)

        let dbRef = doc(db, "users", route.params.paramKey);
        await setDoc(dbRef, Data)
            .then(() => {
                console.log('res')
                alert('Application Submitted successfull')
                navigation.navigate('USER_HOME', {
                    paramKey: route.params.paramKey
                })
            })
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.heading} > REGISTER</TextInput>
            <TextInput
                placeholder='Name'
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}>
            </TextInput>
            <TextInput
                placeholder='Father Name'
                value={fatherName}
                onChangeText={(text) => setFatherName(text)}
                style={styles.input}>
            </TextInput>
            <TextInput
                placeholder='CNIC'
                value={cnic}
                onChangeText={(text) => setCNIC(text)}
                style={styles.input}>
            </TextInput>
            <TextInput
                placeholder='Date Of Birth'
                value={dob}
                onChangeText={(text) => setDob(text)}
                style={styles.input}>
            </TextInput>
            <TextInput
                placeholder='No Of Family Member'
                value={familyMember}
                onChangeText={(text) => setFamilyMember(text)}
                style={styles.input}>
            </TextInput>


            <TouchableOpacity onPress={applyRation} style={styles.submit}>
                <Text style={styles.submit_text}>Submit Request</Text>
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
        justifyContent: 'center',
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
    heading: {
        color: 'green',
        fontSize: 40,
        fontWeight: 'bold'
    },

});