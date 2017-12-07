import React, { Component } from 'react';
import axios from 'axios'
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import { CardSection, Card, Input } from '../common'

class RequestOTPScreen extends Component {
    static navigationOptions = () => {
        return ({
            title: 'Surya\'s Todo App'
        })
    }
    state = {
        phone: '',
        message: ''
    }
    render() {
        return (
            <Card>
            <CardSection>
                <Input 
                text='Phone Number'
                placeholder='08xxxxxxxxxxx'
                onChangeText={(text) => {
                    this.setState({ phone: text });
                    }
                }
                />
                
            </CardSection>
             <CardSection>
                <View style={{ flex:1 }}>
                <Button
                title='Request OTP'
                icon={{ name: 'perm-device-information' }} 
                onPress={() => {
                    console.log('requesting OTP');
                    this.setState({ message: '' });
                    axios({
                    method: 'POST',
                    url: 'https://us-central1-todoapp-fbe30.cloudfunctions.net/requestOtp',
                    data: { "phone": this.state.phone }
                    })
                    .then((response) => {
                        console.log(response);
                        this.props.navigation.navigate('verify', { phone: this.state.phone })
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

export default RequestOTPScreen;