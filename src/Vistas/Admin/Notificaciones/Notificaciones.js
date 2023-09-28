import React from "react";
import { View } from "react-native";
import { NotificacionesList } from "./NotificacionesList";
import { AppBarTab } from "../../../components/AppBarTab";

export const Notificaciones = () => {
    return (
        <View style={{width:'100%',flexGrow: 1}}>
            <AppBarTab children={"Notificaciones"}/>
            <NotificacionesList/>
        </View>
    )
};