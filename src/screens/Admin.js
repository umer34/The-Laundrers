import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('orders')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setOrders(data);
      });

    return () => unsubscribe();
  }, []);
  // console.log(orders);
  return (
    <View style={{width:"100%", height:"100%"}}>
      <FlatList
        data={orders}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ShowOrders', {order: item})}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#999',
                width:"100%"
              }}>
               <Text style={{fontWeight: '600', fontSize: 14, color:'black'}}>
                
              </Text>
              <Text style={{color: 'black'}}>{item.total}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Admin;
