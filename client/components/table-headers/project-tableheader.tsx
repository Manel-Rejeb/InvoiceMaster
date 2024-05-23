import { DELETE } from '@/actions/project-actions';
import { queryClient } from '@/util/react-query-client';
import { useMutation } from '@tanstack/react-query';
import { Table } from 'antd/lib';
import { Button, message, Popconfirm, Space, TableColumnsType } from 'antd/lib';
import Link from 'next/link';
import { FC} from 'react'
import { LuFileEdit, LuTrash } from 'react-icons/lu';

interface ComponentProps {
    isLoading: boolean;
    data: ProjectType[];
}

export const ProjectTable:FC<ComponentProps> = ({isLoading, data}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const {mutate} = useMutation({
        mutationFn: DELETE,
        onSettled: async () => {
          await queryClient.invalidateQueries({ queryKey: ['projects'] })
        },
        onSuccess: () => 
          messageApi.open({
            type: 'success',
            content: 'Item successfully deleted.',
          }),
        onError: () => 
          messageApi.open({
            type: 'error',
            content: 'Cannot delete this item.',
          }),
    })

// table header
const projectColumns: TableColumnsType<ProjectType> = [
    Table.EXPAND_COLUMN,
    {
        title: 'Name',
        dataIndex: 'project_name',
        key: 'project_name',
        sorter: (a, b) => a.project_name.toLowerCase().localeCompare(b.project_name.toLowerCase()),
        width: '30%',
        
    },
    {
        title: 'Description',
        dataIndex: 'project_description',
        key: 'project_description',
    },
    {
        title: 'Status',
        dataIndex: 'project_status',
        key: 'project_status',
    },
    {
        title: 'Start Date',
        dataIndex: 'project_start_date',
        key: 'project_start_date',
    },
    {
        title: 'End Date',
        dataIndex: 'project_end_date',
        key: 'project_end_date',
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        align: 'right',
        render: (id) => (
            <Space>
                <Link passHref href={`/dashboard/projects/${id}`}>
                    <Button type='link' icon={<LuFileEdit />} />
                </Link>
                <Popconfirm
                    title='Are you sure to delete this project?'
                    onConfirm={() => mutate(id)}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button icon={<LuTrash size={18} />} danger />
                </Popconfirm>
            </Space>
        ),

    },

]
return(
        
    <>
    {contextHolder}
     <Table columns={projectColumns} rowKey={'id'} dataSource={data} loading={isLoading} bordered />
    </>


 )

}