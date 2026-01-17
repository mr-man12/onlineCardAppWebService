import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View, Image} from 'react-native';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    const myurl = "https://onlinecardappwebservice.onrender.com/allcards"

    //Add useEffect - Exercise 1B
    useEffect(()=>{
        //Add fetch() - Exercise 1A
        fetch(myurl)
            .then((response)=>{
                return response.json();
            })
            .then((myJson)=>{
                setMyData(myJson);
                originalData=myJson;
            })},[]);

    const FilterData = (text) => {
        if(text!='') {
            let myFilteredData = originalData.filter((item) =>
                //1D - Use of toLowerCase
                item.card_name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View style={{flexDirection:"row", alignItems:"center",borderWidth:1}}>
                <View style={{flex:1}}><Text style={{fontWeight:"bold", margin:10}}>{item.card_name}</Text></View>
                <View style={{flex:1}}><Image source={{uri:item.card_pic}} style={{width:150,height:200, margin:10}}></Image></View>
            </View>
        );
    };

    return (
        <View style={{flex:1}}>
            <StatusBar translucent={false}/>
            <Text style={{fontWeight:"bold"}}>Search:</Text>
            <TextInput style={{borderWidth:1, margin:10}} onChangeText={(text)=>{FilterData(text)}}/>
            <FlatList style={{margin:10}} data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;
