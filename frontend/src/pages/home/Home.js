import React from 'react'
import "./Home.css"
import Totalcount from '../../components/totalcount/Totalcount'
import Barchart from '../../components/chart/Chart'

export default function home() {
    return (
        <div className="home">
            <Totalcount />
            <Barchart />
        </div>
    )
}
