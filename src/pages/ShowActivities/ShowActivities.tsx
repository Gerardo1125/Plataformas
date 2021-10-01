import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext } from "react";
import ActivitiesContext from "../../data/context";

const ShowActivities: React.FC = () => {

    const activitiesContext = useContext(ActivitiesContext)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle> PACIENTES </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    {
                        activitiesContext.activities.length === 0 ?
                            <p>Aun no se han agredado personal</p>
                            :
                            activitiesContext.activities.map(action => (
                                <IonRow >
                                    <IonCol className="ion-text-center">
                                        <IonCard key={action.id}>
                                            <IonCardHeader color="danger">
                                                <IonCardTitle>{action.name + " " + action.lastName}</IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent>
                                                <IonRow >
                                                    <IonCol>
                                                        <img src={"https://picsum.photos/200/300?random=1"} style={{ height: "80%" }} />
                                                    </IonCol>
                                                    <IonCol>
                                                        <IonRow style={{background: "#CDCBCB"}}>
                                                            <IonCol>
                                                                <IonLabel>Nacimiento: {action.date}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol>
                                                                <IonLabel>Presion: {action.presion}</IonLabel>
                                                            </IonCol>
                                                            <IonCol>
                                                                <IonLabel>Presion: {action.presion}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow style={{background: "#CDCBCB"}}>

                                                            <IonCol>
                                                                <IonLabel>Saturación: {action.saturacion}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow>
                                                            <IonCol className="ion-text-center">
                                                                <IonLabel>Peso:{action.peso}</IonLabel>
                                                            </IonCol>
                                                            <IonCol>
                                                                <IonLabel>Estatura:{action.estatura}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        
                                                        <IonRow style={{background: "#CDCBCB"}}>
                                                            <IonCol>
                                                                <IonLabel>Temperatura: {action.temperatura}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>

                                                        <IonRow>
                                                            <IonCol>
                                                                <IonLabel>Saturación: {action.saturacion}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        <IonRow style={{background: "#CDCBCB"}}>
                                                            <IonCol>
                                                                <IonLabel>Ubicación: {action.ubicacion}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonCol>
                                                </IonRow>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            )
                            )
                    }


                </IonGrid>
            </IonContent>
        </IonPage >
    )
}

export default ShowActivities;