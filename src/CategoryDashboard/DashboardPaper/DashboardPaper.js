import React from 'react';
import { Paper } from 'material-ui';

const DashboardPaper = (props) => {
  const { title, subtitle, children, backgroundColor, textColor } = props;
  const styles = {
    wrapper: {
      padding: '1rem',
      marginTop: '.75rem'
    },
    header: {
      backgroundColor: backgroundColor || '#00BCD4',
      color: textColor || '#FFF',
      margin: '-1.75rem 0 1rem',
      padding: '1rem'
    },
    title: {
      display: 'block',
      fontSize: '1.25rem',
      marginBottom: '5px',
    },
    subtitle: {
      display: 'block',
      color: 'rgba(255,255,255, 0.7)'
    }
  };

  return (
    <Paper style={styles.wrapper}>
      {title && (
        <Paper style={styles.header}>
          <span style={styles.title}>{title}</span>
          {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
        </Paper>
      )}
      {children}
    </Paper>
  );
};

export default DashboardPaper;