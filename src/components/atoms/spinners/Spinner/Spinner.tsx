import clsx from 'clsx';
import React from 'react';
import './spinner.css';

const classes = {
  root: 'loader-root',
  fullscreen: 'loader-full-screen',
  notFullScreen: 'loader-not-full-screen',
  ballPath: 'loader-ball-triangle-path',
};

type Props = {
  fullscreen?: boolean;
};

const Spinner = (props: Props) => {
  const {fullscreen = false} = props;
  return (
    <div className={clsx(classes.root, fullscreen ? classes.fullscreen : classes.notFullScreen)}>
      <div className={clsx(classes.ballPath)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
