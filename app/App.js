import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      macAddress: ""
    };
  }

  componentDidMount() {
    DeviceInfo.getMacAddress().then(mac => {
      macAddress = JSON.stringify(mac);
      this.setState({macAddress : JSON.stringify(mac)});
    })

    var watchID = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log("position updated");

        this.setState({
          latitude: latitude,
          longitude: longitude
        })
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        distanceFilter: 1
      }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(perimeterContains(this.state.latitude, this.state.longitude));
  }

  render() {
    var latitude = this.state.latitude;
    var longitude = this.state.longitude;
    var macAddress = this.state.macAddress;
    var deviceID = DeviceInfo.getUniqueId();

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Device Information</Text>
                <Text style={styles.sectionDescription}>
                  Location: {latitude}, {longitude}
                </Text>
                <Text style={styles.sectionDescription}>
                  In Perimeter? {perimeterContains(latitude, longitude) ? "Yes" : "No"}
                </Text>
                <Text style={styles.sectionDescription}>
                  Mac Address: {macAddress}
                </Text>
                <Text style={styles.sectionDescription}>
                  Unique Device ID: {deviceID}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

const PERIMETER = require('./perimeter.json');

function perimeterContains(lat, lng) {
  console.log("Latitude: " + lat);
  console.log("Longitude: " + lng);
  var target = {lat: lat, lng: lng};
  var intersections = 0;

  for (var i = 0; i < PERIMETER.length; i++) {
    var a = PERIMETER[i],
        j = i+1;
    if (j >= PERIMETER.length) j = 0;
    var b = PERIMETER[j];
    if (crossSegment(target, a, b)) intersections++;
  }

  console.log("Intersections: " + intersections);
  return (intersections % 2 == 1);

  function crossSegment(point, a, b) {
    var px = point.lng,
            py = point.lat,
            ax = a.lng,
            ay = a.lat,
            bx = b.lng,
            by = b.lat;
        if (ay > by) {
            ax = b.lng;
            ay = b.lat;
            bx = a.lng;
            by = a.lat;
        }
        
        if (px < 0) {
            px += 360;
        }
        if (ax < 0) {
            ax += 360;
        }
        if (bx < 0) {
            bx += 360;
        }

        if (py == ay || py == by) py += 0.00000001;
        if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
        if (px < Math.min(ax, bx)) return true;

        var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Infinity;
        var blue = (ax != px) ? ((py - ay) / (px - ax)) : Infinity;
        return (blue >= red)
  }
}