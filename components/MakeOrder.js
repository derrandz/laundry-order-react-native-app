import React from 'react';

import { View, Text } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { CheckBox, Card, Divider, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  chooseType,
  chooseOrderItem,
  choosePickupDateTime,
  enterPickupAddress,
  choosePickupLocation,
} from "../state/order-actions";

const MakeOrderComponent = function (props) {

  return (
    <View style={{ flex: 1 }}>
      <ProgressSteps>
        <ProgressStep label="Select Type">
          <View style={{ alignItems: 'center' }}>
    
            <View>
              <CheckBox
                center
                title='Clothes washing'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.order.type === 'clothes-washing'}
                onPress={() => props.chooseType('clothes-washing')}
              />
            </View>

            <View>
              <CheckBox
                center
                title='Carpets washing'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.order.type === 'carpets-washing'}
                onPress={() => props.chooseType('carpets-washing')}
              />
            </View>

            <View>
              <CheckBox
                center
                title='Ironing'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={props.order.type === 'ironing'}
                onPress={() => props.chooseType('ironing')}
              />
            </View>

          </View>
        </ProgressStep>

        <ProgressStep label="Second Step">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 2!</Text>
            <Text>We will select order type details</Text>
          </View>
        </ProgressStep>
      
        <ProgressStep label="Third Step">
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 3!</Text>
            <Text>We will select pickup datetime</Text>
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
	const { newOrder } = state.global
	return { order: newOrder }
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		chooseType,
    chooseOrderItem,
    choosePickupDateTime,
    enterPickupAddress,
    choosePickupLocation,
	}, dispatch)
}

export const MakeOrder = connect(mapStateToProps, mapDispatchToProps)(MakeOrderComponent)
