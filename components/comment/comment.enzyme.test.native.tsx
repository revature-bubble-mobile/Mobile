import Post from "../../dtos/post"
import Comment from "../../dtos/comment"
import { mount, shallow } from "enzyme"
import CommentView from "./comment-view"
import CommentItem from "./comment-item"
import React from "react"
import { FlatList, Pressable } from "react-native"
import * as redux from 'react-redux'
import Profile from "../../dtos/profile"

jest.mock('@react-navigation/native');
const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue("test");

const testPost: Post = {creator: "test-post", psid: "test-profile", body: "Test Message", datePosted: new Date()}
const testComment: Comment = {cid: "123", writer: "test-profile", post: "test-post", message: "Test Comment 1", dateCreated: new Date()}
const testComments: Comment[] = [
    {cid: "123", writer: "test-profile", post: "test-post", message: "Test Comment 1", dateCreated: new Date()},
    {cid: "456", writer: "test-profile", post: "test-post", message: "Test Comment 2", dateCreated: new Date()}
]
const testReplies: Comment[] = [
    {cid: "789", writer: "test-profile", post: "test-post", message: "Test Reply 1", dateCreated: new Date(), previous: "123"},
    {cid: "222", writer: "test-profile", post: "test-post", message: "Test Reply 2", dateCreated: new Date(), previous: "123"}
]
const testProfile: Profile = {
    pid: "test-profile",
    firstName: "test",
    lastName: "profile",
    passkey: "xxxxxx",
    email: "none@email.com",
    username: "tprofile",
    followers: [],
    following: []
}

//@ts-ignore
global.fetch = jest.fn(() =>
    Promise.resolve({})
)

const runAllPromises = () => {
    return new Promise(setImmediate)
}

describe("Comment tests", ()=>{

    it("Should display comments", ()=>{
        const wrapper = shallow(<CommentItem {...testComment} replies={testReplies} setReplies={()=>{}}/>);
        const component = wrapper.find('Text').at(2).children();
        expect(component.text()).toContain("Test Comment 1");
    })

    it("Should display replies", ()=>{
        const wrapper = mount(<CommentItem {...testComment} replies={testReplies} setReplies={()=>{}}/>);
        const component = wrapper.find('Text').at(12);
        expect(component.text()).toContain("Test Reply 1");
    })

    // it("Should create new comment", async ()=>{
    //     jest.clearAllMocks();
    //     let comments: Comment[] = [];
    //     const replies: Comment[] = [];
    //     const newComment = "New Test Comment";

    //     const setComments = (newComments: Comment[]) => {
    //         comments = newComments;
    //     }

    //     jest.spyOn(React, "useEffect").mockImplementation(jest.fn());

    //     jest.spyOn(React, 'useState')
    //         //@ts-ignore
    //         .mockImplementationOnce(()=>[comments, setComments])
    //         .mockImplementationOnce(()=>[replies, ()=>{}])
    //         .mockImplementationOnce(()=>[newComment, ()=>{}]);
        
    //     const spy = jest.spyOn(redux, 'useSelector');
    //     spy.mockReturnValue({pid: "test"});

    //     const wrapper = shallow(<CommentView postId={testPost.psid} setNumComments={()=>{}} setUserCommented={()=>{}}/>);
        
    //     const pressable = wrapper.find(Pressable);
    //     pressable.simulate("press");
    //     await runAllPromises();
    //     expect(comments[0].message).toBe("New Test Comment")
    // })

    // it("Should create new reply", async ()=>{
    //     jest.clearAllMocks();
    //     const userProfile: Profile = testProfile;
    //     const isReplyPressed: boolean = true;
    //     const newReply: string = "New Test Reply";
    //     let replies: Comment[] = [];

    //     const setReplies = (newReply: Comment[]) => {
    //         replies = newReply;
    //     }

    //     jest.spyOn(React, "useEffect").mockImplementation(jest.fn());

    //     React.useState = jest.fn()
    //         .mockImplementationOnce(()=>[userProfile, ()=>{}])
    //         .mockImplementationOnce(()=>[isReplyPressed, ()=>{}])
    //         .mockImplementationOnce(()=>[newReply, ()=>{}])
    //         .mockImplementationOnce(()=>[[], ()=>{}])

    //     const wrapper = shallow(<CommentItem {...testComment} replies={testReplies} setReplies={setReplies}/>);
    //     const pressable = wrapper.find(Pressable).at(1);
    //     pressable.simulate("press");
    //     await runAllPromises();
    //     expect(replies[2].message).toBe("New Test Reply");
    // })
})