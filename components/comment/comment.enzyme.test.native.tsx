import Post from "../../dtos/post"
import Comment from "../../dtos/comment"
import { mount, shallow } from "enzyme"
import CommentView from "./comment-view"
import CommentItem from "./comment-item"
import React from "react"

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
const newComment: Comment = {cid: "999", writer: "test-profile", post: "test-post", message: "New Comment 1", dateCreated: new Date()}

// //@ts-ignore
// fetch = jest.fn(() =>
//     Promise.resolve({
//         json: () => Promise.resolve(testComments),
//     })
// )

describe("Comment tests", ()=>{

    it("Should display comments", ()=>{
        const wrapper = shallow(<CommentItem {...testComment} replies={testReplies} setReplies={()=>{}}/>);
        const component = wrapper.find('Text').at(2).children();
        expect(component.text()).toContain("Test Comment 1");
    })

    it("Should display replies", ()=>{
        const wrapper = mount(<CommentItem {...testComment} replies={testReplies} setReplies={()=>{}}/>);
        const component = wrapper.find('Text').at(10).children();
        expect(component.text()).toContain("Test Reply 1");
    })

    // it("Should display comment", async ()=>{
    //     const wrapper = mount(<CommentView postId={testPost.psid} setNumComments={()=>{}} setUserCommented={()=>{}}/>);
    //     console.log(wrapper.debug())
    //     const component = wrapper.find(CommentItem).first();
    //     expect(component.prop('cid')).toBe('123');
    // })

    // it("Should display reply", ()=>{
    //     const wrapper = mount(<CommentView postId={testPost.psid} setNumComments={()=>{}} setUserCommented={()=>{}}/>);
    //     const component = wrapper.find(CommentItem).first();
    //     expect(component.text()).toContain("Test Reply 1");
    //     expect(component.text()).toContain("Test Reply 2");
    // })

    // it("Should create new comment", ()=>{
    //     const wrapper = mount(<CommentView postId={testPost.psid} setNumComments={()=>{}} setUserCommented={()=>{}}/>);
    //     wrapper.setState({comments: testComments});
    //     console.log(wrapper.state());
    // })

    // it("Should create new reply", ()=>{

    // })
})