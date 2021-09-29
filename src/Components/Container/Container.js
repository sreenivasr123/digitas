import React from 'react'
import './Container.scss'
export default function Container(props) {
    return (
        <div className="Container">
            {props.children}
        </div>
    )
}
