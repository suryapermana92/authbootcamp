import React, { Component } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios'
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common';


class signupForm extends Component {
    state = {
        signup: true,
        email: '',
        password:'',
        message:'',
        sukses:'',
        loading: false
    }
    onSignup() {
        const { signup, email, password } = this.state
        this.setState({ loading: true, message: '' })
        axios.post({
            method: 'POST',
            url: 'https://us-central1-advauth-971b7.cloudfunctions.net/createUser',
            data: { "phone": this.state.phone, "email": this.state.email }
        })
        
    }
    onRequest() {
        
    }
    
    renderOtp() {
        if (this.state.signup === false) {
            return (
                <CardSection >
                    <Input text='OTP Code' placeholder='enter 4 digit OTP Code'/>
                </CardSection>
            )
        }
    }

    renderMessage() {
        if (this.state.message) {
            if(this.state.sukses) {
            return (
                <CardSection>
                    <Text style={{ color: 'green'}}>{this.state.message}</Text>
                </CardSection>
            )
        }
            return (
        <CardSection>
        <Text style={{ color: 'red'}}>{this.state.message}</Text>
        </CardSection>
            )
        
    }
}
renderEmail() {
    if (this.state.signup === true) {
    return (
        <CardSection >
        <Input 
        text='Email' 
        placeholder='name@mail.com'
        onChangeText={(text) => {
            this.setState({ email: text })
            }}
        
        autoCorrect={false}
        />
    </CardSection>
    )
}
}
    renderRequest() {

    }
    
    renderButton() {
        if (this.state.loading) {
            return (
                <ActivityIndicator 
                style={{ 
                    width: '100%', 
                    justifyContent: 'center', 
                    alignItems: 'center'}} 
                size='large'
                />
    
            )
        }
        return (
        <CardSection> 
            
            <Button onPress={() => this.onSignup()}>
            {this.state.signup ? 'Sign up' : 'Login'}
            </Button>
        </CardSection> 
        )
    }
    render() {
        const { signup, email, password, message, sukses } = this.state
        console.log(sukses,message)
        return (
        <Card>
            {this.renderEmail()}
            <CardSection>
                <Input 
                text='Phone' 
                placeholder='+62 000-0000'
                onChangeText={(text) => {
                    this.setState({ phone: text });
                    }
                }
                
                />
                
            </CardSection>
            {this.renderOtp()}
            {this.renderMessage()}
            
            {this.renderButton()}
           
             <CardSection>
                <TouchableOpacity 
                style={{ flex:1, alignItems: 'center' }}
                onPress={() => this.setState({ signup: !this.state.signup, message:'' }) } 
                >
                    <View >
                        <Text>
                        {!this.state.signup ? 'or Sign up' : 'or Login'}
                        </Text>
                    </View>
                </TouchableOpacity>
             </CardSection> 
             <CardSection>
             <TouchableOpacity 
                onPress={() => {
                    this.setState({ loading: true })
                    axios({
                    method: 'POST',
                    url: 'https://us-central1-advauth-971b7.cloudfunctions.net/requestOtp',
                    data: { "phone": this.state.phone }
                    })
                
                    .then(response => this.setState({ sukses: true, message: response.data.message, loading: false }))
                    .catch(err => console.log(err))
                    }
                } 
                >
                    <View >
                        <Text>
                        Click Here to Request One Time Password
                        </Text>
                    </View>
                </TouchableOpacity>
             </CardSection>
        </Card>
    );
    }
}


export default signupForm;
