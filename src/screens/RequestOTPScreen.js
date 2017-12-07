import React, { Component } from 'react';
import axios from 'axios'
import firebase from 'firebase'
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements'
import { CardSection, Card, Input, Spinner } from '../common'

class RequestOTPScreen extends Component {
    static navigationOptions = () => {
        return ({
            title: 'Surya\'s Todo App'
        })
    }
    state = {
        phone: '',
        message: '',
        loading: false
    }
    componentWillMount = async () => {
        try {
        const savedToken = await AsyncStorage.getItem('token');
        const savedPhone = await AsyncStorage.getItem('phone');
        this.setState({ phone: savedPhone, token: savedToken });
        console.log('get item', this.state.token)
        firebase.auth().signInWithCustomToken(this.state.token)
        .then(() => {
            if (this.state.token) {
                this.props.navigation.navigate('todo', { phone: this.state.phone })
            }
        })
        
        } catch (err) {
            console.log(err)
        }
    }
    componentDidMount() {
       
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
                title='Request OTP'
                icon={{ name: 'perm-device-information' }} 
                onPress={() => {
                    if(this.state.phone.substr(0,2) !== "08") {
                        return (
                            alert('Nomor telepon harus berawalan 08..')
                        )
                    }
                    console.log('requesting OTP');
                    this.setState({ loading: true, message: '' });
                    axios({
                    method: 'POST',
                    url: 'https://us-central1-todoapp-fbe30.cloudfunctions.net/requestOtp',
                    data: { "phone": this.state.phone }
                    })
                    .then((response) => {
                        console.log(response);
                        this.setState({ loading: false })
                        this.props.navigation.navigate('verify', { phone: this.state.phone })
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                    }} 
                />
        )
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
                    {this.renderButton()}
                
                </View>
             </CardSection> 
        </Card>
        )
    }
}

export default RequestOTPScreen;