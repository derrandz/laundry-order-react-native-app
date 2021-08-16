import React from "react"

import { View } from "react-native"
import { Card, ListItem } from "react-native-elements";

export function OrderStatus(props) {
  return (
    <View>
      <Card>
        <Card.Title>Order type: {props.order.type}</Card.Title>
        <Card.Divider/>
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{props.order.status}</ListItem.Title>
              <ListItem.Subtitle>{props.order.delivery_datetime}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
      </Card>
    </View>
  )
}
