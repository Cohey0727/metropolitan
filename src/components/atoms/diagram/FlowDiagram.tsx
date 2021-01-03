import React, {useMemo} from 'react';
import Diagram, {createSchema, useSchema} from 'beautiful-react-diagrams';
import {Node, Link} from 'beautiful-react-diagrams/@types/DiagramSchema';
import 'beautiful-react-diagrams/styles.css';

type Props<T> = {
  nodes: Node<T>[];
  links?: Link[];
};

function FlowDiagram<T>(props: Props<T>) {
  const {nodes, links} = props;
  const initialSchema = useMemo(() => createSchema({nodes, links}), []);
  const [schema, {onChange}] = useSchema<T>(initialSchema);
  return (
    <div style={{height: '100%'}}>
      <Diagram schema={schema as any} onChange={onChange as any} />
    </div>
  );
}

export default FlowDiagram;
