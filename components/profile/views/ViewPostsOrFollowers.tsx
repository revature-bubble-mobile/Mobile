import { useState } from "react";
import { View, Text } from "react-native";
import PostFollowButtons from "../interactive/PostFollowButtons";
import ViewFollowers from "./ViewFollowers";
import ViewPosts from "./ViewPosts";


export default function ViewPostsOrFollowers(){

    const [postOrFollow, setPostOrFollow] = useState<boolean>(true) //true = post, false = follow

    return(
        <View style={{flex:1}}>
            <View style={{ backgroundColor:'#474C55', flexDirection:'row', justifyContent:'space-around', alignItems:'center', borderTopLeftRadius:10, borderTopRightRadius:10, padding:5}}>
                <PostFollowButtons setter={setPostOrFollow}/>
            </View>
            {postOrFollow? <ViewPosts/> :<ViewFollowers/>}
        </View>
    )
}

