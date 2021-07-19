import React from 'react';
import { Table } from 'antd';
import { ColumnType as AntColumnType, ColumnsType, TableProps } from 'antd/lib/table';
import { Breakpoint } from 'antd/lib/_util/responsiveObserve';

import classes from './responsiveTable.module.scss';

interface ColumnType<Type extends object & {isHighlight?: boolean}> extends Omit<AntColumnType<Type>, 'dataIndex'> {
    dataIndex: keyof Type;
}

interface ResponsiveTableProps<Type extends object & {isHighlight?: boolean}> extends Omit<TableProps<Type>, 'columns'> {
    data: Type[];
    columns: ColumnType<Type>[];
}

function ResponsiveTable<Type extends object & {isHighlight?: boolean}> ({columns, data, ...restProps}: ResponsiveTableProps<Type>) {
    const expandabeColumn = 
        {
            title: null,
            dataIndex: null,
            render: (_value, record, index) => {
                 const nestedTableData = columns.map((column) => ({
                     key: column.title,
                     value: record[column.dataIndex]
                 }))
                 const nestedColumns: ColumnType<{key: string; value: string}>[] = [{dataIndex: 'key', title: 'Field'}, {dataIndex: 'value', title: 'Value'}]

                return (
                <Table
                    className={classes.expandableTable}
                    rowClassName={index % 2? classes.responsiveTablEven: classes.responsiveTablOdd}
                    showHeader={false} 
                    columns={nestedColumns}
                    tableLayout="fixed"
                    dataSource={nestedTableData} 
                    pagination={false} 
                />
                )
            },
            responsive: ['xs' as Breakpoint]
        }
    const tableColumns: ColumnsType<Type> = columns.map(({title, dataIndex, ...restProps}) => (
        {
            title,
            dataIndex: dataIndex as string,
            responsive: ['sm' as Breakpoint],
            render: (value: any, record: Type, index: number) => {
                if(record.isHighlight) {
                    return (
                    <div className="text-bold">
                        {value}
                    </div>)
                }
                return value;
            },
            ...restProps
          }
    ))
    .concat(expandabeColumn);

    return (
        <Table<Type>
            bordered
            size="small"
            pagination={false} 
            className={classes.responsiveTable} 
            columns={tableColumns} 
            dataSource={data} 
            rowClassName={(_record: Type, index: number,) => index % 2? classes.responsiveTablEven: classes.responsiveTablOdd}
            {...restProps}
        />
    )
}

export default ResponsiveTable;
