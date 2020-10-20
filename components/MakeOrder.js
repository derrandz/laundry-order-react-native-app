import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CheckBox, Input, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  chooseType,
  choosePickupDate,
  choosePickupTime,
  enterPickupAddress,
  choosePickupGeolocation,
  chooseWashWeight,
  chooseCleanCount,
  pickIronItem,
} from "../state/order-actions";

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const MakeOrderComponent = function (props) {

  const [ displayDatePicker, setDisplayDatePicker ] = useState(false);
  const [ displayTimePicker, setDisplayTimePicker ] = useState(false);
  const [ currentLocation, setCurrentLocation ] = useState({ latitude: 0, longitude: 0 });
	const [ locationPermissionStatus, setLocationPermissionStatus ] = useState({ status: 'not-set', message: '' });
  const [ nextStepsState, setNextStepsState ] = useState([true, true, true, true]);
  const [ currentStep, setCurrentStep ] = useState(0);
  const [ datetimePicked, setDatetimePicked ] = useState([false, false]);

	const askForLocationPermissionStatus = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		
		setLocationPermissionStatus({ status });

		if (status !== 'granted') {
      setLocationPermissionStatus({ message: `Permission to access location is ${status}` });
      alert(locationPermissionStatus.message);
    }
	};

	const getLocation = async () => {
    if (locationPermissionStatus.status !== 'granted') {
      await askForLocationPermissionStatus();
    }
 
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    setCurrentLocation({ latitude, longitude });
    props.choosePickupGeolocation({ latitude, longitude });
	};

	const getProperTerm = (type) => {
    switch (type) {
      case 'wash':
        return 'weight';
      break;

      case 'clean':
        return 'count';
      
      case 'iron':
        return 'items';
      
      default:
        return 'details';
        break;
    }
  }

  const formatDate = (date) => date ? date.toLocaleDateString() : "Choose date";
  const formatTime = (time) => time ? time.toLocaleTimeString() : "Choose time";

  // TODO: replace the types with an imported enum or something
  const validators = [
    //firstStep
    () => {
      const isFirstStepValid = props.order.type !== ""
      && [
        "wash", "clean", "iron",
      ].includes(props.order.type);

      if (isFirstStepValid) {
        setNextStepsState([false, true, true, true]);
      }
    },
    //secondStep,
    () => {
      const isSecondStepValid = (props.order.type === "wash" && props.order.wash.weight !== "") 
      || (props.order.type === "clean" && props.order.clean.count > 1)
      || (props.order.type === "iron" && props.order.iron.items.length > 0);
      
      if (isSecondStepValid) {
        setNextStepsState([false, false, true, true]);
      }
    },
    //thirdStep,
    () => {
      const isThirdStepValid = props.order.details.pickup_date !== new Date()
      && props.order.details.pickup_time !== new Date()
      && datetimePicked[0]
      && datetimePicked[1]

      if (isThirdStepValid) {
        setNextStepsState([false, false, false, true]);
      }
    },
    //fourthStep,
    () => {
      const isFourthStepValid = props.order.details.pickup_address !== ""
      || (
        props.order.details.pickup_geolocation.latitude !== 0
        && props.order.details.pickup_geolocation.longitude !== 0
      )

      if (isFourthStepValid) {
        setNextStepsState([false, false, false, false]);
      }
    },
  ]

  const onNext = () => { setCurrentStep(currentStep + 1) }
  const onPrevious = () => { setCurrentStep(currentStep - 1) }

  useEffect(() => {
    validators[currentStep]()
  }, [
    props.order
  ]);

  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps>
        <ProgressStep
          label="Select Type"
          nextBtnDisabled={nextStepsState[0]}
          onNext={onNext}
          onPrevious={onPrevious}
        >
          <View style={{ alignItems: 'center' }}>
    
            <View>
              <CheckBox
                center
                title='Wash'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.order.type === 'wash'}
                onPress={() => props.chooseType('wash')}
              />
            </View>

            <View>
              <CheckBox
                center
                title='Clean'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.order.type === 'clean'}
                onPress={() => props.chooseType('clean')}
              />
            </View>

            <View>
              <CheckBox
                center
                title='Iron'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.order.type === 'iron'}
                onPress={() => props.chooseType('iron')}
              />
            </View>

          </View>
        </ProgressStep>

        <ProgressStep
          label={`Choose ${getProperTerm(props.order.type)}`}
          nextBtnDisabled={nextStepsState[1]}
          onNext={onNext}
          onPrevious={onPrevious}
        >
          { 
            1 && props.order.type === "wash"
              ? <View>
                  <View>
                    <CheckBox
                      center
                      title='5kg'
                      checkedIcon='dot-circle-o'
                      uncheckedIcon='circle-o'
                      checked={props.order.wash.weight === '5kg'}
                      onPress={() => props.chooseWashWeight('5kg')}
                    />
                </View>
                <View>
                  <CheckBox
                    center
                    title='10kg'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={props.order.wash.weight === '10kg'}
                    onPress={() => props.chooseWashWeight('10kg')}
                  />
                </View>
              </View>
              : null
          }
          { 
            1 && props.order.type === "clean"
              ? <View style={{ flex: 1, alignItems: "stretch", justifyContent: 'center' }}>
                  <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={props.order.clean.count}
                    onValueChange={(value) => props.chooseCleanCount(value + 1)}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                  />
                  <Text>Count: {props.order.clean.count}</Text>
              </View>
              : null
          }
          {
            1 && props.order.type === "iron"
              ? <View>
                {
                  props.items.map(
                    (item) => (
                      <View key={item}>
                        <CheckBox
                          center
                          title={item}
                          checked={props.order.iron.items.includes(item)}
                          onPress={() => props.pickIronItem(item)}
                        />
                      </View>
                    )
                  )
                }
              </View>
              : null
          }
        </ProgressStep>
      
        <ProgressStep
          label="Choose Pickup Details"
          nextBtnDisabled={nextStepsState[2]}
          onNext={onNext}
          onPrevious={onPrevious}
        >
          <View>
            <View style={{ alignItems: 'center' }}>
              {
                displayDatePicker
                && <DateTimePicker
                  value={props.order.details.pickup_date}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={
                    (value) => {
                      setDisplayDatePicker(false);
                      const date = new Date(value.nativeEvent.timestamp);
                      props.choosePickupDate(date);
                      setDatetimePicked([true, false]);
                    } 
                  }
                />
              }
            </View>
            <View>
              <Input
                placeholder='Pickup date'
                value={formatDate(props.order.details.pickup_date)}
                disabled
              />
            </View>
            <View>
              <Button
                title="Choose Date"
                onPress={() => setDisplayDatePicker(true)}
              />
            </View>

            <View style={{ alignItems: 'center' }}>
            {
              displayTimePicker
              && <DateTimePicker
                value={props.order.details.pickup_time}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={
                  (value) => {
                    setDisplayTimePicker(false);
                    const time = new Date(value.nativeEvent.timestamp)
                    props.choosePickupTime(time);
                    setDatetimePicked([true, true]);
                  }
                }
              />
            }
            </View>

            <View>
              <Input
                placeholder='Pickup time'
                value={formatTime(props.order.details.pickup_time)}
                disabled
              />
            </View>
            <View>
              <Button
                title="Choose time"
                onPress={() => setDisplayTimePicker(true)}
              />
            </View>
          </View>
        </ProgressStep>
      
        <ProgressStep
          label="Choose pickup location"
          nextBtnDisabled={nextStepsState[3]}
          onNext={onNext}
          onPrevious={onPrevious}
        >
          <View>
            <Input
              placeholder="Address"
              value={props.order.details.pickup_address}
              onChange={props.enterPickupAddress}
            />
          </View>
          <View>
            <Button onPress={() => getLocation()} title="Get Current Location" />
            <Text>Location Permission Status({locationPermissionStatus.status}): {locationPermissionStatus.message}</Text>
            <Text>Current Position: Latitude ({ currentLocation.latitude }), Longitude ({ currentLocation.longitude })</Text>
            <Text>Chosen Position: Latitude ({ props.order.details.pickup_geolocation.latitude  }), Longitude ({ props.order.details.pickup_geolocation.longitude })</Text>
          </View>
          <View>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                longitudeDelta: 0,
                latitudeDelta: 0,
              }}
              initialRegion={{
                latitude: 31.794525,
                longitude: -7.0849336,
                longitudeDelta: 0,
                latitudeDelta: 0,
              }}
              showsUserLocation={true}
            >
							<MapView.Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                draggable
                onDragEnd={({ nativeEvent: { coordinate }}) => props.choosePickupGeolocation(coordinate)}
              />
						</MapView>
          </View>
        </ProgressStep>
      
        <ProgressStep
          label="Final Step"
        >
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 5!</Text>
            <Text>We will insert additional notes</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
      </View>
  )
}

const mapStateToProps = (state) => {
	const { newOrder, items } = state.global
	return { order: newOrder, items }
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		chooseType,
    choosePickupDate,
    choosePickupTime,
    enterPickupAddress,
    choosePickupGeolocation,
    chooseWashWeight,
    chooseCleanCount,
    pickIronItem,
	}, dispatch)
}

export const MakeOrder = connect(mapStateToProps, mapDispatchToProps)(MakeOrderComponent)
