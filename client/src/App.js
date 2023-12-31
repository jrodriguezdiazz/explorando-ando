import {BrowserRouter, Switch} from 'react-router-dom';

import EmptyLayout from './components/layout/EmptyLayout';
import MainLayout from './components/layout/MainLayout';
import PublicLayout from './components/layout/PublicLayout';
import RestrictRoute from './components/layout/RestrictRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import TripMaintenance from './pages/admin/trip/TripMaintenance';
import TripTable from './pages/admin/trip/TripTable';
import UserMaintenance from './pages/admin/user/UserMaintenance';
import UserTable from './pages/admin/user/UserTable';
import AboutUs from './pages/public/AboutUs';
import Contact from './pages/public/Contact';
import HomePage from './pages/public/HomePage';
import InternalError from './pages/public/InternalError';
import Login from './pages/public/Login';
import NotFound from './pages/public/NotFound';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import Profile from './pages/public/Profile';
import SingUp from './pages/public/SingUp';
import TermsAndConditions from './pages/public/TermsAndConditions';
import TripDetail from './pages/public/TripDetail';
import TripsResults from './pages/public/TripsResults';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/*  ERRORS */}
        <PublicRoute exact path="/error-interno" layout={EmptyLayout} component={InternalError} />

        {/*/!*  AUTH *!/*/}
        {/*<PublicRoute exact path="/recuperar-contrasena" layout={EmptyLayout} component={RecoverPass} />*/}
        {/*<PublicRoute exact path="/reiniciar-contrasena" layout={EmptyLayout} component={ResetPass} />*/}
        <RestrictRoute exact path="/iniciar-sesion" layout={EmptyLayout} component={Login} />
        <RestrictRoute exact path="/registrarse" layout={EmptyLayout} component={SingUp} />

        {/*/!*  PUBLIC *!/*/}
        <PublicRoute exact path="/" layout={PublicLayout} component={HomePage} />
        <PublicRoute exact path="/contacto" layout={PublicLayout} component={Contact} />
        <PublicRoute
          exact
          path="/explora"
          layout={PublicLayout}
          component={TripsResults}
        />
        <PublicRoute exact path="/explora/:tripId" layout={PublicLayout} component={TripDetail} />
        <PublicRoute exact path="/sobre-nosotros" layout={PublicLayout} component={AboutUs} />
        <PublicRoute
          exact
          path="/politica-de-privacidad"
          layout={PublicLayout}
          component={PrivacyPolicy}
        />
        <PublicRoute
          exact
          path="/terminos-y-condiciones"
          layout={PublicLayout}
          component={TermsAndConditions}
        />


        {/*/!*  PRIVATE *!/*/}
        {/*<PrivateRoute exact path="/reservar-destino" layout={PublicRoute} component={FinishOrder} />*/}

        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/pedido-completado"*/}
        {/*  layout={PublicRoute}*/}
        {/*  component={OrderCompleted}*/}
        {/*/>*/}

        {/*<PrivateRoute exact path="/verificar" layout={PublicRoute} component={VerifyToken} />*/}

        {/*<PublicRoute exact path="/kiosko" layout={PublicRoute} component={ShoppingCart} />*/}

        {/*  ADMIN */}
        <PrivateRoute exact path="/dashboard" layout={MainLayout} component={AdminDashboard} />

        <PrivateRoute
          exact
          path="/dashboard/destinos"
          layout={MainLayout}
          component={TripTable}
        />
        <PrivateRoute
          exact
          path="/dashboard/destinos/editar"
          layout={MainLayout}
          component={TripMaintenance}
        />
        <PrivateRoute
          exact
          path="/dashboard/destinos/agregar"
          layout={MainLayout}
          component={TripMaintenance}
        />

        <PrivateRoute
          exact
          path="/dashboard/usuarios"
          layout={MainLayout}
          component={UserTable}
        />
        <PrivateRoute
          exact
          path="/dashboard/usuarios/editar"
          layout={MainLayout}
          component={UserMaintenance}
        />

        <PrivateRoute
          exact
          path="/dashboard/usuarios/agregar"
          layout={MainLayout}
          component={UserMaintenance}
        />

        <PrivateRoute
          exact
          path="/profile"
          layout={PublicLayout}
          component={Profile}
        />

        {/*<PrivateRoute exact path="/dashboard/sala" layout={MainLayout} component={RoomTable} />*/}

        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/promociones/agregar"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={PromotionMaintenance}*/}
        {/*/>*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/promociones/editar"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={PromotionMaintenance}*/}
        {/*/>*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/promociones"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={PromotionTable}*/}
        {/*/>*/}

        {/*<PrivateRoute exact path="/dashboard/pelicula" layout={MainLayout} component={MovieTable} />*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/pelicula/agregar"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={MovieMaintenance}*/}
        {/*/>*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/pelicula/editar"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={MovieMaintenance}*/}
        {/*/>*/}


        {/*<PrivateRoute exact path="/dashboard/kiosko" layout={MainLayout} component={FoodTable} />*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/comida/editar"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={FoodMaintenance}*/}
        {/*/>*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/comida/agregar"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={FoodMaintenance}*/}
        {/*/>*/}

        {/*<PrivateRoute exact path="/dashboard/agendar" layout={MainLayout} component={MovieSchedule} />*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/venta"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={ShoppingHistoryTable}*/}
        {/*/>*/}
        {/*<PrivateRoute*/}
        {/*  exact*/}
        {/*  path="/dashboard/venta/detalle-de-factura"*/}
        {/*  layout={MainLayout}*/}
        {/*  component={InvoiceDetail}*/}
        {/*/>*/}

        <PublicRoute exact path="*" layout={EmptyLayout} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
