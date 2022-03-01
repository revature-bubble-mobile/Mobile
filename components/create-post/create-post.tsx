import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TextInput, PanResponder, Animated, ToastAndroid, Platform } from "react-native";
import { Card, Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Post from "../../dtos/post";
import { azureEndpoint } from "../../endpoints";

export function CreatePost(props:{getter?: Function}) {
    const [inputTxt, setInputTxt] = useState('');
    const pan = useRef(new Animated.ValueXY()).current;

    async function post() {
        if (inputTxt == '') {
            AlertORToast('Gotta type something before you post Bruh!');
        }
        else {
            let post: Post = {
                psid: "",
                creator: "-MwDDfSFxbE7KDt9aWY4",
                body: inputTxt,
                datePosted: new Date(),
            }
            const response = await fetch(`${azureEndpoint}/post`, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': "application/json"
                }
            });
            if (response.status === 201) {
                AlertORToast("Successfully uploaded post");
                props.getter? props.getter() : null
            } else {
                AlertORToast('Failed to send Post to Server');
            }
        }
    }

    const [inputTextClicked, setInputTextClicked] = useState(false);

    return (<Card containerStyle={styles.container} wrapperStyle={styles.wrapperContainer}  >
        {/* <View style={{ alignItems: 'center' }}> */}
            <View style={[styles.inputContainer, { borderWidth: inputTextClicked ? 1 : 0 }]}>
                <GetTextInput inputTxt={inputTxt} setInputTxt={setInputTxt} setInputTextClicked={setInputTextClicked} inputTextClicked={inputTextClicked} pan={pan} />
            </View>
        {/* </View> */}
        <View style={{ alignItems: 'flex-end', marginRight: "2%", marginTop: '2%' }}>
            <Button buttonStyle={styles.postBtn} onPress={post} title="Post" titleStyle={styles.postTxt} />
        </View>
    </Card>);
}

export function GetTextInput(props: { inputTxt: string, setInputTxt: Function, setInputTextClicked: Function, inputTextClicked: boolean, pan: Animated.ValueXY }) {
    const { inputTxt, setInputTxt, inputTextClicked, setInputTextClicked, pan } = props;
    const [noLines, setNoLines] = useState(1);
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
                if (numLine > 1)
                    setNoLines(numLine);
                else
                    setNoLines(1);
            },
        })
    ).current;

    useEffect(() => {
        setNoLines(3);
    }, []);

    return (<>
        <TextInput
            numberOfLines={noLines}
            multiline={true}
            value={inputTxt === '' ? undefined : inputTxt}
            style={{ textAlignVertical: 'top', padding: 2, minHeight: 50 }}
            onPressIn={_ => setInputTextClicked(true)}
            onEndEditing={_ => setInputTextClicked(false)}
            onChangeText={t => setInputTxt(t)}
            placeholder="What's Poppin'?" />
        {inputTextClicked ? <Animated.View style={{
            transform: [{ translateY: pan.y }], position: 'absolute', right: 1, bottom: 1, padding: 2,
        }} {...panResponder.panHandlers}><Icon size={25} name="resize-bottom-right" color="#000" /></Animated.View> : <></>}
    </>);
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        backgroundColor: '#fff',
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

function AlertORToast(txt: string) {
    if (Platform.OS === 'android') {
        ToastAndroid.showWithGravityAndOffset(txt,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            0,
            350
        );
    } else {
        alert(txt);
    }
}