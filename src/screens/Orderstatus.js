import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import OrderItem from './OrderItem';
import {firebase} from '@react-native-firebase/firestore';
import {UserId} from './Login';

function Orderstatus({navigation}) {
  const [data, setData] = useState('');
  // const [order, setOrder] = useState('');

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('orders')
      .where('orderStatus', '==', 'active')
      .where('userId','==', UserId)
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setData(documentSnapshot.data());
        });
      });
  }, []);

  // const getData = () => {
     // .orderBy("createdAt",'desc')
      // .limit(1)
      // .onSnapshot((snapshot) => {
      //     snapshot.docs.map((doc)=>{
      //         setData(doc.data());
      //     });

      // });
  //   firebase
  //     .firestore()
  //     .collection('orders')
  //     .where('orderStatus', '==', 'active')
  //     .limit(1)
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(documentSnapshot => {
  //         console.log(documentSnapshot.data());
  //       });
  //     });
  // };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row', height: 50, width: '100%'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '33%',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
            Order Status
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{paddingLeft: 100, width: 50, justifyContent: 'center'}}>
          <Image
            source={require('../assets/images/x.png')}
            resizeMethod="auto"
            style={{width: 20}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: '100%',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: '#F4F4F4',
          padding: 15,
        }}>
        <View
          style={{
            marginTop: 20,
            width: '100%',
            height: 180,
            backgroundColor: 'white',
            borderRadius: 4,
            height: 80,
          }}>
          <View style={{flexDirection: 'row', marginTop: 12, marginLeft: 10}}>
            <Image
              source={require('../assets/images/dl.png')}
              style={{
                height: 50,
                width: 50,
              }}
            />
            <View style={{flexDirection: 'column', marginLeft: 20}}>
              <Text style={{color: 'black', fontWeight: '600', fontSize: 15}}>
                CONFORMED
              </Text>
              <Text style={{color: 'black', marginTop: 20}}>
                Your order has been conformed
              </Text>
            </View>
          </View>
        </View>

        {data.orderStatus == 'active' && data.userId == UserId ? (
          <>
            <View style={styles.modalContainer}>
              <View style={styles.modalCheckoutContainer}>
                <ScrollView scrollEnabled={true}>
                  {Array.from(data.items).map((item, index) => (
                    <OrderItem key={index} item={item} />
                  ))}
                  <View style={styles.subtotalContainer}>
                    <View
                      style={{
                        borderRadius: 7,
                        width: '100%',
                      }}>
                      <View
                        style={{flexDirection: 'row', padding: 10, height: 48,justifyContent:'space-between'}}>
                        <Text style={{color: 'black'}}>Total</Text>
                        <Text style={{color: 'black'}}>
                          RS {data.total}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', padding: 10, height: 48, justifyContent:'space-between'}}>
                        <Text style={{color: 'black'}}>Urgent Laundry</Text>
                        <Text style={{color: 'black'}}>
                          RS {data.urgentLaundry}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', padding: 10, height: 48, justifyContent:'space-between'}}>
                        <Text style={{color: 'black'}}>Grand-Total</Text>
                        <Text style={{color: 'black'}}>
                          RS {data.grandTotal}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </>
        ) : (
          <Text style={{color: 'black'}}> No Ongoing Order</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },

  modalCheckoutContainer: {
    backgroundColor: 'white',
    padding: 16,
    height: 700,
  },

  restaurantName: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 10,
  },

  subtotalContainer: {
    justifyContent: 'space-between',
    marginTop: 15,
  },

  subtotalText: {
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10,
    color: 'black',
  },
});

export default Orderstatus;
