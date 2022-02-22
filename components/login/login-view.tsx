import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions, Linking,TextInput, Alert } from "react-native";
import { Button, Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../../dtos/profile";

export default function LoginView() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const tempUser:Profile={
      username: "borats",
      passkey: "wordpass",
      pid: "",
      firstName: "",
      lastName: "",
      email: "",
      following: [],
      followers: []
  }

  const loginPayload = {
    username: username,
    password: password,
  };

  // const response = await fetch(""),{ 
  //   method: "POST",
  //   body: JSON.stringify(loginPayload),
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json"
  //   },

  //  } 

/*   
  await AsyncStorage.setItem("username", profile.username);
  await AsyncStorage.setItem("isAuthorized", profile.passKey);
 */

  function userLogin(){
    if(tempUser.username === username && tempUser.passkey===password){
      Alert.alert("Welcome Associate!");
    } else
      Alert.alert("Interloper identified!");
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
        <TextInput style={styles.inputstyle} testID={"username"} autoCapitalize={"none"} onChangeText={setUsername} placeholder="Enter Username" />
        <TextInput style={styles.inputstyle} testID={"password"} autoCapitalize={"none"} onChangeText={setPassword} secureTextEntry={true} placeholder="Enter Password" />

        <Text style={styles.textstyle}>
        <Text style={styles.link} onPress={() => {Linking.openURL('https://www.google.com')}}>
          Forgot Password?
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

        <Text style={styles.textstyle2}>Not a user yet?{" "}
        <Text style={styles.link} onPress={() => {Linking.openURL('https://www.google.com')}}>
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
  link:{
    color: "#fd7e14"

  }
});