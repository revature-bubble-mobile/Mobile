import { View, Text, Image, Dimensions, FlatList } from "react-native";

export default function ViewFollowers(){

    const textArrayDummy = [<Text>Followers1</Text>,<Text>Followers2</Text>,<Text>Followers3</Text>,
        <Text>Followers4</Text>,<Text>Followers5</Text>,<Text>Followers6</Text>,<Text>Followers1</Text>,<Text>Followers2</Text>,<Text>Followers3</Text>,
        <Text>Followers4</Text>,<Text>Followers5</Text>,<Text>Followers6</Text>,<Text>Followers1</Text>,<Text>Followers2</Text>,<Text>Followers3</Text>,
        <Text>Followers4</Text>,<Text>Followers5</Text>,<Text>Followers6</Text>,<Text>Followers1</Text>,<Text>Followers2</Text>,<Text>Followers3</Text>,
        <Text>Followers4</Text>,<Text>Followers5</Text>,<Text>Followers6</Text>,<Text>Followers1</Text>,<Text>Followers2</Text>,<Text>Followers3</Text>,
        <Text>Followers4</Text>,<Text>Followers5</Text>,<Text>Followers6</Text>
    ]
    
    return(<>
           
            <View style={{flex:0.9,backgroundColor:'lightgrey', alignItems:'center', justifyContent:'space-around'}}>
                <FlatList
                    data={textArrayDummy}
                    renderItem= { ({item}) => (<View style={{margin:Dimensions.get("window").width/16}}>{item}</View>)}    
                    numColumns = {3}
                    keyExtractor = {(item, index)=>{return `${item}.${index}`}}     
                ></FlatList>
            </View>
    </>)
}