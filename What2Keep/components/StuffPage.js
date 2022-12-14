import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  DatePickerAndroid,
} from "react-native";
import React, { useState } from "react";
import { FAB } from "react-native-elements";
import axios from "axios";
import { access } from "../Access";
import { useFocusEffect } from "@react-navigation/native";

export default function StuffPage({ navigation, route }) {
  const { userId } = route.params;
  const [items, setItems] = useState([""]);

  //   async function getItem(userId) {
  //     try{
  //       const response = await axios.get("https://what2keep.azurewebsites.net/users-items/" + String(userId), {
  //         items: items
  //     });
  //       console.log(response.data);
  //       return response.data;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }
  const getItems = () => {
    axios
      .get(
        /*"http://10.144.34.37:5001/user-items/"*/ access +
          "user-items/" +
          userId
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getItems();
    }, [])
  );

  return (
    <ImageBackground
      source={require("../assets/launchBackground.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView>
            {items.map((item) => {
              return (
                <View key={item._id}>
                  <TouchableOpacity
                    // title={item.name}
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate("ViewItem", {
                        userId: userId,
                        itemId: item._id,
                      });
                    }}
                  >
                    <Text style={styles.inputText}>{item.name}</Text>
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 75, height: 75, alignSelf: "center" }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
          <FAB
            style={{ padding: 20 }}
            onPress={() => {
              navigation.navigate("AddItem", {
                userId: userId,
              });
            }}
            title="Add Item"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#F4BAA7",
    fontSize: 24,
    width: "80%",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "100%",
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  inputText: {
    fontFamily: 'Inter-Light',
    fontSize: 25,
    autoCapitalize: "none",
  },
});
