import { useEffect, useState } from "react";
import { Pressable, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../../dtos/profile";
import { actions, User } from "../../../store";
import axios, { AxiosResponse } from "axios";
import firebaseEndpoint from "../../../endpoints";
import { FontAwesome5 } from '@expo/vector-icons';

export default function FollowProfileButton(props:{profile:Profile}){

    const currentUserProfile = useSelector((state:User) => (state.profile));

    const [followed,setFollowed] = useState<boolean>(false);

    useEffect(()=>{
        setFollowed(currentUserProfile.following.includes(props.profile.pid));
    },[])

    const dispatch = useDispatch();

    async function follow(){
        let payload, payload2;
        if(followed){
            let index = currentUserProfile.following.indexOf(props.profile.pid)
            const newFollowing = currentUserProfile.following.splice(index,1);
            payload = newFollowing;
            index = props.profile.followers.indexOf(currentUserProfile.pid);
            const newFollowers = props.profile.followers.splice(index,1);
            payload2 = newFollowers;
        }
        else{
            const newFollowing = currentUserProfile.following;
            newFollowing.push(props.profile.pid);
            payload = newFollowing;
            const newFollowers = props.profile.followers;
            newFollowers.push(currentUserProfile.pid);
            payload2 = newFollowers;
        }
        const response:AxiosResponse = await axios.patch(
            `${firebaseEndpoint}profile/${currentUserProfile.pid}/following.json`, payload
        );
        const response2:AxiosResponse = await axios.patch(
            `${firebaseEndpoint}profile/${props.profile.pid}/followers.json`, payload2
        );
        setFollowed(!followed);
        currentUserProfile.following = payload;
        dispatch(actions.setUser(currentUserProfile));
    }

    return(
        <Pressable onPress={follow} style={{backgroundColor:"#fff"}}>
            {followed?<>
             <FontAwesome5 name="user-minus" size={40} style={{color:"#474c55"}}/>
             <Text>Unfollow</Text>
             </>
            : <>
             <FontAwesome5 name="user-plus" size={40} style={{color:"#474c55"}}/>
             <Text>Follow</Text>
             </>
             }
        </Pressable>
    )
}