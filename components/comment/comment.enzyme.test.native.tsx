import Post from "../../dtos/post"
import Comment from "../../dtos/comment"
import { mount } from "enzyme"
import CommentView from "./comment-view"
import CommentItem from "./comment-item"

const testPost: Post = {psid: "test-post", pid: "test-profile", body: "Test Message", datePosted: new Date()}
const testComments: Comment[] = [
    {cid: "123", pid: "test-profile", psid: "test-post", message: "Test Comment 1", dateCreated: new Date()},
    {cid: "456", pid: "test-profile", psid: "test-post", message: "Test Comment 2", dateCreated: new Date()},
    {cid: "789", pid: "test-profile", psid: "test-post", message: "Test Reply 1", dateCreated: new Date(), parentComment: "123"},
    {cid: "222", pid: "test-profile", psid: "test-post", message: "Test Reply 2", dateCreated: new Date(), parentComment: "123"}
]

//@ts-ignore
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(testComments),
    })
)

describe("Comment tests", ()=>{

    it("Should display comment", ()=>{
        const wrapper = mount(<CommentView post={testPost} updatePost={()=>{}}/>);
        const component = wrapper.find(CommentItem).first();
        expect(component.prop('cid')).toBe('123');
    })

    it("Should display reply", ()=>{
        const wrapper = mount(<CommentView post={testPost} updatePost={()=>{}}/>);
        const component = wrapper.find(CommentItem).first();
        expect(component.text()).toContain("Test Reply 1");
        expect(component.text()).toContain("Test Reply 2");
    })

    // it("Should create new comment", ()=>{

    // })

    // it("Should create new reply", ()=>{

    // })
})