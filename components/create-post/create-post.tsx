import { useRef, useState } from "react";
import { View, StyleSheet, TextInput, PanResponder, Animated, Pressable, Text } from "react-native";
import { Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function CreatePost() {

    function post() {
        alert('Pressed POST');
    }

    const pan = useRef(new Animated.ValueXY()).current;
    const [inputTextClicked, setInputTextClicked] = useState(false);

    return (<Card containerStyle={styles.container} wrapperStyle={styles.wrapperContainer}>
        <View style={{ alignItems: 'center' }}>
            <View style={[styles.inputContainer, { borderWidth: inputTextClicked ? 1 : 0 }]}>
                <GetTextInput setInputTextClicked={setInputTextClicked} inputTextClicked={inputTextClicked} pan={pan} />
            </View>
        </View>
        <View style={{ alignItems: 'flex-end', marginRight: "2%", marginTop: '2%' }}>
            <Pressable style={styles.postBtn} onPress={post}><Text style={styles.postTxt}>Post</Text></Pressable>
        </View>
    </Card>);
}

export function GetTextInput(props: { setInputTextClicked: Function, inputTextClicked: boolean, pan: Animated.ValueXY }) {
    const { inputTextClicked, setInputTextClicked, pan } = props;
    const [noLines, setNoLines] = useState(3);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.y.setOffset(
                    //@ts-ignore
                    pan.y._value,
                );
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dy: (() => { pan.y.setValue(0); return pan.y })() }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                //@ts-ignore
                let yval = pan.y._value;
                let numLinesY = Math.ceil(yval / 10);

                const numLine = noLines + numLinesY;
                if (noLines + numLinesY > 1)
                    setNoLines(numLine);
                else
                    setNoLines(1);
            },
        })
    ).current;

    return (<><TextInput
        multiline
        numberOfLines={noLines}
        style={{ textAlignVertical: 'top', padding: 2 }}
        onPressIn={_ => setInputTextClicked(true)}
        onEndEditing={_ => setInputTextClicked(false)}
        placeholder="What's Poppin'?" />

        {inputTextClicked ? <Animated.View style={{
            transform: [{ translateY: pan.y }], position: 'absolute', right: 1, bottom: 1, padding: 2,
        }} {...panResponder.panHandlers}><Icon size={20} name="resize-bottom-right" color="#000" /></Animated.View> : <></>}
    </>);
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "rgba(100,100,100,0.1)",
        elevation: 4,
    },
    wrapperContainer: {
        width: '100%',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '98%',
        flexDirection: 'column',
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(191,222,255,1)',
        borderRadius: 10,
        backgroundColor: '#fff',

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
    postBtn: {
        backgroundColor: 'rgba(71,76,85,1)',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 2,
    },
    postTxt: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold',
    }
});
