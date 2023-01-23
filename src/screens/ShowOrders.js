import React from 'react';
import { View, Text } from 'react-native';
import UpdateOrderStatus from './UpdateOrderStatus';

const ShowOrders = ({ route }) => {
  const { order } = route.params;

  return (
    <View style={{width:"100%",  height:"100%"}}> 
      <Text style={{color:"black"}}>Total: {order.total}</Text>
      <Text style={{color:"black"}}>Items:</Text>
      {order.items.map((item, index) => (
        <Text style={{color:"black"}} key={index}> {item.text} - {item.quantity}</Text>
      ))}   
      <UpdateOrderStatus orderId={order.id} orderStatus={order.orderStatus} />
    </View>
  );
};

export default ShowOrders;