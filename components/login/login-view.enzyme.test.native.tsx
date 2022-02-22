import { mount } from "enzyme";
import LoginView  from "./login-view";
import Profile from "../../dtos/profile";
//@ts-ignore
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";


describe("Test login form", function() {

  it("The user name was created correctly", () => {
    const wrapper = mount(<LoginView/>);
    
     wrapper.find('TextInput[type="text"]').simulate("change", {
      target: { testId:"username", value: "world" }
    });
    expect(wrapper.state("username")).toEqual("world");
  });

  it("The password was created correctly", ()=> {
    const wrapper = mount(<LoginView/>);
    wrapper.find('TextInput[type="text"]').simulate("change", {
      target: { testId: "password", value: "123" }
    });
    expect(wrapper.state("password")).toEqual("123");
  });

  it("login check with right data", () => {
    const wrapper = mount(<LoginView/>);
    wrapper
      .find('TextInput[type="text"]')
      .simulate("change", { target: { testId: "username", value: "world" } });
    wrapper
      .find('TextInput[type="password"]')
      .simulate("change", { target: { testId: "password", value: "123" } });
    wrapper.find("button").simulate("press");
    expect(wrapper.state("loggedIn")).toBe(true);
  });

});
