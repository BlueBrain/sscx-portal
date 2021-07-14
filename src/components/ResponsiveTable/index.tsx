import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Breakpoint } from "antd/lib/_util/responsiveObserve";
import React, { ReactNode } from "react";

type ColumnType<Type extends object> = {
    label: string; 
    dataIndex: keyof Type;
}

type ResponsiveTableProps<Type extends object> = {
    data: Type[];
    columns: ColumnType<Type>[];
}

function ResponsiveTable<Type extends object> ({columns, data}: ResponsiveTableProps<Type>) {
    const baseColumns: ColumnsType<Type> = [
        {
            title: null,
            render: (_value, _record, index) => {
                const labelIndex = index % columns.length;
                const label = columns[labelIndex].label;
                return label;
            },
            // responsive
        },
        {
            title: null,
            render: (_value, _record, index) => {
                const dataIndex = Math.floor(index/columns.length);

                const labelIndex = index % columns.length;
                const dataKey = columns[labelIndex].dataIndex;

                const value = data[dataIndex][dataKey];
                return value;
            },
            // responsive
        }
    ]
    const tableColumns = columns.map(({label, dataIndex}) => (
        {
            title: label,
            dataIndex: dataIndex as string,
            responsive: ['sm' as Breakpoint]
          }
    ));
    return (
        <Table<Type> columns={baseColumns} dataSource={data} />
    )
}

// export default ResponsiveTable;


type LayerAnatomy = {
    animal: string; 
    preview: ReactNode;
    layer: ReactNode;

}
const mockData: LayerAnatomy[] = [
    {animal: 'P14-12', preview: <img src="blob:https://bbp.epfl.ch/6f654518-1381-4c52-88f6-2f6720476cc1" alt="" />, layer: 'Layer 1'},
    {animal: 'P14-13', preview: <img src="blob:https://bbp.epfl.ch/6f654518-1381-4c52-88f6-2f6720476cc1" alt="" />, layer: 'Layer 2'},
    {animal: 'P14-14', preview: <img src="blob:https://bbp.epfl.ch/6f654518-1381-4c52-88f6-2f6720476cc1" alt="" />, layer: 'Layer 3'},
    {animal: 'P14-15', preview: <img src="blob:https://bbp.epfl.ch/6f654518-1381-4c52-88f6-2f6720476cc1" alt="" />, layer: 'Layer 4'},
    {animal: 'P14-16', preview: <img src="blob:https://bbp.epfl.ch/6f654518-1381-4c52-88f6-2f6720476cc1" alt="" />, layer: 'Layer 5'},
];

const mockColumn: ColumnType<LayerAnatomy>[] = [
    {label: 'Animal', dataIndex: 'animal'},
    {label: 'Preview', dataIndex: 'preview'},
    {label: 'Layer', dataIndex: 'layer'}, 
]

const MockTable = () => {
    return <ResponsiveTable<LayerAnatomy> columns={mockColumn} data={mockData}/>
}

export default MockTable