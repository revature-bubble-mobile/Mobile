import { mount, shallow } from 'enzyme';
import { useState } from 'react';
import SubmitButton from '../submit-registration';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Profile from '../../../dtos/profile';
import { TextInput } from 'react-native';
import RegistrationForm from '../registration-form';
import SubmitRegistration from '../submit-registration';

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

        const wrapper = shallow(<SubmitRegistration/>);
        
    })
})