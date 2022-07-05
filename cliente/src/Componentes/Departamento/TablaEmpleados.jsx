import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import ActualizarEmpleado from '../Departamento/ActualizarEmpleado';
import axios from "axios";
import 'antd/dist/antd.min.css';
import { Button } from 'primereact/button'
import swal from 'sweetalert';
import Swal from 'sweetalert2';

const App = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([

  ]);



  const EliminarEmple = (id) =>{
    const myData = {
      id_dep: id
    }
    axios.delete('http://localhost:8080/api/v1/persona/eliminarpersona/'+id)
    .then(({data}) => {
      swal({
      title: "Felicidades",
      text: "Empleado eliminado con exito",
      icon: "success",
      button: "Aceptar",
  }).then((result) => {
    window.location.reload();
  })
  
    }).catch(({response}) => {
  
  
  Swal.fire({
    title: 'Error eliminando al empleado',
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
    }).then((result) => {
    
    })
  
  })
  }


  useEffect(() => {
    return () => {
      (async () => {
        axios.get('http://localhost:8080/api/v1/persona/getAllByIdDepartamento/'+props.id_dep)
        .then(({data}) => {

          for(let i = 0; i < data.user.length; i++){   
            const newUser = {
            key: i,
            id: data.user[i]._id,
            cedula: data.user[i].Identificacion,
            nombre: data.user[i].Nombre,
            Papellido: data.user[i].PApellido,
            Sapellido: data.user[i].SApellido,         
            fecha: data.user[i].FecNaci,
            puesto: data.user[i].rol,
            editar: <ActualizarEmpleado idU={data.user[i]._id} cedulaU={data.user[i].Identificacion} nombreU={data.user[i].Nombre} 
            PapellidoU={data.user[i].PApellido} SApellidoU={data.user[i].SApellido}  fechaU={data.user[i].FecNaci} 
            puestoU={data.user[i].rol} />,
            eliminar: <Button style={{backgroundColor:"red"}} className='p-button-rounded p--info p-button-lg' onClick={() =>{EliminarEmple(newUser.id)}} label="Eliminar" />

            };
            setDataSource((pre) => {
              return [...pre, newUser];
            });
        }

        }).catch(({response}) => {
  
       })
      }
      )();
    }
  },[]);
  
  const myData = {
    name: 'Recursos Humanos'
  }

  function editarDepartamento(id){

    return(
      <ActualizarEmpleado/>
    );
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula',
      width: '20%',
      ...getColumnSearchProps('cedula'),
    },

    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
      width: '20%',

    },
    {
      title: 'PApellido',
      dataIndex: 'Papellido',
      key: 'Papellido',
      width: '20%',
      ...getColumnSearchProps('Papellido'),
    },

    {
      title: 'SApellido',
      dataIndex: 'Sapellido',
      key: 'Sapellido',
      width: '20%',
      ...getColumnSearchProps('Sapellido'),
    },

    {
      title: 'Puesto',
      dataIndex: 'puesto',
      key: 'puesto',
      width: '20%',
      ...getColumnSearchProps('puesto'),
    },
    {
      title: 'Editar',
      dataIndex: 'editar',
      key: 'editar',
    },
    {
      title: 'Eliminar',
      dataIndex: 'eliminar',
      key: 'eliminar',
  },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
};

export default App;