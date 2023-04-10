import React, { useState } from 'react'
import './Tooltip.css'

const Tooltip = ({spot, children}) => {
    const [visibleTooltip, setVisibleTooltip] = useState(false)

    const onMouseLeaveHandler = () => {
        setVisibleTooltip(false)
    }

    const onMouseEnterHandler = () => {
        setVisibleTooltip(true)
    }

    return (
        <div className="tooltip"
            onMouseLeave={onMouseLeaveHandler}
            onMouseEnter={onMouseEnterHandler}
        >
            {children}
            {visibleTooltip &&
            <div className='tooltip-content'>
                {spot.name}
            </div>}
        </div>
    )
}

export default Tooltip
