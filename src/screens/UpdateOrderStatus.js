import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const UpdateOrderStatus = ({ orderId, orderStatus }) => {
  const [status, setStatus] = useState(orderStatus);


  const updateStatus = () => {
    firebase.firestore().collection('orders').doc(orderId).update({
      orderStatus: status,
    });
  };

  return (
    <View>
      <Text style={{color:"black"}} >Order Status:</Text>
      <Picker style={{color:"black"}}
        mode={'dropdown'}
        dropdownIconColor = {"black"}
        dropdownIconRippleColor={"black"}
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="Active" value="active" />
        <Picker.Item label="Completed" value="completed" />
      </Picker>
      <TouchableOpacity onPress={updateStatus}>
        <Text style={{color:"black"}}>Update Status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateOrderStatus;
