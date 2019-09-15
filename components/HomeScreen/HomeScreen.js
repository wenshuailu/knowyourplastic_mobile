import React from "react";
import { StatusBar, Image, View } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        {/* <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header> */}
        <Content padder>
          {/* <Card>
            <CardItem>
              {/* <Body>
                <Text h2>Know Your Plastic</Text>
              </Body> */}
          <View style={{flex: 1, padding:1}}>
          <Image
            source={require('../../assets/testcover.png')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              aspectRatio: 1.4, 
              resizeMode: 'contain',
              flexGrow: 1,
            }}>
          </Image>
          </View>
            {/* </CardItem>
          </Card> */}
          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Camera")}>
            <Text>Classifier</Text>
          </Button>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Profile")}>
            <Text>Goto Profiles</Text>
          </Button>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Resource")}>
            <Text>Resource on Plastic</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}