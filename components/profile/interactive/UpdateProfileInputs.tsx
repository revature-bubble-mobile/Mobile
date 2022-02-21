import React, { useRef } from "react"
import { Pressable, TextInput, Text } from "react-native"


export default function UpdateProfileInputs(){

    const firstName = useRef<any>()
    const lastName = useRef<any>()
    const email = useRef<any>()

    function UpdateReduxProfile(){
        console.log('firstName',firstName.current.value)
        console.log(lastName.current.value)
        console.log(email.current.value)
    }

    return(
        <>
            <TextInput ref={firstName} placeholder={'First Name'}></TextInput>
            <TextInput ref={lastName} placeholder={'Last Name'}></TextInput>
            <TextInput ref={email} placeholder={'Email'}></TextInput>
            <Pressable style={{backgroundColor:"dimgrey", borderRadius:10}} onPress={UpdateReduxProfile}><Text style={{padding:15, color:'white'}}>Update Profile</Text></Pressable>
        </>

    )
}
