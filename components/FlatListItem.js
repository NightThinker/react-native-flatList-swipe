
import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert } from 'react-native';
import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';

class FlatListItem extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            activeRowKey: null,
            sectionID: null,
            rowID: null,
        };          
    }
    render() {   
        const swipeSettings = {
            autoClose: true,
            // close: {!(this.state.sectionID === sectionID && this.state.rowID === rowID)}
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }              
            },          
            onOpen: (sectionID, rowID, direction) => {
                this.setState({ activeRowKey: this.props.item.key,sectionID: sectionID , rowID: rowID });
            }, 
            // close: {},
            right: [
                { 
                    onPress: () => {    
                        const deletingRow = this.state.activeRowKey;          
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [                              
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {        
                                flatListData.splice(this.props.index, 1); 
                                //Refresh FlatList ! 
                                this.props.parentFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          ); 
                    }, 
                    text: 'Delete', type: 'delete' 
                }
            ],  
            rowId: this.props.index, 
            sectionId: 1    
        };  
        console.log('sectionID : ',this.state.sectionID);
        console.log('close : ',!(this.state.sectionID === swipeSettings.sectionId && this.state.rowID === this.props.index));             
        return (  
            <Swipeout {...swipeSettings} 
                // close={(this.state.rowID === this.props.index)}
                >
                <View style={{
                flex: 1,
                flexDirection:'column',                                
                }}>            
                    <View style={{
                            flex: 1,
                            flexDirection:'row',
                            // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'                
                            backgroundColor: 'mediumseagreen'
                    }}>            
                        <Image 
                            source={{uri: this.props.item.imageUrl}}
                            style={{width: 100, height: 100, margin: 5}}
                        >

                        </Image>
                        <View style={{
                                flex: 1,
                                flexDirection:'column',   
                                height: 100                 
                            }}>            
                                <Text style={styles.flatListItem}>{this.props.item.name}</Text>
                                <Text style={styles.flatListItem}>{this.props.item.foodDescription}</Text>
                        </View>              
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor:'white'                            
                    }}>
                
                    </View>
                </View>   
            </Swipeout>      
            
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,  
    }
});


export default FlatListItem