import Modal from 'react-modal'
import styles from './styles.module.scss'

import { FiX } from 'react-icons/fi'
import { AppointmentItemProps } from '@/pages/dashboard'

interface ModalAppointmentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  appointment: AppointmentItemProps[];
  handleAproveOrder: (id: string)=> void
}

export function ModalAppointment({
  isOpen,
  onRequestClose,
  appointment,
  handleAproveOrder,
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

  console.log("teste", appointment[0]);
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#fe9300" />
      </button>

      <div className={styles.container}>
        <h2>Detalhe do Apontamento</h2>
        <span className={styles.table}>
          Ordem de Serviço: {appointment[0].appointments.id}
          <h3>Descrição das atividades:</h3>
          <span className={styles.observation}>
            {appointment[0].appointments.description}
          </span>
        </span>

        {appointment.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span className={styles.description}>
              {item?.service?.description}
            </span>
          </section>
        ))}
        <button
          className={styles.buttonAprove}
          onClick={() => handleAproveOrder(appointment[0].appointments.id)}
        >
          Aprovar Apontamento
        </button>
      </div>
    </Modal>
  );
}
