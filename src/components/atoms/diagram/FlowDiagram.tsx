import React, {useMemo, useState} from 'react';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import {Node, Link, DiagramSchema} from 'beautiful-react-diagrams/@types/DiagramSchema';
import 'beautiful-react-diagrams/styles.css';
import DiagramNode from './DiagramNode';

type Props<T> = {
  nodes: Node<T>[];
  links?: Link[];
};

function FlowDiagram<T>(props: Props<T>) {
  // create diagrams schema
  const {nodes, links} = props;
  const initialSchema = useMemo(() => createSchema({nodes}), []);
  const [schema, {onChange}] = useSchema<T>(initialSchema);
  console.debug({schema, links});
  return (
    <div style={{height: '100%'}}>
      <Diagram schema={schema as any} onChange={onChange as any} />
    </div>
  );
}

export default FlowDiagram;
