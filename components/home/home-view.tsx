import { StyleSheet, View } from "react-native";
import { CreatePost } from "../create-post/create-post";
import PostFeedView from "./post-feed/post-feed-view";

export default function HomeView() {

    return(<View style={styles.container}>
        <View style={{flex:0.2}}>
            <CreatePost/>
        </View>
        <View style={{flex:0.8, marginBottom:5}}>
            <PostFeedView/>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        flex:1,
    }
})