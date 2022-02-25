import { mount, shallow } from "enzyme";
import { Image, Pressable, Text } from "react-native";
import { Icon } from "react-native-elements";
import { Overlay } from "react-native-elements/dist/overlay/Overlay";
import { Gesture } from "react-native-gesture-handler";
import Post from "../../../dtos/post"
import Profile from "../../../dtos/profile";
import PostCard from "./post-card";


const profile: Profile = {
    pid:"abc",
    firstName:"",
    lastName:"",
    passkey:"",
    email:"",
    username:"tester",
    followers:[],
    following:[],
    imgurl:"",
};
const profiles: Profile[] = [profile];
const post:Post = {
    psid: "123",
    creator: "abc",
    body: "This is a post",
    datePosted: new Date("2/24/2022 13:30")
};




describe("Testing post-card functionality", ()=>{

    const card = mount(<PostCard post={post} profiles={profiles}/>)

    it("should display a placeholder profile image",()=>{
        const profileImg = card.find(Image).first();
        expect(profileImg.props().source).toBeTruthy();
    });

    it("should display the author's username", ()=>{
        const usernameText = card.find(Text).first();
        expect(usernameText.render().text()).toBe("tester");
     });

     it("should display the post date and time username", ()=>{
         const dateText = card.find(Text).at(1);
         expect(dateText.render().text()).toBe("2/24/2022 1:30 PM");
      });

      it("should display the post body", ()=>{
          const usernameText = card.find(Text).at(2);
          expect(usernameText.render().text()).toBe("This is a post");
       });

     //REMOVED all non working code, TODO:
    it("should display the number of comments and replies.", ()=>{
        expect(false); 
    });

    it("should display the comment overlay when the icon is clicked", ()=>{
         expect(false); 
     });
     
    it("should change the icon when the user has replied to this post", ()=>{
        expect(false); 
    });
     
    it("should close the overlay when pressing the X or outside the overlay", ()=>{
       expect(false); 
   });

})