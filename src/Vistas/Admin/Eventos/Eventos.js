import React from "react";
import { View } from "react-native";
import { EventosList } from "./EventosList";
import { AppBarTab } from "../../../components/AppBarTab";

export const Eventos = () => {
    return (
        <View style={{width:'100%',flexGrow: 1}}>
            <AppBarTab children={"Eventos"}/>
            <EventosList/>
        </View>
    )
};