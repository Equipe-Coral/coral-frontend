import styled from 'styled-components';
import PropTypes from 'prop-types';

const TagWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background-color: ${props => {
        switch (props.$status) {
            case 'enviado':
                return '#FFF4E6';
            case 'aberto':
                return '#E8F5E9';
            case 'concluido':
                return '#FFEBEE';
            default:
                return '#F5F5F5';
        }
    }};
  color: ${props => {
        switch (props.$status) {
            case 'enviado':
                return '#F57C00';
            case 'aberto':
                return '#2E7D32';
            case 'concluido':
                return '#C62828';
            default:
                return '#666';
        }
    }};
`;

export default function StatusTag({ status }) {
    const getStatusText = () => {
        switch (status) {
            case 'enviado':
                return 'Enviado';
            case 'aberto':
                return 'Aberto';
            case 'concluido':
                return 'Concluído';
            default:
                return status;
        }
    };

    return <TagWrapper $status={status}>{getStatusText()}</TagWrapper>;
}

StatusTag.propTypes = {
    status: PropTypes.oneOf(['enviado', 'aberto', 'concluido']).isRequired,
};
