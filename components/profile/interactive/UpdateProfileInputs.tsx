import React, { useRef } from "react"
import { Pressable, TextInput, Text } from "react-native"
import ViewSaveNewProfileButtons from "../views/ViewSaveNewProfileButtons"


export default function UpdateProfileInputs(props:{setShowModal: Function, setShowParent: Function}){
    const {setShowModal, setShowParent} = props


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
            <ViewSaveNewProfileButtons updateReduxProfile={UpdateReduxProfile} setShowModal={setShowModal} setShowParent={setShowParent}/>
        </>

    )
}
