import { Pressable, Text, TouchableOpacity } from "react-native";
import Profile from "../../dtos/profile"
import styles from "./registration-style";

export default function SubmitButton(props:{profile:Profile, setProfile:Function}){
    return(<TouchableOpacity
        onPress={() => {props.setProfile({
                pid: "",
                firstName: props.profile.firstName,
                lastName: props.profile.lastName,
                passkey: props.profile.passkey,
                email: props.profile.email,
                username: props.profile.username,
                following:[],
                followers:[],
                imgurl: "",
                verification: false                
            });
            console.log(props.profile);
        }}
            style={styles.regPageSubmitButton}
            
            >
                {true && <Text style={styles.regPageSubmitButtonText}>Register</Text>}
            </TouchableOpacity>)
}