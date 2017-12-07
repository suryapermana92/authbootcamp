import React, { Component } from 'react';
import axios from 'axios'
import _ from 'lodash'
import firebase from 'firebase'
import { Text, View, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import { CardSection, Card, Input } from '../common'


class TodoScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return ({
            title: 'Surya\'s Todo App',
            headerRight: <Button 
                            title='Logout'
                            onPress={() => {
                                firebase.auth().signOut()
                                .then(async() => {
                                   await AsyncStorage.removeItem('token')
                                   await AsyncStorage.removeItem('phone')
                                    navigation.navigate('request')
                                    
                                });  
                            }}
                        />
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            listInput: '',
            message: '',
            todoList: []
        };

        this.getList = this.getList.bind(this);
        this.renderList = this.renderList.bind(this);
        
    }
    
    getList() {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/list`)
        .on('value', snapshot => {
            const lists = snapshot.val();
            console.log(lists);            

            this.setState({
                todoList: _.map(lists, (item, key) => {
                    return {
                        ...item,
                        key: key
                    }
                })
            })
        });   
    }

    componentDidMount() {
        this.getList();
    }
    logout() {
      
    }
    listSave() {
        if (this.state.listInput === '') {
            return (
                alert('Item Name Should Not Left Blank')
            )
        }
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/${currentUser.uid}/list`)
        .push({ title: this.state.listInput })
        .then(()=> {
            
            Alert.alert(
                'Add Item Success',
                `Successfully added ${this.state.listInput} to list`,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
              this.setState({ listInput: '' })
        })
    }
    listDelete(key) {
        Alert.alert(
            'Delete Item',
            `Are you sure want to delete this item?`,
            [
              {text: 'OK', onPress: () => {
                const { currentUser } = firebase.auth();
                firebase.database().ref(`/users/${currentUser.uid}/list/${key}`)
                .remove()
                  }},
                  {text: 'Cancel', onPress: () => {
                      return;
                  }}
            ],
            { cancelable: false }
        )   
    }

    renderList() {
        return this.state.todoList.map((item, index) => {
            return (
                <CardSection  key={index}>
                <Text>{item.title}</Text>
                <Button 
                icon={{ name: 'clear' }}
                onPress={this.listDelete.bind(this, item.key)}/>
                </CardSection>
            )
        })
    }

    render() {
        
        console.log(this.state.listInput)
        return (
            <View style={{ flex: 1 }}>
                <Card>
                    <CardSection>

                        <FormLabel> Create New List: </FormLabel>
                    </CardSection>

                    <View style={{backgroundColor:'white'}}>
                        <FormInput 
                        autoCorrect={false}
                        placeholder='enter list name'
                        value={this.state.listInput}
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
            
                
                </Card>
                <View style={{ flex: 1 }}>
                    <Card>
                    <Text style ={{ alignSelf: 'center'}}> Your Todo List </Text>
                    <ScrollView>
                    {this.renderList()}
                    </ScrollView>
                    </Card>
                </View>
            </View>
        )
    }
}

export default TodoScreen;