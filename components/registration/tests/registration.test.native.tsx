import { shallow } from "enzyme";
import React from "React";
import RegistrationForm from "../registration-form";
import { Alert, Modal, Pressable, TextInput } from "react-native";
import Profile from "../../../dtos/profile";
import SubmitRegistration from "../submit-registration";
import TermsAndServices from "../terms-and-services";
import registerService from "../../../services/register-service";

describe("Testing Create Post Feature", () => {
  it("Should display an Alert that warns of incorrect email address", () => {
    const spy = spyOn(Alert, "alert");
    const component = shallow(<RegistrationForm />);
    const submit = component.find(SubmitRegistration).first().dive();
    submit.find(Pressable).simulate("press");

    expect(spy).toBeCalledWith(
      "Valid email address was not entered",
      "Please enter a correct email address"
    );
    jest.clearAllMocks();
  });

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
  };
  const setProfileToRegister = (newState: Profile) => {
    profileToRegister.firstName = newState.firstName;
    profileToRegister.lastName = newState.lastName;
    profileToRegister.email = newState.email;
    profileToRegister.username = newState.username;
    profileToRegister.passkey = newState.passkey;
  };

  it("Should input some text onto all inputText and change component States", () => {
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
      firstName: "Jack",
      lastName: "Reacher",
      passkey: "reacher",
      email: "jackReacher@gmail.com",
      username: "reacher",
      following: [],
      followers: [],
      imgurl: "",
      verification: false,
    };

    const component = shallow(<RegistrationForm />);
    component
      .find(TextInput)
      .at(0)
      .simulate("changeText", newProfile.firstName);
    component.find(TextInput).at(1).simulate("changeText", newProfile.lastName);
    component.find(TextInput).at(2).simulate("changeText", newProfile.username);
    component.find(TextInput).at(3).simulate("changeText", newProfile.email);
    component.find(TextInput).at(4).simulate("changeText", newProfile.passkey);
    component.find(TextInput).at(5).simulate("changeText", newProfile.passkey);

    expect(JSON.stringify(profileToRegister)).toBe(JSON.stringify(newProfile));
    jest.clearAllMocks();
  });

  it("Should go into terms and service and see a Modal", () => {
    const component = shallow(<RegistrationForm />);
    const termsService = component.find(TermsAndServices).first().dive();
    expect(termsService.find(Modal)).toBeTruthy();
  });

  it("Fields are proper, state updated to True", () => {
    const registerSpy = jest.spyOn(registerService, "registerProfile");
    let profile: Profile = {
      pid: "",
      firstName: "Jack",
      lastName: "Reacher",
      passkey: "1234",
      email: "reacher@gmail.com",
      username: "reacher",
      following: [],
      followers: [],
      imgurl: "",
      verification: false,
    };
    const setProfile = (newState: Profile) => {
      profileToRegister.firstName = newState.firstName;
      profileToRegister.lastName = newState.lastName;
      profileToRegister.email = newState.email;
      profileToRegister.username = newState.username;
      profileToRegister.passkey = newState.passkey;
    };
    let alert = false;
    const setAlert = (al: boolean) => {
      alert = true;
    };

    const component = shallow(
      <SubmitRegistration
        profile={profile}
        setProfile={setProfile}
        setAlertVisible={setAlert}
        confirmPword={"1234"}
        setPasswordAlertVisible={() => {}}
      />
    );
    component.find(Pressable).simulate("press");
    expect(registerSpy).toBeCalled();
  });

  it("Confirm Password not the same as Password, set state to false", () => {
    let passwordAlertVisible = false;
    const setPasswordAlertVisible = () => {
      passwordAlertVisible = true;
    };
    let confirmPword = "wrong_pword";
    const setConfirmPword = (pwrd: string) => {
      confirmPword = pwrd;
    };

    let newProfile: Profile = {
      pid: "",
      firstName: "Jack",
      lastName: "Reacher",
      passkey: "reacher",
      email: "jackReacher@gmail.com",
      username: "reacher",
      following: [],
      followers: [],
      imgurl: "",
      verification: false,
    };

    //---------------------Mocking State-----------------------------
    //@ts-ignore
    jest.spyOn(React, "useState").mockImplementationOnce(() => {
      return [profileToRegister, setProfileToRegister];
    });
    jest.spyOn(React, "useState").mockImplementationOnce(() => {
      return [passwordAlertVisible, setPasswordAlertVisible];
    });
    //@ts-ignore
    jest.spyOn(React, "useState").mockImplementationOnce(() => {
      return [confirmPword, setConfirmPword];
    });
    //----------------------------------------------------------------

    const component = shallow(<RegistrationForm />);
    component
      .find(TextInput)
      .at(0)
      .simulate("changeText", newProfile.firstName);
    component.find(TextInput).at(1).simulate("changeText", newProfile.lastName);
    component.find(TextInput).at(2).simulate("changeText", newProfile.username);
    component.find(TextInput).at(3).simulate("changeText", newProfile.email);
    component.find(TextInput).at(4).simulate("changeText", newProfile.passkey);
    component.find(TextInput).at(5).simulate("changeText", "pword");

    const submitRegstr = shallow(
      <SubmitRegistration
        profile={profileToRegister}
        setProfile={setProfileToRegister}
        setAlertVisible={() => {}}
        confirmPword={confirmPword}
        setPasswordAlertVisible={setPasswordAlertVisible}
      />
    );

    submitRegstr.find(Pressable).first().simulate("press");
    expect(passwordAlertVisible).toBeTruthy();
  });
});
