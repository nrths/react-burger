import { useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { TModalProps } from '../../services/types/types';

const modalsContainer = document.getElementById('react-modals');

const Modal: FC<TModalProps> = (props) => {

    useEffect(() => {
        const closeModalOnEsc = (evt: KeyboardEvent) => {
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

export default Modal;