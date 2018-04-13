import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
    wrapper: {
        position: 'absolute',
        width: '100%',
        top: '0',
        left: '0'
    },
    circle: {
        float: 'right',
        padding: '24px 48px'
    }
};

const LoadingBar = (props) => {
    return props.loading ? (
        <div style={styles.wrapper}>
            <LinearProgress mode='indeterminate' />
            <CircularProgress size={60} thickness={5} style={styles.circle} />
        </div>
    ) : null;
};

export default LoadingBar;
