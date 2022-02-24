import { Alert, Pressable, Text } from "react-native";
import Profile from "../../dtos/profile";
import styles from "./registration-style";
import { emailFormat } from "./constants/constants";
import registerService from "../../services/register-service";
import { useNavigation } from "@react-navigation/native";

export default function SubmitRegistration(props: {
  profile: Profile;
  setProfile: Function;
  setAlertVisible: Function;
  confirmPword: string;
  setPasswordAlertVisible: Function;
}) {
  const navigate = useNavigation();

  function checkEmail() {
    props.setAlertVisible(false);
    props.setPasswordAlertVisible(false);
    props.profile.email.match(emailFormat)
      ? fieldValidationCheck()
      : Alert.alert(
          "Valid email address was not entered",
          "Please enter a correct email address",
          [{ text: "OK", onPress: () => {} }]
        );
  }
  async function fieldValidationCheck() {
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
        try {
          await registerService.registerProfile(props.profile);
          Alert.alert(
            "You have successfully created a profile",
            "Returning to login page, please sign in",
            [{ text: "OK", onPress: () => {} }]
          );
          navigate.navigate("Home");
        } catch (error) {
          Alert.alert("There was an error creating a profile", `${error}`, [
            { text: "OK", onPress: () => {} },
          ]);
        }
      } else {
        props.setAlertVisible(true);
      }
    } else {
      return props.setPasswordAlertVisible(true);
    }
  }

  return (
    <Pressable onPress={checkEmail} style={styles.regPageSubmitButton}>
      {true && <Text style={styles.regPageButtonText}>Register</Text>}
    </Pressable>
  );
}
