import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {useTheme} from '@material-ui/core';
import {Row} from '../containers';

const Spinner = () => {
  const {palette} = useTheme();
  return (
    <Row alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100%'}>
      <Loader type='Puff' color={palette.primary.main} height={100} width={100} />
    </Row>
  );
};

export default Spinner;
