import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

export default function DropDown({ items, trackIndex }) {
    const [display, setDisplay] = useState(false);

    return (
        <div className={display ? 'queue-item-right' : 'queue-item-right unactive'}>
            <FaEllipsisH onClick={() => { setDisplay(!display); }} />
            {display &&
                <div className='track-dropdown'>
                    {items.map((item, index) => <div key={index} className='track-dropdown-item' onClick={() => { item.handler(trackIndex) }}><div className="more-options"><span style={{ marginRight: '5px' }}>{item.icon}</span>{item.actionName}</div></div>)}
                </div>
            }
        </div>
    )
}