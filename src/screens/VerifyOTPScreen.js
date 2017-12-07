import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import axios from 'axios'
import { CardSection, Card, Input, Spinner } from '../common'
import firebase from 'firebase'

class VerifyOTPScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return ({
            title: navigation.state.params.phone
        })
    }
    state = {
        loading: false,
        otp: '',
        token: '',
        phone: this.props.navigation.state.params.phone
    }

    
    renderButton() {
        if (this.state.loading) {
            return (
                <View style={{ height: 50, alignItems: 'center'}}>
                <Spinner />
                </View>
            )
        }
        return (
        <Button
        title='Verify OTP'
        icon={{ name: 'check-box' }} 
        onPress={() => {
            this.setState({ loading: true, message: '' })
            axios({
            method: 'POST',
            url: 'https://us-central1-todoapp-fbe30.cloudfunctions.net/verifyOtp',
            data: {
                "otp": this.state.otp,
                "phone": this.state.phone
                }
            })
            .then((response) => {
                if(response.data.message) {
                    this.setState({ loading: false })
                    alert(response.data.message)
                }
                console.log(response)
                firebase.auth().signInWithCustomToken(response.data.token)
                    .then(async (r) => {
                        this.setState({ loading: false, token: response.data.token })
                        await AsyncStorage.setItem('token', this.state.token)
                        await AsyncStorage.setItem('phone', this.state.phone)
                        console.log('set item', this.state.token)
                        this.props.navigation.navigate('todo', { phone: this.state.phone })
                    })
            })
            .catch((err) => {
                console.log(err);
            });
        }}
        />
    )
    }
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
                {this.renderButton()}
                </View>
             </CardSection> 
        </Card>
        )
    }
}

export default VerifyOTPScreen;