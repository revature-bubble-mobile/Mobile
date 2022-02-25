import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../dtos/profile";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import { azureEndpoint } from "../../endpoints";
import { useDispatch } from "react-redux";
import TestModal from "./test-modal";

export default function LoginView(props: any) {
  const [username, setUsername] = useState("");
  const [passkey, setPasskey] = useState("");
  //const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();


  async function userLogin() {

    const response = await axios.patch(`${azureEndpoint}/login`, {
      username: username,
      passkey: passkey,
    });
    
    let profile: Profile = response.data;

    if (Boolean(profile)) {
      await AsyncStorageLib.setItem("profile", JSON.stringify(profile));
      Alert.alert("Welcome Associate!");      
      props.setVerification(true);
      dispatch({ type: 'user', payload: profile });

    } else {
      Alert.alert("Enter valid credentials please.");
    }
  }

  return (
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.stretch}
            source={require("../../assets/images/bubble-logo.png")}
          />
        </View>
        <View style={styles.container2}>
          <TextInput
            style={styles.inputstyle}
            testID={"username"}
            autoCapitalize={"none"}
            onChangeText={setUsername}
            placeholder="Enter Username"
          />
          <TextInput
            style={styles.inputstyle}
            testID={"passkey"}
            autoCapitalize={"none"}
            onChangeText={setPasskey}
            secureTextEntry={true}
            placeholder="Enter Passkey"
          />

          <Text style={styles.textstyle}>
            <Text
              style={styles.link}
              onPress={() => {
                Linking.openURL("https://www.google.com");
              }}
            >
              Forgot Passkey?
            </Text>
          </Text>

          <Button
            title="Login"
            buttonStyle={{
              backgroundColor: "#00a680",
              borderWidth: 2,
              borderColor: "#00a680",
              borderRadius: 30,
            }}
            containerStyle={{
              width: 100,
              marginHorizontal: "60%",
              marginVertical: 10,
            }}
            titleStyle={{ fontSize: 12 }}
            onPress={userLogin}
          />

          <TestModal/>

          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
  },
  container2: {
    paddingTop: "30%",
  },
  stretch: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 4,
    resizeMode: "contain",
    alignSelf: "center",
    paddingBottom: "10%",
  },
  inputstyle: {
    width: Dimensions.get("window").width / 1.3,
    height: "12%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: "10%",
    marginTop: "5%",
  },
  textstyle: {
    fontSize: 14,
    color: "black",
    marginHorizontal: "10%",
    marginTop: "5%",
  },
  textstyle2: {
    fontSize: 14,
    color: "black",
    marginHorizontal: "10%",
    marginTop: "20%",
    alignSelf: "center",
  },
  link: {
    color: "#fd7e14",
  },
});
