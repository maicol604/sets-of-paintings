import React from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const TooltipBox = ({title}) => {
  return <div>{title}</div>;
};

// Estilos personalizados para el tooltip
const CustomStyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',     // Fondo blanco
    color: '#000',               // Texto en negro
    fontSize: '14px',            // Tamaño de la fuente
    borderRadius: '8px',         // Bordes redondeados
    padding: '10px 15px',        // Espaciado interno
    maxWidth: '220px',           // Ancho máximo
    border: '2px solid #000',    // Borde de 2 píxeles en negro
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#fff',               // Color de la flecha (blanca para que coincida con el fondo)
    border: '2px solid #000',    // Borde de la flecha de 2 píxeles en negro
    display: 'none',
  },
}));

const CustomTooltip = ({ title, children, show = false, open = undefined }) => {
  return (
    <CustomStyledTooltip title={<TooltipBox title={title}/>} placement="left" open={open} arrow>
      {children}
    </CustomStyledTooltip>
  );
};

export default CustomTooltip;
