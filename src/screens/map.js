import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';


export default function Map({ route, navigation }) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [display, setDisplay] = useState(false);

    setDisplay
    var position = {
        latitude: 0,
        longitude: 0
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        // console.log(text,'location')
        console.log(location.coords.latitude, 'location latitude')
        console.log(location.coords.longitude, 'location longitude')
        position = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        if (!display) {
            setDisplay(true)
        }
    }

    var saylaniLocations = [
        {
            "branch_name": "Aliabad",
            "latitude": 24.9200172,
            "longitude": 67.0612345
        },
        {
            "branch_name": "Numaish chowrangi",
            "latitude": 24.8732834,
            "longitude": 67.0337457
        },
        {
            "branch_name": "Saylani house phase 2",
            "latitude": 24.8278999,
            "longitude": 67.0688257
        },
        {
            "branch_name": "Touheed commercial",
            "latitude": 24.8073692,
            "longitude": 67.0357446
        },
        {
            "branch_name": "Sehar Commercial",
            "latitude": 24.8138924,
            "longitude": 67.0677652
        },
        {
            "branch_name": "Jinnah avenue",
            "latitude": 24.8949528,
            "longitude": 67.1767206
        },
        {
            "branch_name": "Johar chowrangi",
            "latitude": 24.9132328,
            "longitude": 67.1246195
        },
        {
            "branch_name": "Johar chowrangi 2",
            "latitude": 24.9100704,
            "longitude": 67.1208811
        },
        {
            "branch_name": "Hill park",
            "latitude": 24.8673515,
            "longitude": 67.0724497
        }
    ]



    const deg2Rad = (deg) => {
        return deg * Math.PI / 180;
    }

    function distance(position1, position2) {

        var lat1 = deg2Rad(position1.latitude);
        var lat2 = deg2Rad(position2.latitude);
        var lon1 = deg2Rad(position1.longitude);
        var lon2 = deg2Rad(position2.longitude);
        var R = 6371000; // metres
        var φ1 = deg2Rad(lat1);
        var φ2 = deg2Rad(lat2);
        var Δφ = deg2Rad(lat2 - lat1);
        var Δλ = deg2Rad(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;
        return d;
    }
    var closest = saylaniLocations[0];
    var closest_distance = distance(closest, position);
    for (var i = 1; i < saylaniLocations.length; i++) {
        if (distance(saylaniLocations[i], position) < closest_distance) {
            closest_distance = distance(saylaniLocations[i], position);
            closest = saylaniLocations[i];
        }
    }


    return (<>
        {display ?
            (<View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={
                            {
                                latitude: 24.878140,
                                longitude: 67.019225,
                            }
                        }
                        pinColor={"purple"}
                        title={"Current Location"}
                    />
                    {saylaniLocations.map((value, index) => {
                        return (<MapView.Marker key={index}
                            coordinate={
                                {
                                    latitude: value.latitude,
                                    longitude: value.longitude,
                                }
                            }
                            title={value.branch_name}
                            description={"Saylani Branch"}
                        />)
                    })}
                </MapView>

                <Text style={styles.massageBox}>Nearest Saylani Location to your Current location is : {closest.branch_name}
                    <TouchableOpacity onPress={() => navigation.navigate('APPLYRATION', {
                        paramKey: route.params.paramKey,
                    })} >
                        <Text style={styles.apply_btn}>APPLY</Text>
                    </TouchableOpacity>
                </Text>
            </View>) : <Text> Please Allow Permission</Text>
        }

    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        position: 'relative'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    apply_btn: {
        backgroundColor: 'black',
        color: 'white',
        padding: 5
    }
    ,
    massageBox: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: 'white',
        width: '90%',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 20,
        borderBottomWidth: 2,
        color: 'black'
    },

});
