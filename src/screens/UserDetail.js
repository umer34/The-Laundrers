import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import {UserId} from './Login';
import auth from '@react-native-firebase/auth';

const UserDetail = () => {
  const [data, setData] = useState('');
  const [newdata, setNewData] = useState('');
  const [username, setuserName] = useState('');
  const [userContact, setuserContact] = useState('');

  useEffect(() => {
    const db = firebase.firestore();
    db.collection('userdetail')
      .where("UserId", '==', UserId)
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          setData(doc.data());
        });
      });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
        db.collection('userdetail')
        .where("UserId", '==', UserId)
        .get()
        .then(docs =>{
            docs.forEach(doc => {
                setNewData(doc.id);
            });
        })
  }, []);

  async function updateData(value) {
    try {
      const {name, contact} = value;
      setuserName(name);
      setuserContact(contact);
      console.log('name:' + name + ' contact: ' + contact);
      console.log(auth().currentUser.uid);
        const db = await firebase.firestore();
        db.collection('userdetail')
        .doc(newdata)
        .update({
            name: name,
            contact: contact,
        })
    } catch (error) {
      alert(error.name, error.message);
    }
    
    // console.log(user);
  }
  const textInput1 = useRef(1);
  const textInput2 = useRef(2);

  return (
    <View style={{padding: 10}}>
      <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
        Name: {data.name}
      </Text>
      <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
        Contact: {data.contact}
      </Text>
      <Formik
        initialValues={{name: '', contact: ''}}
        onSubmit={values => {
          updateData(values);
        }}>
        {props => (
          <View>
            <TextInput
              ref={textInput1}
              onChangeText={props.handleChange('name')}
              value={props.values.name}
              style={styles._Username_field}
              placeholderTextColor="#989191"
              placeholder={'Name'}
            />
            <TextInput
              ref={textInput2}
              onChangeText={props.handleChange('contact')}
              value={props.values.conatct}
              style={styles._Username_field}
              placeholderTextColor="#989191"
              placeholder={'Contact'}
            />
            <TouchableOpacity
              onPress={props.handleSubmit}
              style={[styles.container, styles['container_Primary']]}>
              <Text style={[styles.text, styles['text_Primary']]}>Login</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={fetch} style={[styles.container, styles["container_Primary"]]} >
        <Text style={[styles.text, styles["text_Primary"]]}>Login</Text>
        </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={logInPress} style={[styles.container, styles["container_Primary"]]} >
        <Text style={[styles.text, styles["text_Primary"]]}>Login</Text>
        </TouchableOpacity> */}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  custButton: {
    marginTop: 10,
  },
  _Username_field: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#EC7773',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: '5%',
    padding: 10,
    color: 'black',
  },
  container: {
    width: '100%',
    paddingVertical: 10,
    marginTop: 11,
    borderRadius: 5,
  },
  container_Tertiary: {},
  container_Primary: {
    alignItems: 'center',
    backgroundColor: '#EC7773',
  },
  text_Primary: {
    color: 'white',
    fontWeight: '500',
  },
  text_Tertiary: {
    color: 'grey',
    fontWeight: '500',
    textAlign: 'right',
    fontSize: 12,
  },
});
export default UserDetail;
