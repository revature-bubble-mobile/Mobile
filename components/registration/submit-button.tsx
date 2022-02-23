import { Alert, Pressable, Text } from "react-native";
import Profile from "../../dtos/profile";
import ProfileView from "../profile/profile-view";
import styles from "./registration-style";
import { emailFormat } from "./constants/constants";

export default function SubmitButton(props: {
  profile: Profile;
  setProfile: Function;
  setAlertVisible: Function;
  confirmPword: string;
  setPasswordAlertVisible: Function;
}) {
  function checkEmail() {
    props.profile.email.match(emailFormat)
      ? fieldValidationCheck()
      : Alert.alert(
          "Valid email address was not entered",
          "Please enter a correct email address",
          [{ text: "OK", onPress: () => {} }]
        );
  }
  function fieldValidationCheck() {
    if (props.profile.passkey === props.confirmPword) {
      if (
        props.profile.firstName &&
        props.profile.lastName &&
        props.profile.passkey &&
        props.profile.email &&
        props.profile.username
      ) {
        props.setProfile({
          pid: "",
          firstName: props.profile.firstName,
          lastName: props.profile.lastName,
          passkey: props.profile.passkey,
          email: props.profile.email,
          username: props.profile.username,
          imgurl: "",
          verification: false,
        });
        // add api call
        // then add navigation here
        // ask about added an alert for like profile created correctly
      } else {
        props.setAlertVisible(true);
      }
    } else {
      return props.setPasswordAlertVisible(true);
    }
  }

  return (
    <Pressable
      onPress={checkEmail}
      style={styles.regPageSubmitButton}
    >
      {true && <Text style={styles.regPageButtonText}>Register</Text>}
    </Pressable>
  );
}
