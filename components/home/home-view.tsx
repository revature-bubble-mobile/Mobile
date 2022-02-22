import { View } from "react-native";
import CommentView from "../comment/comment-view";
import Post from "../../dtos/post";

export default function HomeView() {

    return(<View>
        <CommentView post={null} updatePost={()=>{}}/>

    </View>)
}