import React from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';

//React.memo : la fonction areEqual permet de dire si il est necessaire d'effectuer un rendu supplémentaire.
//Dans notre cas, si props.show n'a aps changé, il ne sert a rien d'actualiser
const modal = React.memo(props => {
    return <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Aux>;
});

function areEqual(prevProps, nextProps) {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
}


export  default React.memo(modal, areEqual);