import { createBrowserRouter } from 'react-router-dom'
import List from '../components/List'
import Create from '../components/Create'
import Edit from '../components/Edit'
import Single from '../components/Single'


const router = createBrowserRouter([
    {
        path: "/",
        element: <List/>

    },
    {
        path: '/create',
        element: <Create/>
    },
    {
        path: '/edit/:id',
        element: <Edit/>
    },
    {
        path: '/view/:id',
        element: <Single/>
    }
])

export default router