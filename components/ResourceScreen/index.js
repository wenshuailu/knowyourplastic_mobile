import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
const pp = require('../../assets/pp.png');
const pvc = require('../../assets/pvc.png');
const img_data = [
    {
        img: pp,
        key: 'pp',
        text: 'pp',
        note: 'ppppppp'
    },
    {
        img: pvc,
        key: 'pvc',
        text: 'pvc',
        note: 'pvcccccc'
    }
]
export default class ListThumbnailExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
        <List
            dataArray={img_data}
            renderRow={data =>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square large source={data.img} />
                </Left>
                <Body>
                  <Text>
                    {data.text}
                  </Text>
                  <Text numberOfLines={1} note>
                    {data.note}
                  </Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>View</Text>
                  </Button>
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}


// import React, {Component} from 'react';
// import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

// export default class ModalExample extends Component {
//   state = {
//     modalVisible: false,
//   };

//   setModalVisible(visible) {
//     this.setState({modalVisible: visible});
//   }

//   render() {
//     return (
//       <View style={{marginTop: 22}}>
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={this.state.modalVisible}
//           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
//           }}>
//           <View style={{marginTop: 22}}>
//             <View>
//               <Text>Hello World!</Text>

              {/* <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
} */}