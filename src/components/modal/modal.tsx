import React, { useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalsContainer = document.getElementById('react-modals')!;
// if (!modalsContainer) {
//     throw new Error('Element #react-modals not found')
// }

function Modal(props) {

    const closeModalOnEsc = (evt) => {
        if (evt.key === 'Escape') {
            props.onClose();
        }
    }

    const closeModal = () => {
        props.onClose();
    }

    useEffect(() => {
        window.addEventListener('keydown', closeModalOnEsc);
        return () => {
            window.removeEventListener('keydown', closeModalOnEsc);
        }
    }, []);

    return createPortal(
        <>
            <ModalOverlay onClose={props.onClose}/> 
            <div className={styles.modal}>
                {props.title && (
                <h2 className={`${styles.title} + text text_type_main-large pl-10 pr-10 pt-10 pb-3`}>
                    {props.title}
                </h2>)}
                 <button className={styles.close} onClick={() => {props.onClose(false)}} type="button"> 
                    <CloseIcon type='primary'/>
                </button>
                {props.children}
            </div>
        </>, modalsContainer
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

export default Modal;