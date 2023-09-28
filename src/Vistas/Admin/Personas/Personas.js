import React from "react";
import { View } from "react-native";
import { PersonasList } from "./PersonasList";
import { AppBarTab } from "../../../components/AppBarTab";

export const Personas = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Usuarios"}/>
            <PersonasList />
        </View>
    )
};