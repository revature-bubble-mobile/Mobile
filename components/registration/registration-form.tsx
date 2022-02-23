import axios from "axios";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import Profile from "../../dtos/profile";
import styles from "./registration-style";
import SubmitButton from "./submit-button";
import TermsAndServices from "./terms-and-services";

export default function RegistrationForm() {
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
    verification: false,
  });

  //sends a POST request containing the new user to be processed
  function Register(profileFragment: Profile) {
    const respone = axios
      .get(
        `https://bubble-app-82a5a-default-rtdb.firebaseio.com/profile/${profileFragment.pid}.json`
      )
      .then((response) => {})
      .catch((error) => {
        console.error("User submission rejected by backend");
      });
  }

  const [firstnameActive, setFirstnameActive] = useState(false);
  const [lastnameActive, setLastnameActive] = useState(false);
  const [usernameActive, setUsernameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [repeatPasswordActive, setRepeatPasswordActive] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [passwordAlertVisible, setPasswordAlertVisible] = useState(false);
  const [confirmPword, setConfirmPword] = useState("");

  const firstnameStyle = firstnameActive
    ? styles.regPageTextboxInputAlt
    : styles.regPageTextboxInput;
  const lastnameStyle = lastnameActive
    ? styles.regPageTextboxInputAlt
    : styles.regPageTextboxInput;
  const usernameStyle = usernameActive
    ? styles.regPageTextboxInputAlt
    : styles.regPageTextboxInput;
  const emailStyle = emailActive
    ? styles.regPageTextboxInputAlt
    : styles.regPageTextboxInput;
  const passwordStyle = passwordActive
    ? styles.regPageTextboxInputAlt
    : styles.regPageTextboxInput;
  const repeatPasswordStyle = repeatPasswordActive
    ? styles.regPageTextboxInputAlt
    : styles.regPageTextboxInput;
  const alertVisibleStyle = alertVisible ? null : styles.regPageHiddenAlert;
  const passwordAlertVisibleStyle = passwordAlertVisible
    ? null
    : styles.regPageHiddenAlert;

  useEffect(() => {
    Register(profileToRegister);
  }, [profileToRegister]);

  return (
    <>
      <ScrollView>
        <View style={styles.regPageWholeView}>
          <View>
            <Image
              style={styles.regPageLogo}
              source={require("../../assets/images/bubble-logo.png")}
            />
          </View>

          <View style={styles.regPageUnderline}>
            <View>
              <Text style={styles.regPageInstruction}>
                Please fill in this form to create an account.
              </Text>
            </View>

            <View style={alertVisibleStyle}>
              <Text style={styles.regPageMissingFieldAlert}>
                Missing field(s) in the form
              </Text>
            </View>

            <View style={passwordAlertVisibleStyle}>
              <Text style={styles.regPagePasswordMatchAlert}>
                Passwords do not match
              </Text>
            </View>
          </View>

          <View style={styles.regInputView}>
            <View>
              <Text style={styles.regPageBasicFont}>
                First Name:<Text style={styles.regPageAsterisk}>*</Text>
              </Text>
              <TextInput
                style={firstnameStyle}
                placeholder="Enter First Name"
                onChangeText={(t) => {
                  setProfileToRegister({ ...profileToRegister, firstName: t });
                }}
                onFocus={() => setFirstnameActive(true)}
                onBlur={() => setFirstnameActive(false)}
              />
            </View>
          </View>

          <View style={styles.regInputView}>
            <View>
              <Text style={styles.regPageBasicFont}>
                Last Name:<Text style={styles.regPageAsterisk}>*</Text>
              </Text>
              <TextInput
                style={lastnameStyle}
                placeholder="Enter Last Name"
                onChangeText={(t) => {
                  setProfileToRegister({ ...profileToRegister, lastName: t });
                }}
                onFocus={() => setLastnameActive(true)}
                onBlur={() => setLastnameActive(false)}
              />
            </View>
          </View>

          <View style={styles.regInputView}>
            <View>
              <Text style={styles.regPageBasicFont}>
                Username:<Text style={styles.regPageAsterisk}>*</Text>
              </Text>
              <TextInput
                style={usernameStyle}
                placeholder="Enter Username"
                onChangeText={(t) => {
                  setProfileToRegister({ ...profileToRegister, username: t });
                }}
                onFocus={() => setUsernameActive(true)}
                onBlur={() => setUsernameActive(false)}
              />
            </View>
          </View>

          <View style={styles.regInputView}>
            <View>
              <Text style={styles.regPageBasicFont}>
                Email:<Text style={styles.regPageAsterisk}>*</Text>
              </Text>
              <TextInput
                style={emailStyle}
                placeholder="Enter Email"
                onChangeText={(t) => {
                  setProfileToRegister({ ...profileToRegister, email: t });
                }}
                onFocus={() => setEmailActive(true)}
                onBlur={() => setEmailActive(false)}
              />
            </View>
          </View>

          <View style={styles.regInputView}>
            <View>
              <Text style={styles.regPageBasicFont}>
                Password:<Text style={styles.regPageAsterisk}>*</Text>
              </Text>
              <TextInput
                style={passwordStyle}
                placeholder="Enter Password"
                onChangeText={(t) => {
                  setProfileToRegister({ ...profileToRegister, passkey: t });
                }}
                onFocus={() => setPasswordActive(true)}
                onBlur={() => setPasswordActive(false)}
              />
            </View>
          </View>

          <View style={styles.regInputView}>
            <View>
              <Text style={styles.regPageBasicFont}>
                Confirm Password:<Text style={styles.regPageAsterisk}>*</Text>
              </Text>
              <TextInput
                style={repeatPasswordStyle}
                placeholder="Repeat Password"
                onChangeText={(t) => {
                  setConfirmPword(t);
                  console.log(confirmPword);
                }}
                onFocus={() => setRepeatPasswordActive(true)}
                onBlur={() => setRepeatPasswordActive(false)}
              />
            </View>
          </View>

          <View>
            <Text style={styles.regPageAsterisk}>
              *<Text style={styles.regPageRequireFont}>required</Text>
            </Text>
          </View>

          <View style={styles.regPageButtonUnderline}>
            <SubmitButton
              profile={profileToRegister}
              setProfile={setProfileToRegister}
              setAlertVisible={setAlertVisible}
              setPasswordAlertVisible={setPasswordAlertVisible}
              confirmPword={confirmPword}
            />
          </View>
          <View>
            <Text style={styles.regPageInstruction}>
              By creating an account you agree to our <TermsAndServices />.
            </Text>
          </View>

          <View>
            <Text style={styles.regPageInstruction}>
              Already have an account?
              <Text
                style={styles.regPageLinkText}
                onPress={() => Linking.openURL("http://google.com")}
              >
                {" "}
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
