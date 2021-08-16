import React, { useState, useEffect } from 'react';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { View, Text, Button, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CheckBox, Input, Card, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Center } from "./Center"
import { ScrollView } from 'react-native-gesture-handler';
import {
  chooseType,
  choosePickupDate,
  choosePickupTime,
  enterPickupAddress,
  choosePickupGeolocation,
  chooseWashWeight,
  chooseCleanCount,
  pickIronItem,
  enterPhoneNumber,
  enterAdditionalNotes,
  submitNewOrder,
} from "../state/order-actions";

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 1/2,
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
  const [ orderAsList, updateOrderAsList ] = useState({
    0: {
      title: "Type & Details",
      value: "",
    },
    1: {
      title: "Pickup Time & Date",
      value: "",
    },
    2: {
      title: "Pickup Address & Geolocation",
      value: "",
    },
    3: {
      title: "Phone Number",
      value: "",
    },
    4: {
      title: "Additional notes",
      value: "",
    }
  });
  
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
      const isIron = props.order.type === "iron" && props.order.iron.items.length > 0;
      const isWash = props.order.type === "wash" && props.order.wash.weight !== "";
      const isClean = props.order.type === "clean" && props.order.clean.count > 1;
      const isSecondStepValid = isWash || isClean || isIron;
      
      if (isSecondStepValid) {
        setNextStepsState([false, false, true, true]);
        const value = isIron
          ? `iron, items: ${props.order.iron.items.join(", ")}`
          : 
            isWash
              ? `wash, weight: ${props.order.wash.weight}`
              :
                isClean
                  ? `clean, number of items: ${props.order.clean.count}`
                  : 'some kind of issue has occured mate' ;
        
        updateOrderAsList({
          ...orderAsList,
          0: {
            ...orderAsList[0],
            value,
          }
        })
      }
    },
    //thirdStep,
    () => {
      const isThirdStepValid = props.order.details.pickup_date !== new Date()
        && props.order.details.pickup_time !== new Date()
        && datetimePicked[0]
        && datetimePicked[1];

      if (isThirdStepValid) {
        setNextStepsState([false, false, false, true]);
        updateOrderAsList({
          ...orderAsList,
          1: {
            ...orderAsList[1],
            value: `${formatDate(props.order.details.pickup_date)}, ${formatTime(props.order.details.pickup_time)}`,
          }
        });
      }
    },
    //fourthStep,
    () => {
      const isFourthStepValid = props.order.details.phone_number && (
        props.order.details.pickup_address !== ""
        || (
          props.order.details.pickup_geolocation.latitude !== 0
          && props.order.details.pickup_geolocation.longitude !== 0
        )
      );

      if (isFourthStepValid) {
        setNextStepsState([false, false, false, false]);
        updateOrderAsList({
          ...orderAsList,
          2: {
            ...orderAsList[2],
            value: props.order.details.pickup_address
          },
          3: {
            ...orderAsList[3],
            value: props.order.details.phone_number,
          },
          4: {
            ...orderAsList[4],
            value: props.order.details.additional_notes,
          }
        })
      }
    },
  ]

  const onNext = () => { setCurrentStep(currentStep + 1) }
  const onPrevious = () => { setCurrentStep(currentStep - 1) }

  useEffect(() => {
    if (currentStep < 4) {
      validators[currentStep]();
    }
  }, [
    props.order
  ]);
  
  useEffect(
    () => {
      let timerId = null;
      const success = !props.order.details.submitting
      && props.order.details.done
      && props.order.details.success
      
      console.log('this effect on?', success)

      if (success && timerId === null) {
        console.log("now succeeded");
        timerId = setTimeout(() => {
          props.navigation.navigate('Orders');
        }, 2000);
      }

      return () => {
        clearTimeout(timerId);
      }
    }, [
    props.order.details,
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
                      checked={props.order.wash.weight === 5}
                      onPress={() => props.chooseWashWeight(5)}
                    />
                </View>
                <View>
                  <CheckBox
                    center
                    title='10kg'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={props.order.wash.weight === 10}
                    onPress={() => props.chooseWashWeight(10)}
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
                      setDatetimePicked([true, false]);
                      props.choosePickupDate(date);
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
                    setDatetimePicked([true, true]);
                    props.choosePickupTime(time);
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
          <ScrollView>
            <View>
              <Input
                placeholder="Phone Number"
                value={props.order.details.phone_number}
                onChangeText={(text) => props.enterPhoneNumber(text)}
              />
            </View>
            <View>
              <Input
                multiline
                numberOfLines={4}
                placeholder="Additional Notes"
                value={props.order.details.additional_notes}
                onChangeText={(text) => props.enterAdditionalNotes(text)}
              />
            </View>
            <View>
              <Input
                placeholder="Address"
                value={props.order.details.pickup_address}
                onChangeText={(text) => props.enterPickupAddress(text)}
              />
            </View>
            <View>
              <Button onPress={() => getLocation()} title="Get Current Location" />
              <Text>Location Permission Status({ locationPermissionStatus.status }): { locationPermissionStatus.message }</Text>
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
          </ScrollView>
        </ProgressStep>
        
        <ProgressStep onSubmit={() => props.submitNewOrder(props.order)}>
          <View>
            {
              props.order.details.submitting
              && !props.order.details.done
              &&
              <View>
                <Center>
                  <View>
                    <ActivityIndicator size="large"/>
                  </View>
                </Center>
              </View>
            }
            {
              !props.order.details.submitting
              && props.order.details.done
              && !props.order.details.success
              &&
              <View>
                <Center>
                  <View>
                    <Text>
                      There was a problem submitting your order, please contact us immediately.
                    </Text>
                  </View>
                </Center> 
              </View>
            }
            {
              !props.order.details.submitting
              && props.order.details.done
              && props.order.details.success
              &&
              <View>
                <Center>
                  <View>
                    <Text>
                      Successfully submitted
                    </Text>
                  </View>
                </Center> 
              </View>
            }
            <View>
              <Card>
                <Card.Title>Review order</Card.Title>
                <Card.Divider/>
                {
                  Object.keys(orderAsList).map(
                    (key, i) => (
                      <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title>{orderAsList[key].title}</ListItem.Title>
                          <ListItem.Subtitle>{orderAsList[key].value}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    )
                  )
                }
              </Card>
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
      </View>
  )
};

const mapStateToProps = (state) => {
	const { newOrder, items } = state.global
	return { order: newOrder, items }
};

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
    enterPhoneNumber,
    enterAdditionalNotes,
    submitNewOrder,
	}, dispatch);
};

export const MakeOrder = connect(mapStateToProps, mapDispatchToProps)(MakeOrderComponent);
