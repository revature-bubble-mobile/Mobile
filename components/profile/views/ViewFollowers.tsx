import { View, Dimensions, FlatList } from "react-native";

export default function ViewFollowers(){

    return(<>
           
            <View style={{flex:0.9,backgroundColor:'lightgrey', alignItems:'center', justifyContent:'space-around'}}>
                <FlatList
                    data={[]}
                    renderItem= { ({item}) => (<View style={{margin:Dimensions.get("window").width/16}}>{item}</View>)}    
                    numColumns = {3}
                    keyExtractor = {(item, index)=>{return `${item}.${index}`}}     
                ></FlatList>
            </View>
    </>)
}