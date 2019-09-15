import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
    ActivityIndicator,
    Button

} from 'react-native';
import {AppConfig} from "../../config"


import {Text, ListItem, List} from 'native-base';

import * as Permissions from 'expo-permissions';

import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {ApiService} from "../../api";

const testtext = 'testtxt';
const pvc = require('../../assets/pvc.png');

const PETE = require('../../assets/pete.png');
const PVC = require('../../assets/pvc.png');
const HDPE = require('../../assets/hdpe.png');
const PP = require('../../assets/pp.png');
const LDPE = require('../../assets/ldpe.png');
const PS = require('../../assets/ps.png');
const Others = require('../../assets/other.png');

const img_data = {
    PETE,
    HDPE,
    PVC,
    LDPE,
    PP,
    PS,
    Others,
}

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        image: {},
        predictionData: null,
        loading: false
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.titleContainer}>
                        <Text h1>{AppConfig.title}</Text>

                    </View>

                    <View style={styles.actionsContainer}>

                        <View style={styles.callToActionContainer}>
                            <View style={{flex:0.5 , marginRight:10}}>
                            <Button 
                                title='Camera' raised onPress={this._pickImageFromCamera} />
                            </View>

                            <View style={{flex: 0.5}}>
                            <Button 
                                title='Local Image' raised onPress={this._pickImageFromLibrary} />
                            </View>

                        </View>

                    </View>

                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={{ height: 200, width: 200 }} />

                    </View>


                    <View style={styles.predictionsContainer}>
                        {this.renderPredictions()}
                    </View>
                </View>
            </ScrollView>
                );
            }
        
        
    renderPredictions() {

        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#0000ff" />
                } else if (this.state.predictionData) {
                    let {class: predictedClass, predictions} = this.state.predictionData;
                predictions = predictions.sort((a, b) => b.loss - a.loss).slice(0, 3);
                console.log('results: ')
                console.log(predictions)
                console.log(predictions[0])
                console.log(predictions[0]['class'])
                const {carbon_footprint, description, full_name, p_type, hazard, recycability} = predictions[0];
                const img = img_data[p_type]; 
                return (
                <View style={styles.predictionsContentContainer}>
                    {/* <Text h3>Predictions</Text>
                    <List>
                        {
                            predictions.map((item, index) => (
                                <ListItem
                                    key={index}
                                    title={item.class}
                                    subtitle={`output: ${item.output}  prob: ${item.prob}`} hideChevron={true}
                                />
                            ))
                        }
                    </List> */}
                     <Text h3>Plastic Product: {predictions[0]['class']}</Text>
                        <View style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Image
                                // style={{width: 50, height: 50}}
                                source={img}
                            />
                            </View>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>{full_name}</Text>
                            </View>

                        </View>
                        <View style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>Carbon Footprint:</Text>
                            </View>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>{carbon_footprint}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>Description: </Text>
                            </View>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>{description}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>Recycability: </Text>
                            </View>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>{recycability}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            // backgroundColor: 'red',
                            flexDirection: 'row',
                            padding: 10,
                        }}>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>Hazard: </Text>
                            </View>
                            <View  style={{
                            flex: 0.5,
                            }}>
                                <Text>{hazard}</Text>
                            </View>
                        </View>
                </View>
            )
        } else {
            return null
        }
    }


    _verifyPermissions = async () => {
        console.log("Verifying Permissions");
        const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            const { status, permissions }  = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
           
            if (status === 'granted') {
                console.log("Permissions granted");
                return true
            } else {
                alert('Hey! You have not enabled selected permissions');
                return false
            }

        }else{
            return true;
        }
    };

    _pickImageFromLibrary = async () => {
        const status = await this._verifyPermissions();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (result.cancelled) {
            console.log("Cancelled")
        } else {

            this._processImage(result);
        }
    };

    _pickImageFromCamera = async () => {
        const status = await this._verifyPermissions();

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (result.cancelled) {
            console.log("Cancelled")
        } else {
            this._processImage(result);

        }

    };

    _processImage = async (imageData) => {

        const resizedResult = await ImageManipulator.manipulateAsync(
            imageData.uri,
            [{resize: {width: 400}}],
            {compress: 0.7}
        );

        console.log(resizedResult);

        this.setState({image: {uri: imageData.uri}, loading: true});


        await this._classifyImage(imageData.uri)
    };

    _classifyImage = async (imageURI) => {

        try {
            const predictionData = await ApiService.predict(imageURI);

            this.setState({predictionData: predictionData, loading: false});

        } catch (e) {
            this.setState({loading: false});
            alert(e);
            console.log(e)

        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,

    },

    contentContainer: {
        paddingTop: 10,
        marginTop: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
        flex: 2,
        justifyContent: 'center',
    },
    actionsContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
    },
    imageContainer: {
        flex: 4,
        alignItems: 'center',

    },
    callToActionContainer: {
        flex: 1,
        flexDirection: "row"
    },
    feedBackContainer: {
        flex: 1,
    },

    feedBackActionsContainer: {
        flex: 1,
        flexDirection: "row"
    },

    predictionsContainer: {
        flex: 4,
        padding: 10,
        justifyContent: 'center',

    },

    predictionsContentContainer: {
        flex: 4,
        padding: 10,

    },

    predictionRow: {
        flexDirection: "row",
        //justifyContent: "space-between"
    },


    predictionRowCategory: {
        flex: 1,
        justifyContent: "space-between"
    },

    predictionRowLabel: {
        flex: 1,
        justifyContent: "space-between"

    }
});