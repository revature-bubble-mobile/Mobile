import { Text, View, StyleSheet } from "react-native";

export function CreatePost() {
    return (<View style={styles.container}>
        <Text>SOMBODY</Text>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', height: '100%',
        borderWidth: 1,
        position: 'absolute',
        borderColor: "rgba(255,0,0,1)"
    },
});
