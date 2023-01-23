import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
// import icons from '../components/icons'

function Orderdetail({navigation}) {
    return (
        <ScrollView scrollEnabled={true}>
        <View style={{ flex: 1 , backgroundColor:"white"}}>
            <View style={{ flexDirection: 'row', height: 50, width: "100%", borderBottomWidth: 1, marginBottom:10 }}>
            
            <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} style={{paddingLeft:'6%',width:50, justifyContent:'center'}}>
                    <Image source={require('../assets/icons/back.png')} resizeMethod='auto' 
                    style={{height:25, width:25}}/>
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: '25%' }}>
                    <Text style={{ color:'black', justifyContent: 'center', alignItems: 'center', fontWeight: '500', fontSize: 20 }}>
                        OrderDetail
                    </Text>
                </View>


            </View>
            <View style={{ height: '100%', backgroundColor: 'grey', borderBottomWidth: 1 }}>
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/c.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20, }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{color:'black', marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: '10%', backgroundColor: 'white', }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/p.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{ color:'black',fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{ color:'black',marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/pr.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{color:'black', marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/dl.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{ color:'black',fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{color:'black', marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/p.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{ marginTop: 2,color:'black' }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{color:'black', flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/c.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{ color:'black',marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/dl.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{ color:'black',marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{color:'black', flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/p.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{ color:'black',fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{ color:'black', marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/c.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{ color:'black',marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/p.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{color:'black', marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/p.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{ color:'black',fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{color:'black', marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                
                <View style={{ height: '10%', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        <Image
                            source={require("../assets/images/dl.png")}
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <Text style={{color:'black', fontWeight: '600', fontSize: 15 }}>
                                CONFORMED
                            </Text>
                            <Text style={{ color:'black',marginTop: 2 }}>Your order has been conformed</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            <Text style={{color:'black'}}>
                                09 Nov
                            </Text>
                        </View>
                    </View>
                </View>
                
            </View>
        </View>
        </ScrollView>
    )


}



export default Orderdetail