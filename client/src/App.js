import {Switch} from 'react-router-dom';
import EmptyLayout from './components/layout/EmptyLayout';
import PublicLayout from './components/layout/PublicLayout';
import PublicRoute from './components/routes/PublicRoute';
import AboutUs from './pages/public/AboutUs';
// import LoginContainer from '@/containers/auth/LoginContainer';
// import RecoverPass from '@/containers/auth/RecoverPass';
// import ResetPass from '@/containers/auth/ResetPass';
// import SignUpContainer from '@/containers/auth/SignUpContainer';
import Contact from './pages/public/Contact';
import DestinationDetail from './pages/public/DestinationDetail';
import HomePage from './pages/public/HomePage';
import InternalError from './pages/public/InternalError';
import NotFound from './pages/public/NotFound';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsAndConditions from './pages/public/TermsAndConditions';

function App() {
  return (<Switch>
    {/*  ERRORS */}
    <PublicRoute exact path="/error-interno" layout={EmptyLayout} component={InternalError} />

    {/*/!*  AUTH *!/*/}
    {/*<PublicRoute exact path="/recuperar-contrasena" layout={EmptyLayout} component={RecoverPass} />*/}
    {/*<PublicRoute exact path="/reiniciar-contrasena" layout={EmptyLayout} component={ResetPass} />*/}
    {/*<RestrictRoute exact path="/iniciar-sesion" layout={EmptyLayout} component={LoginContainer} />*/}
    {/*<RestrictRoute exact path="/registrarse" layout={EmptyLayout} component={SignUpContainer} />*/}

    {/*/!*  PUBLIC *!/*/}
    <PublicRoute exact path="/" layout={PublicLayout} component={HomePage} />
    <PublicRoute exact path="/contacto" layout={PublicLayout} component={Contact} />
    <PublicRoute exact path="/detalle-de-destino" layout={PublicLayout} component={DestinationDetail} />
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

    {/*/!*  ADMIN *!/*/}
    {/*<PrivateRoute exact path="/dashboard" layout={MainLayout} component={DashboardContainer} />*/}

    {/*<PrivateRoute*/}
    {/*  exact*/}
    {/*  path="/dashboard/sala/agregar"*/}
    {/*  layout={MainLayout}*/}
    {/*  component={RoomMaintenance}*/}
    {/*/>*/}
    {/*<PrivateRoute*/}
    {/*  exact*/}
    {/*  path="/dashboard/sala/editar"*/}
    {/*  layout={MainLayout}*/}
    {/*  component={RoomMaintenance}*/}
    {/*/>*/}
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

    {/*<PrivateRoute*/}
    {/*  exact*/}
    {/*  path="/dashboard/usuario/agregar"*/}
    {/*  layout={MainLayout}*/}
    {/*  component={UserMaintenance}*/}
    {/*/>*/}
    {/*<PrivateRoute*/}
    {/*  exact*/}
    {/*  path="/dashboard/usuario/editar"*/}
    {/*  layout={MainLayout}*/}
    {/*  component={UserMaintenance}*/}
    {/*/>*/}
    {/*<PrivateRoute exact path="/dashboard/usuario" layout={MainLayout} component={UserTable} />*/}

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
  </Switch>);
}

export default App;
