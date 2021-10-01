import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Activities from './pages/Activities/Activities';
import ShowActivities from './pages/ShowActivities/ShowActivities';
import ActivitiesContextProvider from './data/provider';

import {bodyOutline, newspaper} from 'ionicons/icons'

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu side="start" contentId="changeView">
          <IonHeader>

            <IonToolbar>

              <IonTitle>Cambiar vista</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem routerLink="/add-activities" routerDirection="none" lines="none">
                  <IonIcon color="medium" slot="start" icon={bodyOutline} />
                  <IonLabel>Añadir personal</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/show-activities" routerDirection="none" lines="none">
                  <IonIcon color="medium" slot="start" icon={newspaper} />
                  <IonLabel>Ver personal</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <ActivitiesContextProvider>
          <IonRouterOutlet id="changeView">
            <Route path="/add-activities" component={Activities} exact />
            <Route path="/show-activities" component={ShowActivities} exact />
            <Redirect to="/add-activities" />
          </IonRouterOutlet>
        </ActivitiesContextProvider>
      </IonReactRouter>
    </IonApp>
  )

};

export default App;
