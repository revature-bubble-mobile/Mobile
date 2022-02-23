import { mount, shallow } from 'enzyme';
import { useState } from 'react';
import SubmitButton from '../submit-button';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Profile from '../../../dtos/profile';
import { TextInput } from 'react-native';
import RegistrationForm from '../registration-form';

Enzyme.configure({ adapter: new Adapter() });

describe("Registration input tests", ()=>{

    it("Should create a profile object given the inputs", async ()=>{
        let user:Profile = {
            pid: "",
            firstName: "Johnny",
            lastName: "Test",
            passkey: "dookierulez13",
            email: "johnny@johnny.johnny",
            username: "johnnie",
            following: [],
            followers: [],
            imgurl: "",
            verification: false
        }

        function setUser(newUser:Profile){
            user = newUser
        }

        const buttonWrapper = shallow(<SubmitButton profile={user} setProfile={setUser}/>)
        const wrapper = shallow(<RegistrationForm/>);
        
        wrapper.find({testID: 'fname'}).simulate('ChangeText', user.firstName)
        wrapper.find({testID: 'lname'}).simulate('ChangeText', 'Test')
        wrapper.find({testID: 'uname'}).simulate('ChangeText', 'johnnie')
        wrapper.find({testID: 'email'}).simulate('ChangeText', 'johnny@johnny.johnny')
        wrapper.find({testID: 'pword'}).simulate('ChangeText', 'dookierulez13')
        buttonWrapper.simulate('press')
        expect(buttonWrapper.props().profile).toEqual(setUser)
    })
})