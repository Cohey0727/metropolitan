import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export type TableColumn<T> = {
  label: React.ReactNode;
  accessor: ((data: T) => React.ReactNode) | keyof T;
  align?: 'right' | 'left';
  component?: React.ComponentType<{data: T; align?: 'right' | 'left'}>;
};

type Props<T> = {
  rows: T[];
  columns: TableColumn<T>[];
};

export default function BasicTable<T>(props: Props<T>) {
  const {rows, columns} = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} variant='outlined'>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((data, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => {
                const {accessor, align, component: CellComponent = TableCell} = column;
                const value =
                  typeof accessor === 'string' ? data[accessor] : (accessor as Function)(data);
                const cellProps = {align, data} as any;
                return (
                  <CellComponent key={`${rowIndex}@${colIndex}`} {...cellProps}>
                    {value}
                  </CellComponent>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
