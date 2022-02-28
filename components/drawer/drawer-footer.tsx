import { Image, View, StyleSheet } from "react-native";


export default function DrawerFooter() {

    return(<View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/images/bubble-logo.png")}/>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems:"center", justifyContent:"flex-end", paddingBottom:10, paddingHorizontal:10
    },
    image: {
        width:"100%",
        height:"43%"
    }
})