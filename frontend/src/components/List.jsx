import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const List = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/v1/blog')
            const res = await response.json()
            setData(res)
        } catch (error) {
            setError(error.message || 'Error fetching data')
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    },[])
    if(loading){
        return <p>Loading . .  . . </p>
    }
    if(error){
        return <p>Error: {error}</p>
    }

  return (
    <>
        <div>
            <button><Link to="/create">Create</Link></button>
            <ul>
                {data.map((item, index) => (
                    <li key={index}><Link to={`/view/${item._id}`}>{item.title}</Link></li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default List