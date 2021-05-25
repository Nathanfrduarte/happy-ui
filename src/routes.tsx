import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CreateOrphanage from './pages/CreateOrphanage'
import Landing from './pages/Landing'
import Orphanage from './pages/Orphanage'
import OrphanagesMap from './pages/OrphanagesMap'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/orphanages/create' component={CreateOrphanage} />
                <Route path='/orphanages/:id' component={Orphanage} />
                <Route path='/orphanages' component={OrphanagesMap} />
                <Route path='/' exact component={Landing} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
