import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from 'primereact/button'
import swal from 'sweetalert';

const App = ({origin}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [url, setUrl] = useState(origin ? "/admin/casos/tramitespordepartamentos" : "/EditarDepartamento");

  const navigate = useNavigate();
  
  const [dataSource, setDataSource] = useState([

  ]);

  const cookies = new Cookies();


const EliminarDepa = (id) =>{
  const myData = {
    id_dep: id
  }
  axios.delete('http://localhost:8080/api/v1/departamento/eliminardepartamento/'+id)
  .then(({data}) => {
    swal({
    title: "Felicidades",
    text: "Departamento eliminado con exito",
    icon: "success",
    button: "Aceptar",
}).then((result) => {
  window.location.reload();
})

  }).catch(({response}) => {


Swal.fire({
  title: 'Error eliminando el departamento',
  icon: 'warning',
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Aceptar'
  }).then((result) => {
  
  })

})
}


  const redireccionamiento = (id, nombre) => {
    const myData = {
      name: nombre,
      id_dep: id
    }
    navigate(url, {state:{myData}});
  }

  useEffect(() => {
    return () => {
      actualizarTabla();
    }
  },[]);

  async function actualizarTabla(){
    (async () => {
      axios.get('http://localhost:8080/api/v1/departamento/getByIdOrg/'+ cookies.get('organizacion_id'))
      .then(({data}) => {

      for(let i = 0; i < data.user.length; i++){   
          const newStudent = {
          key: i,
          id: data.user[i]._id,
          departamento: data.user[i].Nombre,
          correo: data.user[i].Correo,
          redirect: <Button className='p-button-rounded p--info p-button-lg' onClick={() =>{redireccionamiento(newStudent.id, newStudent.departamento)}} label="Editar" />,
          eliminar: <Button style={{backgroundColor:"red"}} className='p-button-rounded p--info p-button-lg' onClick={() =>{EliminarDepa(newStudent.id)}} label="Eliminar" />,
        
        };
          setDataSource((pre) => {
            return [...pre, newStudent];
          });
      }
  
      }).catch(({response}) => {

          if(response.status == "500"){
            Swal.fire({
              title: 'Organizacion o correo ingresado ya existentes',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
              }).then((result) => {
              
              })
          }else if(response.status == "500"){
            Swal.fire({
              title: 'Se produjo un error',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
              }).then((result) => {
              
              })
          }
        })
    })();

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
      title: 'Departamento',
      dataIndex: 'departamento',
      key: 'departamento',
      width: '50%',
    },
    {
      title: 'Correo electronico',
      dataIndex: 'correo',
      key: 'correo',
      width: '30%',
      ...getColumnSearchProps('correo'),
    },
    {
        title: origin ? 'Tramites' : 'Editar',
        dataIndex: 'redirect',
        key: 'redirect',
    },

    {
      title: origin ? 'Tramites' : 'Eliminar',
      dataIndex: 'eliminar',
      key: 'eliminar',
  },
  ];

  return <Table columns = {columns} dataSource={dataSource} />;
};

export default App;