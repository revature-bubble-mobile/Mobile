import { shallow } from 'enzyme';
import React from 'React';
import RegistrationForm from '../registration-form';
import { Pressable, TextInput } from 'react-native';
import Profile from '../../../dtos/profile';
import SubmitRegistration from '../submit-registration';


// describe("Registration Tests", () => {

//     // it("Should update the state when text boxes are filled out", async ()=>{
//     //     let user:Profile = {
//     //         pid: "",
//     //         firstName: "Johnny",
//     //         lastName: "Test",
//     //         passkey: "dookierulez13",
//     //         email: "johnny@johnny.johnny",
//     //         username: "johnnie",
//     //         following: [],
//     //         followers: [],
//     //         imgurl: "",
//     //         verification: false
//     //     }

//     //     const wrapper = shallow(<RegistrationForm/>);

//     //     wrapper.find({testID: 'fname'}).simulate('changeText', user.firstName)


//     //     expect(wrapper.find({testID: 'fname'}).debug()).toBeFalsy()
//     // })
//     it('Should do something', () => {

//         expect(true);
//     });
// })



describe("Testing Create Post Feature", () => {

    // it('Should throw an Alert', async () => {

    //     const component = shallow(<RegistrationForm />);
    //     const submit = component.find(SubmitRegistration).first().dive();
    //     const pressed = submit.find(Pressable).simulate('press');
    //     expect(pressed).toBeCalled();
    //     jest.clearAllMocks();
    // });

    let profileToRegister: Profile = {
        pid: "",
        firstName: "",
        lastName: "",
        passkey: "",
        email: "",
        username: "",
        following: [],
        followers: [],
        imgurl: "",
        verification: false,
    }
    const setProfileToRegister = (newState: Profile) => {
        profileToRegister.firstName = newState.firstName;
        profileToRegister.lastName = newState.lastName;
        profileToRegister.email = newState.email;
        profileToRegister.username = newState.username;
        profileToRegister.passkey = newState.passkey;
    }

    it("Should input some text onto all inputText and change component States", async () => {
        //---------------------Mocking State-----------------------------
        //@ts-ignore
        jest.spyOn(React, "useState").mockImplementationOnce(() => {
            return [profileToRegister, setProfileToRegister];
        });
        //----------------------------------------------------------------
        // firstName: "",
        // lastName: "",
        // username: "",
        // email: "",
        // password: "",
        // Confirmpassword: "",
        //----------------------------------------------------------------
        let newProfile: Profile = {
            pid: "",
            firstName: 'Jack',
            lastName: 'Reacher',
            passkey: 'reacher',
            email: 'jackReacher@gmail.com',
            username: 'reacher',
            following: [],
            followers: [],
            imgurl: '',
            verification: false
        }

        const component = shallow(<RegistrationForm />);
        component.find(TextInput).at(0).simulate('changeText', newProfile.firstName);
        component.find(TextInput).at(1).simulate('changeText', newProfile.lastName);
        component.find(TextInput).at(2).simulate('changeText', newProfile.username);
        component.find(TextInput).at(3).simulate('changeText', newProfile.email);
        component.find(TextInput).at(4).simulate('changeText', newProfile.passkey);
        component.find(TextInput).at(5).simulate('changeText', newProfile.passkey);

        expect(JSON.stringify(profileToRegister)).toBe(JSON.stringify(newProfile));
    });
});