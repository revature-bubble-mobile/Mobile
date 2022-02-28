import React from "react";
import { View } from "react-native";
import { CreatePost } from "../create-post/create-post";
import PostFeedView from "./post-feed/post-feed-view";

export default function HomeView() {

    return (<View style={{ height: '99%', width: '100%' }}>
        <CreatePost />
        <View style={{ flex: 1 }}>
            <PostFeedView />
        </View>
    </View>)
}