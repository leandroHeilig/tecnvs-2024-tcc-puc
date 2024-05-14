import Modal from 'react-modal'
import styles from './styles.module.scss'

import { FiX } from 'react-icons/fi'
import { AppointmentItemProps } from '@/pages/dashboard'

interface ModalAppointmentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  appointment: AppointmentItemProps[]
}

export function ModalAppointment({
  isOpen,
  onRequestClose,
  appointment,
}: ModalAppointmentProps) {

  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      backgroundColor: "#763497",
      transform: "translate(-50%, -50%)",
    },
  };

  console.log('teste',appointment[0])
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#fff" />
      </button>

      <div className={styles.container}>
        <h2>Detalhe do Apontamento</h2>
        <span className={styles.table}>
          Ordem de Serviço: {appointment[0].appointments.id}
        </span>
        <span>{ appointment[0].appointments.description}</span>
        {appointment.map(item => (
          <section key={item.id} className={styles.containerItem}>
            <span className={styles.description}>{ item.service.description }</span>

          </section>
        ))}
      </div>
    </Modal>
  );
}
