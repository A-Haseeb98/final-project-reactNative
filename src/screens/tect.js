import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  storageRef,
  storage,
  uploadBytes,
  uploadString,
} from "../config/Firebase";
export default function MyImagePicker({ pic, setPic, text }) {
  const [imagePicked, setimagePicked] = useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log("Uploding....");
    await uploadBytes(storageRef, pickerResult.uri).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    // await uploadString(storageRef, pickerResult.uri, "base64url").then((snapshot) => {
    //   console.log("Uploaded a data_url string!");
    // });
    console.log("pickerResult");

    setPic(pickerResult.uri);
  };
  console.log("IMAHGE=", pic);

  return (
    <View style={styles.container}>
      {pic ? null : <Text style={styles.instructions}>{text}</Text>}
      <Image
        source={{ uri: pic }}
        style={{
          width: "100%",
          height: pic ? 100 : null,
          resizeMode: "contain",
        }}
      />
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button1}>
        <Text style={{ color: "#fff" }}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button1: {
    alignItems: "center",
    backgroundColor: "#1ec77f",
    padding: 10,
    width: "100%",
    paddingTop: 25,
    paddingBottom: 25,
    borderRadius: 100,
    marginVertical: 10,
    color: "white",
  },
});