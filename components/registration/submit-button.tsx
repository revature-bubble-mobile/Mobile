import { Pressable, Text } from "react-native";
import Profile from "../../dtos/profile"
import styles from "./registration-style";

export default function SubmitButton(props:{profile:Profile, setProfile:Function}){
    return(<Pressable
        onPress={() => {props.setProfile({
                pid: Math.random() * (9999 - 1000) + 1000,
                firstName: props.profile.firstName,
                lastName: props.profile.lastName,
                passkey: props.profile.passkey,
                email: props.profile.email,
                username: props.profile.username,
                imgurl: "",
                verification: false                
            });
            console.log(props.profile);
        }}
            style={styles.regPageSubmitButton}
            
            >
                {true && <Text>Register</Text>}
            </Pressable>)
}