import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'
import firebase from 'firebase'
import { Text, View } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { CardSection, Card, Input } from '../common'

class TodoScreen extends Component {
    static navigationOptions = () => {
        return ({
            title: 'Surya\'s Todo App',
            right: 'Log Out'
        })
    }
    state = {
        listInput: '',
        message: ''
    }
 
    getList() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/list`)
        .on('value', snapshot => {
            const lists = snapshot.val();
            console.log(lists);
            const render = _.map(lists);
            console.log(render);
            return (
                <CardSection>
                    {this.renderList(render)}
                </CardSection>
                );
            }
        );   
    }
    listSave() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/list`)
        .push({ title: this.state.listInput })
        .then(this.setState({ reset: true }));
    }
    renderList(render) {
        return (
            render.map((list, index) => {
                console.log(list)
                return (
            <Text key={index}>
                abc
            </Text>
                );
            })
        );
    }
    render() {
        console.log(this.state.listInput)
        return (
            <Card>
            <CardSection>
                
                <FormLabel> Create New List: </FormLabel>
                </CardSection>
                
                <View style={{backgroundColor:'white'}}>
                <FormInput 
                
                placeholder='enter list name'
                onChangeText={(text) => {
                    this.setState({ listInput: text });
                    }
                }
                />
                <Button
                title='Add'
                icon={{ name: 'playlist-add' }}
                onPress={this.listSave.bind(this)}
                />
                </View>
                <Card>
                {this.getList()}
                </Card>
        </Card>
        )
    }
}

export default TodoScreen;
