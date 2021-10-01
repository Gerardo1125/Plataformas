import React, { useState } from "react";
import ActivitiesContext, { ActivitiesContextModel, Activity } from "./context";

const ActivitiesContextProvider: React.FC = (props) => {
    const [activities, setActivities] = useState<Activity[]>([        
    ])

    const addActivity = (name: string, lastName: string, date: string,
        estatura: number, peso: number, temperatura: number, presion: number,
        saturacion: number, ubicacion: string) => {
        const newActivity: Activity = {
            id: Math.random().toString(),
            name, lastName, date, estatura, peso, temperatura, presion,
            saturacion, ubicacion
        };

        setActivities(currActivities => {
            return [...currActivities, newActivity];
        });
    }

    const completeActivity = (activityId: string) => {
        setActivities(currActivities => {
            const updateActivities = { ...currActivities }
            const selectedActivityindex = activities.findIndex(act => act.id === activityId)
            const updateActivity = { ...updateActivities[selectedActivityindex] }
            updateActivities[selectedActivityindex] = updateActivity
            return updateActivities
        })
    }

    const activitiesContext: ActivitiesContextModel = {
        activities,
        addActivity,
        completeActivity
    }

    return (
        <ActivitiesContext.Provider value={activitiesContext}>
            {props.children}
        </ActivitiesContext.Provider>
    )
}

export default ActivitiesContextProvider