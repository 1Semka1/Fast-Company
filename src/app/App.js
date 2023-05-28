import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvide from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'

function App() {
    return (
        <div className="font-montserrat-script">
            <AuthProvide>
                <NavBar />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route path="/login/:type?" component={Login} />
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvide>
            <ToastContainer />
        </div>
    )
}

export default App
