import { Link } from "react-router-native"
import React from 'react';
import { StyleSheet,View,Image,Text } from 'react-native';
import { Verde } from "../constants/constants";

export const AppBarTab = ({children}) => (  
    <View style={styles.AppBarContainer}>
        <Link to="/">
            <View style={styles.AppBar}>
                <Image style={styles.img} source={require('../media/ATRAS.png')} />
                <Text style={styles.navText}>{children}</Text>
            </View>
        </Link>
    </View>
);

const styles = StyleSheet.create({
    AppBarContainer: {
        backgroundColor: Verde,
        padding: 10,
        position: 'sticky',
        top: 0,
        zIndex: 1,        
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

