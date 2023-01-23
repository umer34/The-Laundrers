import {
  View,
  Text,
  Animated,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import icons from '../components/icons';
import CustomButton from '../components/customButtons/CustomButton';
import Modal from 'react-native-modal';
import Calendar from 'react-native-calendars/src/calendar';
import {TextInput} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Maps from './Maps';
import {UserLocation} from './Maps';
import {firebase} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {Total} from './ViewCart';
import {UserId} from './Login';
import Icon from 'react-native-vector-icons/AntDesign';

const Pyament = ({navigation}) => {
  const [paymentType, setPaymentType] = useState('');
  const [isCashChecked, setCashChecked] = useState('unchecked');
  const [isVisaChecked, setVisaChecked] = useState('unchecked');

  const onVisaPressed = () => {
    setCashChecked('unchecked');
    setVisaChecked('checked');
    setPaymentType('VisaCard');
  };

  const onCashPressed = () => {
    setCashChecked('checked');
    setVisaChecked('unchecked');
    setPaymentType('Cash');
  };

  const [isAddressToggle, setAddressToggle] = useState(false);
  const toggleAddress = () => {
    setAddressToggle(!isAddressToggle);
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isDeliveryVisible, setDeliveryVisible] = useState(false);
  const toggleDeleivery = () => {
    setDeliveryVisible(!isDeliveryVisible);
  };

  const [isMasterVisa, setMasterVisa] = useState(false);
  const toggleVisa = () => {
    setMasterVisa(!isMasterVisa);
  };

  function header() {
    return (
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={{paddingLeft: '6%', width: 50, justifyContent: 'center'}}>
          <Image
            source={require('../assets/icons/back.png')}
            resizeMethod="auto"
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>
        <View style={{justifyContent: 'center', marginLeft: 50}}>
          <Text style={{color: 'black', fontSize: 20}}>Schedule a Pickup</Text>
        </View>
      </View>
    );
  }
  function schedule() {

    const [borderColor1, setBorderColor1] = useState('#EEEEEE');
    const [borderColor2, setBorderColor2] = useState('#EEEEEE');
    const [shouldShow, setShouldShow] = useState(true);
    const [urgentLaundry, setUrgentLaundry] = useState(0);
    

    const [hideDelievery, setHideDelievery] = useState(true);
     
    const [delieveryDate, setDeleiveryDate] = useState('Select Date');
    function setDDate(date) {
      setDeleiveryDate(date);
    }

    const [pickUpDate, setPickUpDate] = useState('Select Date');
    function setPDate(date) {
      setPickUpDate(date);
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDeleievryPicker, setDelievryPicker] = useState(false);

    const showPickUpTime = () => {
      setDatePickerVisibility(true);
    };

    const showDeleievryTime = () => {
      setDelievryPicker(true);
    };

    const hideDeleiveryTime = () => {
      setDelievryPicker(false);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const [pickUpTime, setPickTime] = useState('Select Time');
    function setPTime(time) {
      setPickTime(time);
    }
    const handlePickUpConfrim = date => {
      let tempDate = date;
      let newTime = tempDate.getHours() + ' ' + tempDate.getMinutes();
      setPTime(newTime);
      hideDatePicker();
    };

    const [delieveryTime, setDeleiveryTime] = useState('Select Time');
    function setDTime(ttime) {
      setDeleiveryTime(ttime);
    }
    const handleDelieveryConfrim = date => {
      let newtempDate = date;
      let pTime = newtempDate.getHours() + ' ' + newtempDate.getMinutes();
      setDTime(pTime);
      hideDeleiveryTime();
    };
 
    const [orderID, setOrderId] = React.useState();
    useEffect(() => {
      const unsubscribe = firebase.firestore().collection('orders')
        .where('userId', '==', UserId)
        .get()
        .then((querySnapshot) => {
          const fetchedOrders = [];
          querySnapshot.forEach((doc) => {
            fetchedOrders.push(doc.data());
          });
          setOrderId(fetchedOrders);
        })
        .catch((error) => {
          console.error(error);
        });
  
      // return () => unsubscribe();
    }, []);

   
    // console.log(orderID);
    
    const {items} = useSelector(state => state.cartReducer.selectedItems);
    const totalPrice = parseInt(Total,10);
    const urgentPrice = parseInt(urgentLaundry,10);  
    const grandTotal = totalPrice + urgentPrice;
    
    const addOrderToFireBase = () => {
      try
      {
        if(orderID == ''){
          const db = firebase.firestore();
          db.collection('orders').add({
            userId: UserId,
            items: items,
            total: Total,
            userAddress: UserLocation,
            pickupDate: pickUpDate,
            deliveryDate: delieveryDate,
            pickUpTime: pickUpTime,
            delieveryTime: delieveryTime,
            paymentType: paymentType,
            orderStatus: 'active',
            urgentLaundry: urgentLaundry,
            grandTotal: grandTotal,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          navigation.navigate('Trackorder');
        }else{
        if(orderID[0].userId == UserId){
          alert("You have already an order going on");
        }else{
        const db = firebase.firestore();
        db.collection('orders').add({
          userId: UserId,
          items: items,
          total: Total,
          userAddress: UserLocation,
          pickupDate: pickUpDate,
          deliveryDate: delieveryDate,
          pickUpTime: pickUpTime,
          delieveryTime: delieveryTime,
          paymentType: paymentType,
          orderStatus: 'active',
          urgentLaundry: urgentLaundry,
          grandTotal: grandTotal,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        navigation.navigate('Trackorder');
      };
    };
      }catch(error){
        alert(error);
      }
    }
      

    

    return (
      <ScrollView
        scrollEnabled={true}
        style={{
          padding: 20,
          flex: 1,
          borderColor: '#F4F4F4',
          borderWidth: 2,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: '#F2EFEF',
        }}>
        <StatusBar />
        <Modal
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          isVisible={isModalVisible}
          swipeDirection="down"
          onSwipeComplete={toggleModal}
          // animationIn="bounceInUp"
          // animationOut="bounceOutDown"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.center}>
              <View style={styles.barIcon} />
              <Calendar
                onDayPress={date => {
                  setModalVisible(false);
                  setDDate(date.dateString);
                }}
              />
            </View>
          </View>
        </Modal>

        <Modal
          onBackdropPress={() => setDeliveryVisible(false)}
          onBackButtonPress={() => setDeliveryVisible(false)}
          isVisible={isDeliveryVisible}
          swipeDirection="down"
          onSwipeComplete={toggleDeleivery}
          // animationIn="bounceInUp"
          // animationOut="bounceOutDown"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
          style={styles.modal}>
          <View style={styles.modalContent2}>
            <View style={styles.center}>
              <View style={styles.barIcon} />
              <Calendar
                onDayPress={date => {
                  setDeliveryVisible(false);
                  setPDate(date.dateString);
                }}
              />
            </View>
          </View>
        </Modal>

        <Modal
          onBackdropPress={() => setMasterVisa(false)}
          onBackButtonPress={() => setMasterVisa(false)}
          isVisible={isMasterVisa}
          swipeDirection="down"
          onSwipeComplete={toggleVisa}
          // animationIn="bounceInUp"
          // animationOut="bounceOutDown"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
          style={styles.modal}>
          <View style={styles.modalContent3}>
            <View style={styles.center}>
              <View style={styles.barIcon} />
              <View style={{padding: 20}}>
                <Text style={{color: '#000'}}>Card Number</Text>
                <TextInput
                  placeholder="Card Number"
                  placeholderTextColor={'#000'}
                  style={{
                    backgroundColor: '#ECECEC',
                    width: '100%',
                    borderRadius: 5,
                    marginTop: '5%',
                    padding: 8,
                    color: 'black',
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000'}}>Card</Text>
                  <Text style={{color: '#000', paddingLeft: 5}}>
                    (Month,Year)
                  </Text>
                  <Text style={{color: '#000', paddingLeft: 90}}>
                    Card Code
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}></View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          onBackdropPress={() => setAddressToggle(false)}
          onBackButtonPress={() => setAddressToggle(false)}
          isVisible={isAddressToggle}
          // swipeDirection="down"
          onSwipeComplete={toggleAddress}
          // animationIn="bounceInUp"
          // animationOut="bounceOutDown"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
          style={styles.modal}>
          <View style={styles.modalContent4}>
            <View style={styles.center}>
              <View style={styles.barIcon} />
              <View style={{flex: 1}}>
                <Maps toggleAddress={toggleAddress} />
              </View>
            </View>
          </View>
        </Modal>

        <Text style={{color: 'black', marginTop: 10}}>Schedule Laundry</Text>
        <View
          style={{
            marginTop: 10,
            padding: 12,
            flexDirection: 'row',
            width: '100%',
            height: 60,
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <TouchableOpacity
            onPress={() => {
              setShouldShow(true);
              setBorderColor1("#EC7773");
              setBorderColor2("#EEEEEE");
              setUrgentLaundry(0);
              setDeleiveryDate("Select Date");
              setPickUpDate("Select Date");
            }}
            style={{
              borderWidth: 2,
              width: '50%',
              borderColor: borderColor1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}> Scheduale Date</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShouldShow(false);
              setBorderColor2("#EC7773");
              setBorderColor1("#EEEEEE");
              setUrgentLaundry(200);
              setDeleiveryDate("Today");
              setPickUpDate("Tomorrow");
            }}
            style={{
              borderWidth: 2,
              width: '50%',
              borderColor: borderColor2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black'}}>Tomorrow(Rs200)</Text>
          </TouchableOpacity>
        </View>

        {shouldShow ? 
        (
        <View>
      
        <Text style={{color: 'black'}}>Schedule Date</Text>

        <View
          accessibilityElementsHidden={hideDelievery}
          style={{
            marginTop: 10,
            padding: 10,
            flexDirection: 'row',
            width: '100%',
            height: 90,
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <View style={{borderWidth: 2, width: '50%', borderColor: '#EEEEEE'}}>
            <View
              style={{
                marginLeft: 25,
                marginRight: 25,
                backgroundColor: 'white',
                marginTop: -10,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                Pickup Date
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={toggleDeleivery}>
                <View style={{padding: 10, flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/icons/Calender.png')}
                    style={{height: 23, width: 23, marginTop: 6}}
                  />
                  <View style={{marginLeft: 10, flexDirection: 'column'}}>
                    <Text
                      style={{color: 'black', fontSize: 15, fontWeight: '500',marginTop: 6}}>
                        {pickUpDate}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{borderWidth: 2, width: '50%', borderColor: '#EEEEEE'}}>
            <View
              style={{
                marginLeft: 25,
                marginRight: 25,
                backgroundColor: 'white',
                marginTop: -10,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                Delievery Date
              </Text>
            </View>
            <TouchableOpacity onPress={toggleModal}>
              <View style={{padding: 10, flexDirection: 'row'}}>
                <Image
                  source={require('../assets/icons/Calender.png')}
                  style={{height: 22, width: 22, marginTop: 6}}
                />
                <View style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '500', marginTop:6}}>
                    {delieveryDate}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </View>
      ):(
       <View>

       </View>
      )}

        <Text style={{color: 'black'}}>Schedule Time</Text>

        <View
          style={{
            marginTop: 10,
            padding: 10,
            flexDirection: 'row',
            width: '100%',
            height: 90,
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <View style={{borderWidth: 2, width: '50%', borderColor: '#EEEEEE'}}>
            <View
              style={{
                marginLeft: 25,
                marginRight: 25,
                backgroundColor: 'white',
                marginTop: -10,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                Pickup Time
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={showPickUpTime}>
                {
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handlePickUpConfrim}
                    onCancel={hideDatePicker}
                  />
                }

                <View style={{padding: 10, flexDirection: 'row'}}>
                <Icon name="clockcircleo" size={25} color="#EC7773" style={{marginTop:6}}/>
                  <View style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '500', marginTop:6}}>
                    {pickUpTime}
                  </Text>
                </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{borderWidth: 2, width: '50%', borderColor: '#EEEEEE'}}>
            <View
              style={{
                marginLeft: 25,
                marginRight: 25,
                backgroundColor: 'white',
                marginTop: -10,
              }}>
              <Text style={{color: 'black', textAlign: 'center'}}>
                Delievery Time
              </Text>
            </View>
            <TouchableOpacity onPress={showDeleievryTime}>
              {
                <DateTimePickerModal
                  isVisible={isDeleievryPicker}
                  mode="time"
                  onConfirm={handleDelieveryConfrim}
                  onCancel={hideDeleiveryTime}
                />
              }
              <View style={{padding: 10, flexDirection: 'row'}}>
                <Icon name="clockcircleo" size={25} color="#EC7773" style={{marginTop:6}}/>
                <View style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Text
                    style={{color: 'black', fontSize: 15, fontWeight: '500', marginTop:6}}>
                    {delieveryTime }
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{color: 'black', marginTop: 10}}>Select Payment</Text>
        <View
          style={{
            marginTop: 10,
            padding: 12,
            flexDirection: 'row',
            width: '100%',
            height: 120,
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <View
            style={{
              padding: 10,
              borderWidth: 2,
              width: '100%',
              borderColor: '#EEEEEE',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Checkbox
                  status={isVisaChecked}
                  onPress={onVisaPressed}
                  color="#EC7773"
                  uncheckedColor="#EC7773"
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'column',
                  marginTop: -3,
                }}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Visa/MasterCard
                </Text>
                <Text style={{color: 'black', fontSize: 12}}>
                  **** **** **** 1234
                </Text>
              </View>
              <TouchableOpacity onPress={toggleVisa}>
                <Image
                  source={require('../assets/icons/edit.png')}
                  style={{height: 18, width: 18, marginLeft: 90}}
                />
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Checkbox
                  status={isCashChecked}
                  onPress={onCashPressed}
                  color="#EC7773"
                  uncheckedColor="#EC7773"
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'column',
                  marginTop: -1,
                }}>
                <Text style={{color: 'black', fontSize: 17}}>
                  Cash On Delivery
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={{color: 'black', marginTop: 10}}>Address</Text>
        <View
          style={{
            marginTop: 10,
            padding: 12,
            width: '100%',
            height: 100,
            backgroundColor: 'white',
            borderRadius: 4,
          }}>
          <TouchableOpacity
            onPress={toggleAddress}
            style={{
              padding: 10,
              flexDirection: 'row',
              borderWidth: 2,
              width: '100%',
              height: '100%',
              borderColor: '#EEEEEE',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Image
                source={icons.circle}
                resizeMethod="auto"
                style={{marginTop: 5}}
              />
            </View>
            <View
              style={{flexDirection: 'column', marginLeft: 10, width: '95%'}}>
              <View style={{flexDirection: 'column', width: '95%'}}>
                <Text style={{color: 'black', fontWeight: '600'}}>
                  Pickup Address
                </Text>
                <Text style={{color: 'black', fontSize: 10}}>
                  {UserLocation}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{marginBottom: 50}}>
          <CustomButton
            onPress={() => {
              try {
                addOrderToFireBase();
              } catch (error) {
                alert(error);
              }
             }
            }
            text={'Confirm order'}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {header()}
      {schedule()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  item: {
    backgroundColor: 'black',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 12,
  },
  flexView: {
    flex: 1,
    backgroundColor: 'white',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 450,
    paddingBottom: 20,
  },
  modalContent2: {
    backgroundColor: '#fff',
    paddingTop: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 450,
    paddingBottom: 20,
  },
  modalContent3: {
    backgroundColor: '#fff',
    paddingTop: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 285,
    paddingBottom: 20,
  },

  modalContent4: {
    backgroundColor: '#fff',
    paddingTop: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: '92%',
    paddingBottom: 20,
  },

  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
    alignSelf: 'center',
  },
  text: {
    color: '#bbb',
    fontSize: 24,
    marginTop: 100,
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
});

export default Pyament;
