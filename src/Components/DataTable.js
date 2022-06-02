import React from 'react';
import {useNavigate} from 'react-router-dom';

import { Table } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const ImageCell = ({record}) => {
    return (
        <div
            style={{
            overflow: "hidden",
            display: "inline-flex",
            }}
        >
            <img
            src={record["avartar"]}
            alt=""
            style={{ width: 36, height: 36, borderRadius: 2, marginRight: "10px"}}
            />
            <div className='profile-info'>
                <div className='profile-name'>
                  {record["name"]}
                </div>
                {record["status"] === "active" ? (
                    <div className="status txt-purple">
                      {record["status"]}
                    </div>
                ) : (
                    <div className="status text-muted">
                      {record["status"]}
                    </div>
                )}
            </div>
        </div>
    );
}


const columns = [{  
    title: 'Id',
    dataIndex: 'key',
    sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
    // defaultSortOrder: 'descend'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    render:(_, record) => (
        <>
            <ImageCell record = { record } />
        </>
    )
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    align: 'right',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
      title: 'TC',
      dataIndex: 'tc',
      sorter: (a, b) => a.age - b.age,
      align: 'right',
      className: 'txt-purple'
  },
  {
      title: 'STAKE',
      dataIndex: 'stake',
      sorter: (a, b) => a.age - b.age,
      align: 'right',
      className: 'txt-blue',
      render: (_, record) => (
          <>
            {record.stake + " NMR"}
          </>
      )
  },
  {
      title: '1 Day',
      dataIndex: 'day1',
      sorter: (a, b) => a.age - b.age,
      align: 'right',
      render: (_, record) => (
          <>
          {
            record.day1 >= 0 ? (record.day1?(<span className='txt-green'><CaretUpOutlined /> {record.day1 + " %"}</span>):(<span className='text-muted'>—</span>)):
            (<span className='txt-red'><CaretDownOutlined /> {-record.day1 + " %"}</span>)
          
          }
          </>
      )
  }
];

// fetch data from API
const data = [
  {
    key: 1,
    avartar: 'assets/images/default_avartar.jpg',
    name: 'John Brown',
    status: 'active',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tc: 0.0950,
    stake: 24.04,
    day1: 0
  },
  {
    key: 2,
    name: 'Jim Green',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'active',
    age: 42,
    address: 'London No. 1 Lake Park',
    tc: 0.0802,
    stake: 2.93,
    day1: -0.53
  },
  {
    key: 3,
    name: 'Joe Black',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'active',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tc: 0.0757,
    stake: 11.43,
    day1: -0.06
  },
  {
    key: 4,
    name: 'Jim Red',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'inactive',
    age: 32,
    address: 'London No. 2 Lake Park',
    tc: 0.1950,
    stake: 1,
    day1: 14.4
  },
  {
    key: 5,
    avartar: 'assets/images/default_avartar.jpg',
    name: 'John Brown',
    status: 'active',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tc: 0.0950,
    stake: 24.04,
    day1: 0
  },
  {
    key: 6,
    name: 'Jim Green',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'active',
    age: 42,
    address: 'London No. 1 Lake Park',
    tc: 0.0802,
    stake: 2.93,
    day1: -0.53
  },
  {
    key: 7,
    name: 'Joe Black',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'active',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tc: 0.0757,
    stake: 11.43,
    day1: -0.06
  },
  {
    key: 8,
    name: 'Jim Red',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'inactive',
    age: 32,
    address: 'London No. 2 Lake Park',
    tc: 0.1950,
    stake: 1,
    day1: 14.4
  },
  {
    key: 9,
    avartar: 'assets/images/default_avartar.jpg',
    name: 'John Brown',
    status: 'active',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tc: 0.0950,
    stake: 24.04,
    day1: 0
  },
  {
    key: 10,
    name: 'Jim Green',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'active',
    age: 42,
    address: 'London No. 1 Lake Park',
    tc: 0.0802,
    stake: 2.93,
    day1: -0.53
  },
  {
    key: 11,
    name: 'Joe Black',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'active',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tc: 0.0757,
    stake: 11.43,
    day1: -0.06
  },
  {
    key: 12,
    name: 'Jim Red',
    avartar: 'assets/images/default_avartar.jpg',
    status: 'inactive',
    age: 32,
    address: 'London No. 2 Lake Park',
    tc: 0.1950,
    stake: 1,
    day1: 14.4
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const DataTable = () => {
  const navigate = useNavigate();
  return (
    <Table columns={columns} dataSource={data} onChange={onChange} size="small" 
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            navigate('/profile', {state:{id:record.key, name:record.name}});
          },
        };
      }}
    />
  );
};

export default DataTable;