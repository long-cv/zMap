import React from 'react';
import {Dimensions, PermissionsAndroid, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import RNGooglePlaces from 'react-native-google-places';

const {width, height} = Dimensions.get('window');
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = (LATITUDE_DELTA * width) / height;

class Map extends React.Component {
  constructor(props) {
    console.log('Map: constructor.........');
    super(props);
    this.state = {
      region: {
        latitude: 10.823099,
        longitude: 106.629662,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }
  componentDidMount = async () => {
    console.log('Map: componentDidMount.........');
    let granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'zMap Permission',
        message:
          'zMap needs to access to your location' +
          'to show your location on map.',
        buttonNeutral: 'Ask me later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('location permission accepted');
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
          });
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    } else {
      console.log('location permission denied');
    }
    let places = await RNGooglePlaces.getAutocompletePredictions('bigC', {country: 'VN'});
    console.log('places: ', places);
  };

  render() {
    console.log('Map: render.........');
    console.log('region: ', this.state.region);
    return (
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showCompass={true}
        region={this.state.region}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Map;
