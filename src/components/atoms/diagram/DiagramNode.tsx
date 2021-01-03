import React from 'react';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';

const DiagramNode = (props: any) => {
  const {inputs} = props;

  return (
    <div style={{background: '#717EC3', borderRadius: '10px'}}>
      <div style={{padding: '10px', color: 'white'}}>Custom Node</div>
      <div style={{marginTop: '20px'}}>
        {inputs.map((port: any) =>
          React.cloneElement(port, {
            style: {width: '50px', height: '25px', background: '#1B263B'},
          })
        )}
      </div>
    </div>
  );
};

export default DiagramNode;
