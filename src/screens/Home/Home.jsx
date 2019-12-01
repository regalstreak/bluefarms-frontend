import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber'
import './Home.scss';
import { useSpring, a } from 'react-spring/three';
import Fab from '@material-ui/core/Fab'
import Card from '@material-ui/core/Card';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


export default (props) => {
    const [plantClicked, setPlantClicked] = useState(false);

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = date => {
        setSelectedDate(date);
    };


    return (
        <div className='Home'>
            <div className="top-bar">
                <img src={require('../../assets/bluefarms_logo.svg')} width={70} alt='bluefarms logo' />
                <div className="main-top-bar">
                    <div className="farm-text">Rushab's farm</div>
                    <div className="plant-button">
                        <Fab onClick={() => { setPlantClicked(true) }} color='secondary' variant='extended'>
                            Plant
                        </Fab>
                        {
                            plantClicked ? <div>
                                questions

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>



                                <div onClick={() => { setPlantClicked(false) }}>x</div>
                            </div> : null
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

            <WebGL />

        </div>
    )
}


const WebGL = () => (
    <Canvas orthographic camera={{ position: [0, 0, 10], zoom: 80 }} >

        <Frame position={[0, 1.4, 0]} />
        <Frame position={[0, 0, 0]} />
        <Frame position={[0, -1.4, 0]} />

        <ambientLight args={[0x404040, 20]} />
    </Canvas>
)

const Frame = (props) => {
    const [hovered, setHovered] = useState(false);

    const { color, scale } = useSpring({
        color: hovered ? 'cadetblue' : 'cyan',
        scale: hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]
    })

    return (
        <a.mesh
            onPointerOver={() => { setHovered(true) }}
            onPointerOut={() => { setHovered(false) }}
            position={props.position}
            rotation={[0.3, Math.PI / 4, 0]}
            scale={scale}

        >
            <a.boxBufferGeometry attach='geometry' args={[2.7, 0.7, 3.5]} />
            <a.meshBasicMaterial color={color} attach='material' />
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