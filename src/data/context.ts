import React from "react";

export interface Activity{
    id: string;
    name: string;
    lastName: string;
    date: string;
    estatura: number;
    peso: number;
    temperatura: number;
    presion: number;
    saturacion: number;
    ubicacion: string;
}

export interface ActivitiesContextModel{
    activities: Activity[];
    addActivity: (name: string, lastName:string, date: string, 
        estatura: number, peso:number, temperatura:number, presion:number,
        saturacion: number, ubicacion: string) => void;
    completeActivity: (activityId: string) => void;
}

const ActivitiesContext = React.createContext<ActivitiesContextModel>({
    activities: [],
    addActivity: () => {},
    completeActivity: () => {}
})

export default ActivitiesContext