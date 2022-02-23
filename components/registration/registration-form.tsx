import axios from "axios";
import { useEffect, useState } from "react";
import { Text, TextInput, Pressable, View, Image, Linking, ScrollView } from "react-native";
import Profile from "../../dtos/profile";
import styles from "./registration-style";
import SubmitButton from "./submit-button";
import TermsAndServices from "./terms-and-services";



export default function RegistrationForm(){
    const [profileToRegister, setProfileToRegister] = useState({
        pid: "",
        firstName: "",
        lastName: "",
        passkey: "",
        email: "",
        username: "",
        following: [],
        followers: [],
        imgurl: "",
        verification: false                
    })

//sends a POST request containing the new user to be processed
function Register(profileFragment:Profile){
    const respone = axios.get(`https://bubble-app-82a5a-default-rtdb.firebaseio.com/profile/${profileFragment.pid}.json`)
        .then((response) => {
            
        })
        .catch((error) => {
            console.error("User submission rejected by backend")
        })

        //add an additional patch afterward to update the ID?
    }

    useEffect(()=>{
        Register(profileToRegister)

    }, [profileToRegister])


    return(<>
    <ScrollView style={styles.regPageWholeView}>

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
                <TextInput testID="fname" style={styles.regPageNameInput} placeholder="Enter First Name" onChangeText={t => {setProfileToRegister({...profileToRegister, firstName:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Last Name:<Text style={styles.regPageAsterisk}>*</Text></Text>
                <TextInput testID="lname" style={styles.regPageNameInput} placeholder="Enter Last Name" onChangeText={t => {setProfileToRegister({...profileToRegister, lastName:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Username:<Text style={styles.regPageAsterisk}>*</Text></Text> 
                <TextInput testID="uname" style={styles.regPageUsernameInput} placeholder="Enter Username" onChangeText={t => {setProfileToRegister({...profileToRegister, username:t})}}/>
            </View>
        </View>
        
        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Email:<Text style={styles.regPageAsterisk}>*</Text></Text> 
                <TextInput testID="email" style={styles.regPageEmailInput} placeholder="Enter Email" onChangeText={t => {setProfileToRegister({...profileToRegister, email:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Password:<Text style={styles.regPageAsterisk}>*</Text></Text>
                <TextInput testID="pword" style={styles.regPagePasswordInput} placeholder="Enter Password" onChangeText={t => {setProfileToRegister({...profileToRegister, passkey:t})}}/>
            </View>
        </View>

        <View style={styles.regInputView}>
            <View>
                <Text style={styles.regPageBasicFont}>Confirm Password:<Text style={styles.regPageAsterisk}>*</Text></Text>
                <TextInput testID="confirmPword" style={styles.regPagePasswordInput} placeholder="Repeat Password" onChangeText={t => {if(t != profileToRegister.passkey) {setProfileToRegister({...profileToRegister, passkey:""});} }}/>
            </View>
        </View>

        <View style={styles.regPageButtonUnderline}>
            <SubmitButton profile={profileToRegister} setProfile={setProfileToRegister}/>
        </View>

        <View>
            <Text style={styles.regPageInstruction}>By creating an account you agree to our <TermsAndServices/>.</Text>
        </View>

        <View>
            <Text style={styles.regPageInstruction}>Already have an account? <Text style={styles.regPageLinkText} onPress={() => Linking.openURL('http://google.com')}>Sign in</Text></Text>
        </View>

    </ScrollView>
    </>)
}