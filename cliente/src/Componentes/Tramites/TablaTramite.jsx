import React, { useRef, useState, useEffect } from 'react';
import { Table, Input, Space } from 'antd';
import {Highlighter} from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {useNavigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Swal from 'sweetalert2';
import axios from "axios";
import { Content } from 'antd/lib/layout/layout';
import Cookies from "universal-cookie";
import { Button } from 'primereact/button'
import swal from 'sweetalert';

const TablaTramite = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const navigate = useNavigate();

  const cookies = new Cookies();

  const editarTramite = (id,name) => {
    const myData = {
      name: 'Tramites',
      id_tra: id
    }
    navigate("/EditarTramites", {state:{myData}});
    cookies.set('ideTramite', id, {path: '/'});

  }


  const [dataSource, setDataSource] = useState([

  ]);

  const EliminarTramite = (id) =>{
    const myData = {
      id_dep: id
    }
    axios.delete('http://localhost:8080/api/v1/tramite/eliminartramite/'+id)
    .then(({data}) => {
      swal({
      title: "Felicidades",
      text: "Tramite eliminado con exito",
      icon: "success",
      button: "Aceptar",
  }).then((result) => {
    window.location.reload();
  })
  
    }).catch(({response}) => {
  
  
  Swal.fire({
    title: 'Error eliminando el tramite',
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
      actualizarTablaT();
    }
  },[]);

  async function actualizarTablaT(){
    (async () => {
        axios.get('http://localhost:8080/api/v1/tramite/findByIdOrg/'+cookies.get('organizacion_id'))
      .then(({data}) => {

        for(let i = 0; i < data.user.length; i++){   

            const newTramite = {
            key: i,
            id: data.user[i]._id,
            tramite: data.user[i].nombre,
            nombreDepartamento: "",
            departamento: data.user[i].depaActual,
            descripcion: data.user[i].descripcion,
            editarTramite: <Button className='p-button-rounded p--info p-button-lg"' onClick={() => editarTramite(newTramite.id,newTramite.departamento)}label="Editar" />,
            eliminar: <Button style={{backgroundColor:"red"}} className='p-button-rounded p--info p-button-lg' onClick={() =>{EliminarTramite(newTramite.id)}} label="Eliminar" />,
        
          
          };

            nombreDepartamento(newTramite);
        }

  
      }).catch(({response}) => {
      })
    })();
}

async function nombreDepartamento(newTramite){
  (async () => {

    axios.get('http://localhost:8080/api/v1/departamento/findByIddepartamento/'+newTramite.departamento)
    .then(({data}) => {

      newTramite.nombreDepartamento = data.user.Nombre;

      setDataSource((pre) => {
        return [...pre, newTramite];
      });

    }).catch(({response}) => {
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
          placeholder={`Buscar ${dataIndex}`}
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
      title: 'Tramite',
      dataIndex: 'tramite',
      key: 'tramite',
      width: '30%',
      ...getColumnSearchProps('tramite')
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      key: 'descripcion',
      width: '40%',
    },
    {
      title: 'Departamento',
      dataIndex: 'nombreDepartamento',
      key: 'nombreDepartamento',
      width: '20%',
    },
    {
      title: 'Editar Tramite',
      dataIndex: 'editarTramite',
      key: 'editarTramite',
    },
    {
      title: 'Eliminar',
      dataIndex: 'eliminar',
      key: 'eliminar',
  },
  ];
  return <Table columns={columns} dataSource={dataSource } />;
};

export default TablaTramite;