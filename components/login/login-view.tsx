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
import { User } from "../../store";
import { azureEndpoint } from "../../endpoints";

export default function LoginView(props: any) {
  const [username, setUsername] = useState("");
  const [passkey, setPasskey] = useState("");


  async function storageSetter(data: any[]) {
    // await AsyncStorage.setItem("@username", String(data.username));
    // await AsyncStorage.setItem("@passkey", String(data.passkey));
    // await AsyncStorage.setItem("@pid", String(data.pid));
    // await AsyncStorage.setItem("@firstName", String(data.firstName));
    // await AsyncStorage.setItem("@lastName", String(data.lastName));
    // await AsyncStorage.setItem("@email", String(data.email));
    // await AsyncStorage.setItem("@following", String(data.following));
    // await AsyncStorage.setItem("@followers", String(data.followers));
    const keys: string[] = [
      "@username",
      "@passkey",
      "@pid",
      "@firstName",
      "@lastName",
      "@email",
      "@following",
      "@followers",
    ];
    await AsyncStorageLib.multiSet([keys, data], () => {});
  }

  async function userLogin() {
        
      const response = await axios.patch(`${azureEndpoint}/login`, {
          username: username,
          passkey: passkey,
        }
        );
        
        Alert.alert(response.toString());

        const user: User = response.data;
        if (Boolean(user)) {
          props.verified(true);
          const profile = user.profile;
          const data = [
            profile.username,
            profile.passkey,
            profile.pid,
            profile.firstName,
            profile.lastName,
            profile.email,
            profile.following,
            profile.followers,
          ];
          await storageSetter(data);

          Alert.alert("Welcome Associate!");
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

          <Text style={styles.textstyle2}>
            Not a user yet?{" "}
            <Text
              style={styles.link}
              onPress={() => {
                Linking.openURL("https://www.google.com");
              }}
            >
              Register Now!
            </Text>
          </Text>
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
    height: "10%",
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
