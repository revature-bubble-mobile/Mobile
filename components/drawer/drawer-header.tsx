import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { User } from "../../store";

export default function DrawerHeader() {

    const user:User = useSelector((state:User) => state);

    const navigation = useNavigation<NavigationProp<any>>();

    const userPic = user.profile.imgurl;

    return(
    <Pressable style={styles.pressable} onPress={() => {navigation.navigate('Profile')}}>
        <Image style={styles.image} source={userPic?{uri:userPic}:require("../../assets/favicon.png")}/>
        <Text style={styles.text}>{user.profile.firstName + " " + user.profile.lastName}</Text>
  </Pressable>)
}

const styles = StyleSheet.create({
  text:{
    flex:0.2,
    fontSize:25
  },
  image:{
    flex:0.8,
    borderRadius:10000,
    aspectRatio:1
  },
  pressable:{
    flex:1.0,
    alignItems:"center"
  }
})