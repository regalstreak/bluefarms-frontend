import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber'
import './Home.scss';
import { useSpring, a } from 'react-spring/three';
import Fab from '@material-ui/core/Fab'
import Card from '@material-ui/core/Card';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { markets } from './home'

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { fetchPotato } from '../../networking/azure';

export default (props) => {
    const [plantClicked, setPlantClicked] = useState(false);

    const [selectedDate, setSelectedDate] = React.useState(null);

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const [autoMarket, setAutoMarket] = useState('');

    function findAllPlants() {
        fetchPotato(2, 2);
    }

    const [stackHovered, setStackHovered] = useState(1)

    const parentHovered = (data) => {
        setStackHovered(data)
    }

    return (
        <div className='Home'>
            <div className="top-bar">
                <img src={require('../../assets/bluefarms_logo.svg')} width={70} alt='bluefarms logo' />
                <div className="main-top-bar">
                    <div className="farm-text">Rushab's farm
                    <div className='mainParams'>

                            <div className='singleMainParam'>
                                Planting Capacity
                             </div>
                             <div className="singleMainParamAnswer">90%</div>
                            <div className='singleMainParam'>
                                Operational Efficiency
                             </div>
                             <div className="singleMainParamAnswer">80%</div>
                            <div className='singleMainParam'>
                                Upcoming Harvests
                              </div>
                             <div className="singleMainParamAnswer">19</div>

                        </div>
                    </div>
                    <div className="plant-button">

                        {
                            plantClicked ? <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Time to harvest"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                                <Autocomplete
                                    id="combo-box-demo"
                                    options={markets}
                                    onChange={(e, value) => { setAutoMarket(value) }}
                                    value={autoMarket}
                                    getOptionLabel={option => option}
                                    renderInput={params => (
                                        <TextField {...params} label="Market to sell" fullWidth />
                                    )}
                                />

                                <div className="plant-question-buttons">
                                    <Button size='small' variant='outlined' onClick={() => { setPlantClicked(false) }}>
                                        Cancel
                                     </Button>
                                    <Button size='small' variant='outlined' onClick={() => { findAllPlants() }}>
                                        Go ahead
                                    </Button>
                                </div>
                            </div> :

                                <Fab onClick={() => { setPlantClicked(true) }} color='secondary' variant='extended'>
                                    Plant
                                </Fab>
                        }
                    </div>
                </div>


                <div className="left-section">
                    <div className="plant-status">
                        <PlantStatus />
                    </div>
                    <div className="activity-log">
                        <ActivityLog />
                    </div>

                </div>
            </div>

            <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 80 }} >

                <Frame parentHovered={parentHovered} id={3} position={[0, 1.4, 0]} />
                <Frame parentHovered={parentHovered} id={2} position={[0, 0, 0]} />
                <Frame parentHovered={parentHovered} id={1} position={[0, -1.4, 0]} />

                <ambientLight />
                <spotLight position={[2, 2, 2]} />
            </Canvas>


            <div className="stack-info">

                <Card className='stack-card'>
                    Stack {stackHovered}<br />
                    Ambient Temperature: 26 <br />
                    Crop Varieties: 02<br />
                    Alerts: 0<br />
                </Card>
            </div>

        </div>
    )
}


const WebGL = () => {
}

const Frame = (props) => {
    const [hovered, setHovered] = useState(false);

    const { color, scale } = useSpring({
        color: hovered ? 'dodgerblue' : 'cyan',
        scale: hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]
    })

    if (hovered) {
        props.parentHovered(props.id)
    }

    return (
        <a.mesh
            onPointerOver={() => { setHovered(true) }}
            onPointerOut={() => { setHovered(false) }}
            position={props.position}
            rotation={[0.3, Math.PI / 4, 0]}
            scale={scale}

        >
            <a.boxBufferGeometry attach='geometry' args={[2.7, 0.7, 3.5]} />
            <a.meshPhysicalMaterial color={color} attach='material' />
        </a.mesh>
    )
}

const ActivityLog = () => {
    return (
        <>
            <div className="activity-log-text">
                Activity Log
        </div>
            <ActivityComponent text='Nutrient Stock B replenish in tra..' />
            <ActivityComponent text='Drop Humidity to 45% in chambe..' />
            <ActivityComponent text='Drop Temperature to 24 C in cha..' />
            <ActivityComponent text='Nutrient Stock B replenish in tra..' />
        </>
    )
}
const PlantStatus = () => {
    return (
        <>
            <div className="activity-log-text">
                Plant Status
        </div>
            <ActivityComponent text='Stack One: 8/8 Stable' />
            <ActivityComponent text='Stack One: 6/8 Stable' />
            <ActivityComponent text='Stack One: 7/8 Stable' />
        </>
    )
}

const ActivityComponent = (props) => {
    return (
        <Card className='activity-card'>
            {props.text}
        </Card>
    )
}