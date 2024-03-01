import {useNavigate } from "react-router-native"
import React from 'react';
import { StyleSheet,View,Image,Text, Pressable } from 'react-native';
import { Verde } from "../constants/constants";

export const AppBarTab = ({children}) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return(  
    <View style={styles.AppBarContainer}>        
            <View style={styles.AppBar}>
                <Pressable onPress={goBack}>
                <Image style={styles.img} source={require('../media/ATRAS.png')} />
                </Pressable>
                <Text style={styles.navText}>{children}</Text>
            </View>        
    </View>
)};

const styles = StyleSheet.create({
    AppBarContainer: {
        backgroundColor: Verde,
        padding: 10,
        position: 'sticky',
        top: 0,
        zIndex: 1, 
        paddingTop: 10,       
    },
    AppBar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    navText: {
        marginLeft: 10,
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 50,
    },
});

