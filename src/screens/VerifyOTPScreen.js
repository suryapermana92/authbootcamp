import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import axios from 'axios'
import { CardSection, Card, Input } from '../common'
import firebase from 'firebase'

class VerifyOTPScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return ({
            title: navigation.state.params.phone
        })
    }
    state = {
        otp: '',
        token: '',
        phone: this.props.navigation.state.params.phone
    }

    // componentDidMount = async () => {
    //     const savedToken = await AsyncStorage.getItem('token');
    //     this.setState({ token: savedToken });
    //     this.setState({ phone: this.props.navigation.state.params.phone });
    // }
    render() {
        console.log(this.state.otp, this.state.phone)
        return (
            <Card>
            <CardSection>
                <Input 
                text='OTP'
                placeholder='enter 4 digit OTP'
                onChangeText={(text) => {
                    this.setState({ otp: text });
                    }
                }
                />
                
            </CardSection>
             <CardSection>
                <View style={{ flex:1 }}>
                <Button
                title='Verify OTP'
                icon={{ name: 'check-box' }} 
                onPress={() => {
                    this.setState({ message: '' })
                    axios({
                    method: 'POST',
                    url: 'https://us-central1-todoapp-fbe30.cloudfunctions.net/verifyOtp',
                    data: {
                        "otp": this.state.otp,
                        "phone": this.state.phone
                        }
                    })
                    .then((response) => {
                        console.log(response)
                        firebase.auth().signInWithCustomToken(response.data.token)
                        this.setState({ token: response.data.token })
                        this.props.navigation.navigate('todo', { phone: this.state.phone })
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }}
                />
                </View>
             </CardSection> 
        </Card>
        )
    }
}

export default VerifyOTPScreen;