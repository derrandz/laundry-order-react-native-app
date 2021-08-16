import React from "react"

import { useEffect } from "react";
import { View, Text } from "react-native"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OrderStatus } from "./OrderStatus"
import { Center } from "./Center"

import {
    getMyOrders,
} from "../state/order-actions"

const OrdersComponent = (props) => {
  
  useEffect(
    () => {
      if (!props.orders.state.fetching) {
        props.getMyOrders()
      }
    },
    []
  )

  const loading = props.orders.state.fetching && !props.orders.state.done && !props.orders.state.success
  const failed = !props.orders.state.fetching && props.orders.state.done && !props.orders.state.success
  const succeeded = !props.orders.state.fetching && props.orders.state.done && props.orders.state.success
  
  return (
    <View>
      <Center>
        {loading && <View><Text>Loading your orders....</Text></View>}
        {failed && <View><Text>Could not load your orders, please try again.</Text></View>}
        {succeeded && <View>
          {props.orders.list.length === 0 && <Text>No orders so far</Text>}
          {props.orders.list.length > 1
            && props.order.list.orders.map(
              (order) => (<View>
                <OrderStatus order={order}/>
              </View>)
            )
          }
        </View>}
      </Center>
    </View>
  )
}

const mapStateToProps = (state) => {
	const { orders } = state.global
	return { orders }
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getMyOrders }, dispatch);
};

export const Orders = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent)
