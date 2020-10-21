import React from 'react'

const Display = (props) => {
    console.log('This is Display Props: ',props)

    const loaded = () => (
        <div style={{ textAlign: 'center' }}>
            {props.rc_vehicles.map((vehicle) => (
                <article>
                    <img src={vehicle.img} alt=""/>
                    <h3>{vehicle.name}</h3>
                    <button onClick={() => {
                        props.selectVehicle(vehicle)
                        props.history.push('/edit')
                    }}>
                        Edit
                    </button>
                    <button onClick={() => {
                        props.deleteVehicle(vehicle)
                    }}>
                        Delete
                    </button>
                </article>
            ))}
        </div>
    )

    return props.vehicle.length > 0 ? loaded() : <h1>Loading...</h1>
}

export default Display