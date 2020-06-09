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
import GetLocation from 'react-native-get-location'

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      location: "",
      macAddress: ""
    };
  }

  componentDidMount() {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        this.setState({location: location});
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })

    DeviceInfo.getMacAddress().then(mac => {
      macAddress = JSON.stringify(mac);
      this.setState({macAddress : JSON.stringify(mac)});
    })
  }

  render() {
    var location = this.state.location;
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
                  Location: {location.longitude}, {location.latitude}
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

// export default App;
