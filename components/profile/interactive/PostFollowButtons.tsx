import { useState } from "react";
import { Pressable, Text } from "react-native";


export default function PostFollowButtons(props:{setter: Function}){
    const {setter} = props

    const [underline, setUnderline] = useState(true)

    return(
        <><Pressable onPress={()=> {setter(true); setUnderline(true)}}><Text style={underline? {textDecorationLine:'underline', color:'black'} : {color:'black'}}>Posts</Text></Pressable><Pressable onPress={()=>{setter(false); setUnderline(false)}}><Text style={!underline? {textDecorationLine:'underline', color:'black'} : {color:'black'}}>Followers</Text></Pressable></>
    )
}
