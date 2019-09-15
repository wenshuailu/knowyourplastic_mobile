import React from "react";
import { AppRegistry, Alert } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text, Form, Item, Input, Label } from "native-base";
import { StackNavigator } from "react-navigation";
import EditScreenOne from "./EditScreenOne.js";
import EditScreenTwo from "./EditScreenTwo.js";
export default class Profile extends React.Component {
  componentDidMount() {
    Alert.alert("No Users Found", "Oops, Looks like you are not signed in");
  }
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input 
                id="email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorMessage="Please enter a valid email address"
                onInputChange={()=>{}}
                initialValue=""
              />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input 
                id="password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorMessage="Please enter a valid email password"
                onInputChange={()=>{}}
                initialValue=""
              />
            </Item>
            <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => {}}>
            <Text>Login</Text>
          </Button>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => {}}>
            <Text>SignUp</Text>
          </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
Profile.navigationOptions = ({ navigation }) => ({
  header: (
    <Header>
      <Left>
        <Button transparent onPress={() => navigation.navigate("DrawerOpen")}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Profile</Title>
      </Body>
      <Right />
    </Header>
  )
});
