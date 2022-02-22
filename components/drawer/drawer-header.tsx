import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { User } from "../../store";


export default function DrawerHeader() {

    const user:User = useSelector((state:User) => state);

    return(<View style={{flex:1, alignItems:"center"}}>
        <Image style={{width:200, height:200, borderRadius:100}} source={require("../../assets/favicon.png")}/>
        <Text>{user.profile.firstName + " " + user.profile.lastName}</Text>
  </View>)
}