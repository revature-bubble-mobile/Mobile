import { useState } from "react";
import { Text, TextInput, Pressable, Alert, View, LogBox, Image, Modal, Linking } from "react-native";
import styles from "./registration-style";

export interface User{
    email: String
    firstName: String
    following: String[]
    groups: String[]
    imgurl: String
    incomplete: Boolean
    lastName: String
    passkey: String
    username: String
    verification: Boolean
}

export default function RegistrationForm(){
    


    const [user, setUser] = useState({
        email: "",
        firstName: "",
        following: [],
        groups: [],
        imgurl: "",
        incomplete: true,
        lastName: "",
        passkey: "",
        username: "",
        verification: false})

    return(<>
    <View style={styles.regPageWholeView}>

        <View>
            <Image style={styles.regPageLogo} source={{uri:"http://ec2-44-197-172-46.compute-1.amazonaws.com:3000/assets/images/bubble-logo.png"}}/>
        </View>

        <View style={styles.regPageUnderline}>
            <View>
                <Text style={styles.regPageInstruction}>Please fill in this form to create an account.</Text>
            </View>

            <View>
                <Text style={styles.regPageMissingFieldAlert}>Missing field(s) in the form</Text>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>First Name:<Text style={styles.regPageAsterisk}>*</Text></Text>
                <TextInput style={styles.regPageNameInput} placeholder="Enter First Name" onChangeText={t => {setUser({...user, firstName:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Last Name:<Text style={styles.regPageAsterisk}>*</Text></Text>
                <TextInput style={styles.regPageNameInput} placeholder="Enter Last Name" onChangeText={t => {setUser({...user, lastName:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Username:<Text style={styles.regPageAsterisk}>*</Text></Text> 
                <TextInput style={styles.regPageUsernameInput} placeholder="Enter Username" onChangeText={t => {setUser({...user, username:t})}}/>
            </View>
        </View>
        
        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Email:<Text style={styles.regPageAsterisk}>*</Text></Text> 
                <TextInput style={styles.regPageEmailInput} placeholder="Enter Email" onChangeText={t => {setUser({...user, email:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Password:<Text style={styles.regPageAsterisk}>*</Text></Text>
                <TextInput style={styles.regPagePasswordInput} placeholder="Enter Password" onChangeText={t => {setUser({...user, passkey:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Confirm Password:<Text style={styles.regPageAsterisk}>*</Text></Text>
                <TextInput style={styles.regPagePasswordInput} placeholder="Repeat Password" onChangeText={t => {if(t != user.passkey) {setUser({...user, passkey:""}); alert("Passwords did not match.");} }}/>
            </View>
        </View>

        <View style={styles.regPageButtonUnderline}>
            <SubmitButton user={user} updateUser={setUser}/>
        </View>

        <View>
            <Text style={styles.regPageInstruction}>By creating an account you agree to our <Text style={styles.regPageLinkText} onPress={() => Linking.openURL('http://google.com')}>Terms & Privacy</Text>.</Text>
        </View>

        <View>
            <Text style={styles.regPageInstruction}>Already have an account? <Text style={styles.regPageLinkText} onPress={() => Linking.openURL('http://google.com')}>Sign in</Text></Text>
        </View>

    </View>
    </>)
}

export function SubmitButton(props:{user:User, updateUser:Function}){
    return(<Pressable 
        onPress={() => {props.updateUser({
                email: props.user.email,
                firstName: props.user.firstName,
                following: [],
                groups: [],
                imgurl: "",
                incomplete: true,
                lastName: props.user.lastName,
                passkey: props.user.passkey,
                username: props.user.username,
                verification: false
            });
            console.log(props.user);
        }}
            style={{backgroundColor:'#474C55'}}
            >
                {true && <Text>Register</Text>}
            </Pressable>)
}
