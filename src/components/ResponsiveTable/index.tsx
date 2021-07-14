import React from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";

import classes from './responsiveTable.module.scss';

type ColumnType<Type extends object> = {
    label: string; 
    dataIndex: keyof Type;
}

type ResponsiveTableProps<Type extends object> = {
    data: Type[];
    columns: ColumnType<Type>[];
}

function ResponsiveTable<Type extends object> ({columns, data}: ResponsiveTableProps<Type>) {
    const expandabeColumn = 
        {
            title: null,
            dataIndex: null,
            render: (_value, record, index) => {
                 const nestedTableData = columns.map((column) => ({
                     key: column.label,
                     value: record[column.dataIndex]
                 }))
                 const nestedColumns: ColumnType<{key: string; value: string}>[] = [{dataIndex: 'key', label: 'Field'}, {dataIndex: 'value', label: 'Value'}]

                return (
                <Table
                    rowClassName={index % 2? classes.responsiveTablEven: classes.responsiveTablOdd}
                    showHeader={false} 
                    columns={nestedColumns}
                    dataSource={nestedTableData} 
                    pagination={false} 
                />
                )
            },
            responsive: ['xs' as Breakpoint]
        }
    const tableColumns: ColumnsType<Type> = columns.map(({label, dataIndex}) => (
        {
            title: label,
            dataIndex: dataIndex as string,
            responsive: ['sm' as Breakpoint]
          }
    ))
    .concat(expandabeColumn);

    return (
        <Table<Type> 
        pagination={false} 
        className={classes.responsiveTable} columns={tableColumns} dataSource={data} 
        rowClassName={(_record: Type, index: number,) => index % 2? classes.responsiveTablEven: classes.responsiveTablOdd}
        />
    )
}

export default ResponsiveTable;


