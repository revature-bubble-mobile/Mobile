import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { DrawerItem } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { actions } from "../../store";


export default function DrawerLogout(props:{setVerification:Function}) {

    const dispatch = useDispatch();

    return(
        <DrawerItem style={{flex:1, justifyContent:"center"}} label="Logout" icon={()=><Icon name='logout' size={30}/>} onPress={()=>{
            dispatch(actions.setUser({
              pid: "",
              firstName: "",
              lastName: "",
              passkey: "",
              email: "",
              username: "",
              following: [],
              followers: [] }));
              AsyncStorageLib.removeItem("profile");
              props.setVerification(false);
            }
        }/>
    )
}