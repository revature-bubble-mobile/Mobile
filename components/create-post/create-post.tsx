import { useCallback, useState } from "react";
import { View, StyleSheet, TextInput, Pressable } from "react-native";
import { Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PanGestureHandler } from "react-native-gesture-handler";

export function CreatePost() {
    const [noLines, setNoLines] = useState(3);
    let lineCount = noLines;
    const [inputTextClicked, setInputTextClicked] = useState(false);

    return (<Card containerStyle={styles.container} wrapperStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={[styles.inputContainer, { borderWidth: inputTextClicked ? 1 : 0 }]}>
            <TextInput multiline={true}
                numberOfLines={noLines}
                style={{ textAlignVertical: 'top', padding: 2, }}
                onPressIn={_ => setInputTextClicked(true)}
                onEndEditing={_ => setInputTextClicked(false)}
                placeholder="What's Poppin'?" />
            {inputTextClicked ? <PanGestureHandler ><Pressable style={styles.resizeInput}><Icon size={20} name="resize-bottom-right" color="#000" /></Pressable></PanGestureHandler> : <></>}
        </View>
    </Card>);
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "rgba(100,100,100,0.1)",
        elevation: 4,

    },
    inputContainer: {
        width: '90%',
        flexDirection: 'column',
        padding: 10,
        borderColor: 'rgba(191,222,255,1)',
        borderRadius: 10,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    inputTxt: {
        width: '100%',
        borderWidth: 0,
    },
    resizeInput: {
        position: 'absolute',
        right: 1,
        bottom: 1,
    },
});
