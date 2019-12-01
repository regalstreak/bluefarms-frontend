import React from 'react';
import Fab from '@material-ui/core/Fab';
import { Link, withRouter } from 'react-router-dom';
import './Components.scss';


const NavigationButton = (props) => {
    let active;
    if (props.location.pathname === props.to) {
        active = true;
    }
    const circleColor = active ? 'yellow' : 'green'

    return (
        <Link className="navigation-button" to={props.to}>
            <Fab size='medium' color='primary'>
                <img width={20} src={props.img} alt={props.alt} />
            </Fab>

            <div style={{ background: circleColor, width: 12, height: 12, borderRadius: '50%', marginTop: 8 }} />
        </Link>
    )
}

export default withRouter(NavigationButton);