import { Image, View, StyleSheet } from "react-native";


export default function DrawerFooter() {

    return(<View style={styles.container}>
        <Image style={styles.image} source={require("../../assets/images/bubble-logo.png")}/>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems:"center", justifyContent:"flex-end", marginBottom:10, marginHorizontal:10
    },
    image: {
        width:"100%",
        height: undefined,
        aspectRatio: 445/200
    }
})