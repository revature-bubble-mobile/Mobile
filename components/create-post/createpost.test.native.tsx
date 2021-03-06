import { shallow } from "enzyme";
import { Button } from "react-native-elements";
import { Platform, TextInput } from "react-native";
import { CreatePost, GetTextInput } from "./create-post";
import React from 'React';
import * as redux from 'react-redux';

const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue("test");

describe("Testing Create Post Feature", () => {
    
    it("Should throw an Alert", () => {

        if (Platform.OS === 'ios') {
            global.alert = jest.fn();
            const component = shallow(<CreatePost />);
            component.find(Button).first().simulate('press');
            expect(global.alert).toHaveBeenCalledWith('Gotta type something before you post Bruh!');
            jest.clearAllMocks();
        }
    });


    it("Should input some text onto inputText and change inputTxt State", () => {
        let inputTxt = '';
        const setInputTxt = (newState: string) => {
            inputTxt = newState;
        }
        //@ts-ignore
        jest.spyOn(React, "useState").mockImplementationOnce(() => {
            return [inputTxt, setInputTxt];
        });
        const component = shallow(<CreatePost />);
        const inputText = component.find(GetTextInput).first().dive().find(TextInput);
        const changedText = 'testing the InputText functionality and whether state is updated';
        inputText.simulate('changeText', changedText);

        expect(inputTxt).toBe(changedText);
        jest.clearAllMocks();
    });


    it("Should upload a new Post ", async () => {
        const mocker = jest.fn();
        global.alert = mocker;
        //@ts-ignore
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ result: { data: 100 } }),
            })
        );
        let inputTxt = 'testing post feature to make sure it\'s uploading properly';
        //@ts-ignore
        jest.spyOn(React, "useState").mockImplementationOnce(() => {
            return [inputTxt, () => { }];
        });

        const component = shallow(<CreatePost />);
        component.find(Button).first().simulate('press');
        expect(fetch).toHaveBeenCalled();
        jest.clearAllMocks();
    });
});