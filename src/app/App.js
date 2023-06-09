import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import { ProfessionProvider } from './hooks/useProfession'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import AppLoader from './components/ui/hoc/appLoader'

function App() {
    return (
        <div className="font-montserrat-script">
            <AppLoader>
                <NavBar />
                <ProfessionProvider>
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
                </ProfessionProvider>
            </AppLoader>
            <ToastContainer />
        </div>
    )
}

export default App
