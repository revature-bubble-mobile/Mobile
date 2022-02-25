import { Image, View } from "react-native";


export default function DrawerFooter() {

    return(<View style={{flex:1, alignItems:"center", justifyContent:"flex-end", paddingBottom:10}}>
    <Image style={{width:200, height:90}} source={require("../../assets/images/bubble-logo.png")}/>
</View>)
}