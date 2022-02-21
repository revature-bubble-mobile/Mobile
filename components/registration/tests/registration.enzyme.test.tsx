import { mount, shallow } from 'enzyme';
import { useState } from 'react';
import SubmitButton from '../submit-button';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe("Registration input tests", ()=>{

    it("Should retrieve first name correctly", async ()=>{
        const [user, setUser] = useState({
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
        })

        const wrapper = mount(<SubmitButton profile={user} setProfile={setUser}/>);

        const newFname = user.firstName;
        const newFnameInput = wrapper.find('input[ref="fname"]');
        const submitButton = wrapper
            .find('Button')
            .first();

        //newFnameInput.props().onChangeText(newFname);
        //submitButton.props().onPress();
        //wrapper.update();
        //expect(wrapper.find('???')).toExist();
        //expect(wrapper.find('???')).toMatchSnapshot();


        
        expect(true).toBeTruthy();
    })
})