import React from "react";
import { View } from "react-native";
import { ProductosList } from "./ProductosList";
import { AppBarTab } from "../../../components/AppBarTab";

export const Productos = () => {
    return (
        <View style={{width:'100%',flexGrow: 1}}>
            <AppBarTab children={"Productos"}/>
            <ProductosList/>
        </View>
    )
};