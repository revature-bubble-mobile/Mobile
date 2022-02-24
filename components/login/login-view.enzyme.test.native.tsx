import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import {shallow } from "enzyme";
import LoginView  from "./login-view";
import { Button } from "react-native-elements";

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage );

const runAllPromises = () => new Promise(resolve => setImmediate(resolve));

describe("Test login form", async () => {

  it('checks if Async Storage is used', async () => {
    const wrapper = shallow(<LoginView setVerification={() => {} }/>);
    const button = wrapper.find(Button).first();
    wrapper.find("TextInput").at(0).simulate("changeText", "mbuble");
    wrapper.find("TextInput").at(1).simulate("changeText", "test");
    button.simulate("press");
    await runAllPromises();
    expect(mockAsyncStorage.setItem).toHaveBeenCalled();
  });


/*   it("The user name was created correctly", () => {
    const wrapper = mount(<LoginView/>);
    
     wrapper.find('TextInput[type="text"]').simulate("change", {
      target: { testId:"username", value: "mbuble" }
    });
    expect(wrapper.state("username")).toEqual("mbuble");
  });

  it("The password was created correctly", ()=> {
    const wrapper = mount(<LoginView/>);
    wrapper.find('TextInput[type="text"]').simulate("change", {
      target: { testId: "password", value: "test" }
    });
    expect(wrapper.state("password")).toEqual("test");
  });

  it("login check with right data", () => {
    const wrapper = mount(<LoginView/>);
    wrapper
      .find('TextInput[type="text"]')
      .simulate("change", { target: { testId: "username", value: "mbuble" } });
    wrapper
      .find('TextInput[type="password"]')
      .simulate("change", { target: { testId: "password", value: "test" } });
    wrapper.find("button").simulate("press");
    expect(wrapper.state("loggedIn")).toBe(true);
  }); */

});
