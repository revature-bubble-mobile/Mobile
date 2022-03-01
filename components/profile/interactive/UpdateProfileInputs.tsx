import axios, { AxiosResponse } from 'axios';
import React, {  useState } from 'react';
import { TextInput,  Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../../../dtos/profile';
import firebaseEndpoint from '../../../endpoints';
import { User } from '../../../store';
import ViewSaveNewProfileButtons from '../views/ViewSaveNewProfileButtons';

export default function UpdateProfileInputs(props: {
  setShowModal: Function;
  setShowParent: Function;
}) {
  const { setShowModal, setShowParent } = props;

  const currentUser: User = useSelector((state: User) => state);

  const [fName, setFName] = useState<string>(currentUser.profile.firstName);
  const [lName, setLName] = useState<string>(currentUser.profile.lastName);
  const [email, setEmail] = useState<string>(currentUser.profile.email);

  const dispatch = useDispatch();

  async function updateProfile() {
    if(!fName || !lName || !email) {
      Alert.alert('Make sure all fields are filled out!');
      return;
    } else {
      try {
        let response: AxiosResponse = await axios.patch(
          `${firebaseEndpoint}profile/${currentUser.profile.pid}.json`,
          { firstName: fName, lastName: lName, email: email }
        );
        response = await axios.get(`${firebaseEndpoint}profile/${currentUser.profile.pid}.json`)
        const profile: Profile = response.data;
        dispatch({ type: 'user', payload: profile });
        console.log(profile)
      } catch (error) {
        Alert.alert(`Error: ${error}`);
      }
    }
  }

  return (
    <>
      <TextInput
        testID='fname-textinput'
        value={fName}
        onChangeText={setFName}
        placeholder={'First Name'}></TextInput>
      <TextInput
        testID='lname-textinput'
        value={lName}
        onChangeText={setLName}
        placeholder={'Last Name'}></TextInput>
      <TextInput
        testID='email-textinput'
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
