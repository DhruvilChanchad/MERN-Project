import React,{useState , useEffect} from 'react'
import "./totalcount.css"
import axios from 'axios'

function Totalcount() {

    const [count , setCount] = useState([])

    useEffect(() => {
        axios.get('http://localhost:9002/projects/status')
        .then(res => {
            console.log(res)
            setCount(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            {
                count.map(post => <div className='count' key={post.Total}>
                    
                        <div className="countItem">
                            <span className="countTitle">Registered</span>
                            <div className="countContainer">
                                <span className="countTotal">{post.Total[0].Registered}</span>
                            </div>
                        </div>
                        <div className="countItem">
                            <span className="countTitle">Closed</span>
                            <div className="countContainer">
                                <span className="countTotal">{post.Closed[0].Closed}</span>
                            </div>
                        </div>
                        <div className="countItem">
                            <span className="countTitle">Running</span>
                            <div className="countContainer">
                                <span className="countTotal">{post.Running[0].Running}</span>
                            </div>
                        </div>
                        <div className="countItem">
                            <span className="countTitle">Closure Delay</span>
                            <div className="countContainer">
                                <span className="countTotal">{post.Closure[0].Closure}</span>
                            </div>
                        </div>
                        <div className="countItem">
                            <span className="countTitle">Cancelled</span>
                            <div className="countContainer">
                                <span className="countTotal">{post.Cancelled[0].Cancelled}</span>
                            </div>
                        </div>
                </div>)
            }
        </div>
    )
}

export default Totalcount
