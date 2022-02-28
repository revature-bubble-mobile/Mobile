import { StyleSheet, View } from "react-native";
import { CreatePost } from "../create-post/create-post";
import PostFeedView from "./post-feed/post-feed-view";

export default function HomeView() {

    return (<View style={styles.container}>
        <View style={styles.createPost}>
            <CreatePost />
        </View>
        <View style={{ flex: 0.8, paddingTop: 10, paddingBottom: 5 }} >
            <PostFeedView />
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    createPost: {
        flex: 0.2,
    }

})