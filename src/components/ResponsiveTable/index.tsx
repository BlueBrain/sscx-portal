import React from 'react';
import { Table } from 'antd';
import { ColumnType as AntColumnType, ColumnGroupType as AntColumnGroupType, ColumnsType, TableProps } from 'antd/lib/table';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

import classes from './styles.module.scss';

interface ColumnType<Type extends object & {isHighlight?: boolean}> extends Omit<AntColumnType<Type>, 'dataIndex'> {
    dataIndex?: keyof Type;
}
interface GroupColumnType<Type extends object & {isHighlight?: boolean}> extends Omit<AntColumnGroupType<Type>, 'dataIndex'> {
  dataIndex?: keyof Type;
}

interface ResponsiveTableProps<Type extends object & {isHighlight?: boolean}> extends Omit<TableProps<Type>, 'columns'> {
    data: Type[];
    columns: (ColumnType<Type> | GroupColumnType<Type>)[];
}


const renderHighlightValue = (record, highlightedIndex) => (nestedValue, _value, nestedIndex) => (
  record.isHighlight && nestedIndex === highlightedIndex ? (
    <div className="text-bold">
      {nestedValue}
    </div>
  ) : nestedValue);

function ResponsiveTable<Type extends object & {isHighlight?: boolean}>({ columns, data, ...restProps }: ResponsiveTableProps<Type>) {
  const expandabeColumn = {
    title: null,
    dataIndex: null,
    render: (_value, record, index) => {
      const nestedTableData = columns.map((column) => {
        if (column.dataIndex) {
          return ({
            key: column.title,
            value: record[column.dataIndex],
          });
        }
        const children = (column as GroupColumnType<Type>).children;
        if (children) {
          const childrenValue = children.map((child) => (
            <div>
              {child.title}: {record[(child as ColumnType<Type>).dataIndex]}
            </div>
          ));
          return ({
            key: column.title,
            value: childrenValue,
          });
        }
        return null;
      });
      const nestedColumns: ColumnType<{key: string; value: string}>[] = [
        {
          dataIndex: 'key',
          title: 'Field',
          render: renderHighlightValue(record, 0),
        },
        {
          dataIndex: 'value',
          title: 'Value',
          render: renderHighlightValue(record, 0),
        },
      ];

      return (
        <Table
          className="responsiveTable no-left-margin nested-table xs-column"
          rowClassName={index % 2 ? classes.responsiveTablEven : classes.responsiveTablOdd}
          showHeader={false}
          columns={nestedColumns}
          tableLayout="fixed"
          dataSource={nestedTableData}
          pagination={false}
        />
      );
    },
    responsive: ['xs' as Breakpoint],
  };
  const tableColumns: ColumnsType<Type> = columns.map(({ title, dataIndex, ...restProps }) => (
    {
      title,
      dataIndex: dataIndex as string,
      responsive: ['sm' as Breakpoint],
      render: (value: any, record: Type, index: number) => {
        if (record.isHighlight) {
          return (
            <div className="text-bold">
              {value}
            </div>
          );
        }
        return value;
      },
      ...restProps,
    }
  ))
    .concat(expandabeColumn);

  return (
    <Table<Type>
      bordered
      size="small"
      pagination={false}
      columns={tableColumns}
      dataSource={data}
      className="responsiveTable"
      rowClassName={(_record: Type, index: number) => (index % 2 ? classes.responsiveTablEven : classes.responsiveTablOdd)}
      {...restProps}
    />
  );
}

export default ResponsiveTable;
