import axios, { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import { Pressable, TextInput, Text, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import firebaseEndpoint from '../../../endpoints';
import { User } from '../../../store';
import ViewSaveNewProfileButtons from '../views/ViewSaveNewProfileButtons';

export default function UpdateProfileInputs(props: {
    setShowModal: Function;
    setShowParent: Function;
}) {
    const { setShowModal, setShowParent } = props;

    const currentUser: User = useSelector((state: User) => state);

    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const dispatch = useDispatch();

    async function updateProfile() {
        try {
            let response: AxiosResponse = await axios.patch(
                `${firebaseEndpoint}profile/${currentUser.profile.pid}.json`,
                { firstname: fName, lastname: lName, email: email }
            );
            const id = response.data;
            response = await axios.get(`${firebaseEndpoint}profile/${id}.json`);
            dispatch({ type: 'user', payload: response.data });
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    }

    return (
        <>
            <TextInput
                value={fName}
                onChangeText={setFName}
                placeholder={'First Name'}></TextInput>
            <TextInput
                value={lName}
                onChangeText={setLName}
                placeholder={'Last Name'}></TextInput>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={'Email'}></TextInput>
            <ViewSaveNewProfileButtons
                updateProfile={updateProfile}
                setShowModal={setShowModal}
                setShowParent={setShowParent}
            />
        </>
    );
}
