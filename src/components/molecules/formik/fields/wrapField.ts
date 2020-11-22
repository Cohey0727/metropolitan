import {createElement, ComponentType} from 'react';
import {Field, FieldAttributes, FieldProps} from 'formik';

const wrapField = (
  Component: ComponentType<FieldProps & {[K: string]: any}>
) => (props: FieldAttributes<any>) =>
  createElement(Field, {
    ...props,
    component: Component,
  });

export default wrapField;
