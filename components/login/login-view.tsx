import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  TextInput,
  Alert,
} from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../dtos/profile";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import axios from "axios";
import { azureEndpoint } from "../../endpoints";
import { Provider, useDispatch } from "react-redux";
import RegistrationModal from "./registration-modal";
import { store } from "../../store";

export default function LoginView(props: {setVerification: (verification: boolean) => void}) {
  const [username, setUsername] = useState("");
  const [passkey, setPasskey] = useState("");

  const dispatch = useDispatch();

  async function userLogin() { 
    let response:any

    try {
    response = await axios.patch(`${azureEndpoint}/login`, {
      username: username,
      passkey: passkey,
    });

    let profile: Profile = response.data;

    if (profile) {
        await AsyncStorageLib.setItem("profile", JSON.stringify(profile));
        Alert.alert("Welcome Associate!");
        props.setVerification(true);
        dispatch({ type: "user", payload: profile });
    } else {
      Alert.alert("Enter valid credentials please.");
    }
    } catch (error) {
      Alert.alert("Enter valid credentials please.");
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
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
            backgroundColor: "#474C55",
            borderWidth: 2,
            borderColor: "#474C55",
            borderRadius: 30,
            marginBottom: 20,
          }}
          containerStyle={{
            width: 100,
            marginHorizontal: "60%",
            marginVertical: 10,
          }}
          titleStyle={{ fontSize: 16 }}
          onPress={userLogin}
        />

        <RegistrationModal />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
  },
  container2: {
    paddingTop: "10%",
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
    borderColor: "#474C55",
    borderWidth: 2,
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
