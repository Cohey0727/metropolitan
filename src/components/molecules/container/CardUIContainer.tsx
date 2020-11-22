import React, {RefObject, useEffect, useRef, useState} from 'react';
import {Column, Row} from '../../atoms/containers';

type Props = {
  children: JSX.Element[];
  itemWidth: number;
};

const CardUIContainer = (props: Props) => {
  const {children, itemWidth} = props;
  const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  const [items, setItems] = useState(children);

  useEffect(() => {
    const clientWidth = ref.current!.clientWidth;
    const countPerRow = Math.floor(clientWidth / itemWidth);
    const extraItemCount = countPerRow - (children.length % countPerRow);
    const extraItems = [...Array(extraItemCount)].map((index) => (
      <div key={`dummy-${index}`} style={{width: itemWidth}} />
    ));
    setItems((_items) => [..._items, ...extraItems]);
  }, [ref, children, itemWidth]);

  return (
    <Column overflowY='auto' ref={ref}>
      <Row flexWrap='wrap' justifyContent='space-around'>
        {items}
      </Row>
    </Column>
  );
};

export default CardUIContainer;
