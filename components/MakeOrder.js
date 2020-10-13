import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';

import { View, Text, Button } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  chooseType,
  choosePickupDate,
  choosePickupTime,
  enterPickupAddress,
  choosePickupLocation,
  chooseWashWeight,
  chooseCleanCount,
  pickIronItem,
} from "../state/order-actions";

const MakeOrderComponent = function (props) {

  const [ displayDatePicker, setDisplayDatePicker ] = useState(true);
  const [ displayTimePicker, setDisplayTimePicker ] = useState(true);

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

  const formatDate = (date) => date.toString()
  const formatTime = (time) => time

  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps>
        <ProgressStep label="Select Type">
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

        <ProgressStep label={`Choose ${getProperTerm(props.order.type)}`}>
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
      
        <ProgressStep label="Choose Pickup Date">
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
                    props.choosePickupDate(value)
                    setDisplayDatePicker(false)
                  } 
                }
              />
            }
          </View>
          <View>
            <Button onPress={() => setDisplayDatePicker(true)} title="Choose date" />
            <Text>
              {formatDate(props.order.details.pickup_date)}
            </Text>
          </View>
        </ProgressStep>
      
        <ProgressStep label="Choose Pickup Time">
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
                    props.choosePickupTime(value)
                    setDisplayTimePicker(false)
                  }
                }
              />
            }
          </View>
          <View>
            <Button onPress={() => setDisplayTimePicker(true)} title="Choose time" />
            <Text>
              {formatTime(props.order.details.pickup_time)}
            </Text>
          </View>
        </ProgressStep>

        <ProgressStep label="Third Step">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 4!</Text>
            <Text>We will select pickup location</Text>
          </View>
        </ProgressStep>
      
        <ProgressStep label="Third Step">
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
    choosePickupLocation,
    chooseWashWeight,
    chooseCleanCount,
    pickIronItem,
	}, dispatch)
}

export const MakeOrder = connect(mapStateToProps, mapDispatchToProps)(MakeOrderComponent)
