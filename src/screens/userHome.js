import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { doc, getDoc, db } from '../../config/firebase';
import QRCode from 'react-native-qrcode-svg';
export default function UserHome({ route }) {
    const [reqStatus, setReqStatus] = useState('');
    const [data, setData] = useState('');



    const getData = async () => {
        const docRef = doc(db, "users", route.params.paramKey);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data1:", docSnap.data());
            console.log("Document data1111111:", docSnap.data().status);
            setReqStatus(docSnap.data().status)
            setData(docSnap.data())

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getData();
    }, [])



    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {console.log(reqStatus)}
            {reqStatus == 'pending' ?
                <Text>pending</Text>
                : reqStatus == 'Approved' ?
                    <>
                        <Text>Name : {data.name}</Text>
                        <Text>cnic : {data.cnic}</Text>
                        <Text>email : {data.email}</Text>
                        <Text>familyMember : {data.familyMember}</Text>
                        <Text>fatherName : {data.fatherName}</Text>
                        <Text>dob : {data.dob}</Text>
                        <Text>status : {data.status}</Text>
                        <Text>Serial No : {data.uid}</Text>
                        <QRCode
                            value= {data.uid}
                        />
                    </>
                    : reqStatus == 'Rejected' ?
                        <Text>Rejected</Text> :
                        null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});