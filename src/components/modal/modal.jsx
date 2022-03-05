import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalsContainer = document.getElementById('react-modals');

function Modal(props) {

    useEffect(() => {
        const closeModalOnEsc = (evt) => {
            if (evt.key === 'Escape') {
                props.onClose();
            }
        }

        window.addEventListener('keydown', closeModalOnEsc);
        return () => {
            window.removeEventListener('keydown', closeModalOnEsc);
        }
    }, [props, props.onClose]);

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