import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Select, DatePicker  } from 'antd';
import {  CommentOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import axios from "axios";
import Cookies from "universal-cookie";
import uniquid from 'uniquid';
import { Button } from 'primereact/button'


const App = ({mostrar}) => {

  const cookies = new Cookies();

  const {Option} = Select;

  const [visible, setVisible] = useState(false);

  const [nombre, setNombre] = useState('');

  const [descripcion, setDescripcion] = useState('');

  const [telefono, setTelefono] = useState('');

  const [caso, setCaso] = useState('');

  const [fechaFin, setFechaFinalizacion] = useState(new Date());

  const departamentos = [

  ]

  const [dep, setDepartamentos] = useState([]);

  const [depart, setDepart] = useState('');

  const [tram, setTram] = useState('');

  const [IdCaso, setIdCaso] = useState('');

  useEffect(() => {
    return () => {
      axios.get('http://localhost:8080/api/v1/departamento/getByIdOrg/'+ cookies.get('organizacion_id'))
      .then(({data}) => {

      const newArr = [...dep];

      for(let i = 0; i < data.user.length; i++){   

          const newStudent = {
            key: i,
            nombre: data.user[i].Nombre,
            idDepartamento: data.user[i]._id,
          };
          newArr.push(newStudent);
      }
      setDepartamentos(newArr);
  
      }).catch(({response}) => {

        })
    }
  },[]);

  const [myArray, setMyArray] = useState([]);

  const tramites = [
    {
        
    }
  ]

 /* const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}*/

const onFinish = (values) => {
var idCaso = "";
    const newCaso = {
      NombreCaso: caso,
      FechaInicio: new Date(),
      FechaFin: fechaFin,
      NumeroCaso: uniquid(),
      Estado: true,
      Tramite_id: tram,
      CasosXDepartamento: [{
        FechaIniciod: new Date(),
        FechaFind: fechaFin,
        Departamento: depart
    }],
      Organizacion_id: cookies.get('organizacion_id')
    }

    axios.post('http://localhost:8080/api/v1/caso/registrarcaso', newCaso)
      .then(({data}) => {

        console.log(data.user._id);
        idCaso = data.user._id;

        axios.get('http://localhost:8080/api/v1//tramite/findByIdtramite/'+tram)
      .then(({data}) => {

        for(var i = 0; i < data.user.documentos.length; i++){

          const newDocumento = {
            Identificacion: uniquid(),
            Nombre: data.user.documentos[i].nombre_doc,
            Anexo: "",
            Estado: false,
            Tipo: data.user.documentos[i].tipo_doc,
            Tramite_id: tram,
            Caso_id: idCaso
            }

          axios.post('http://localhost:8080/api/v1/documento/registrardocumento',newDocumento)
          .then(({data}) => {
          }).catch(({response}) => {
           
           })

        }

      }).catch(({response}) => {
           
        })

        Swal.fire({
            title: 'Caso registrado con exito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
            }).then((result) => {
               window.location.reload();
            })

      }).catch(({response}) => {
            Swal.fire({
              title: 'Organizacion o correo ingresado ya existentes',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
              }).then((result) => {
              
              })
        })

};

   const [form] = Form.useForm();

  const resetearForm = () => {
    form.resetFields();
    setVisible(false);
  }

  const onChangeTramites = (value) => {

    setDepart(value);

    axios.get('http://localhost:8080/api/v1/tramite/getByIdDep/'+ value)
      .then(({data}) => {

      const newArr = [];

      for(let i = 0; i < data.user.length; i++){   
        const newtramite = {
            key: i,
            nombre: data.user[i].nombre,
            idDepartamento: data.user[i].depaActual,
            idTramite: data.user[i]._id
        }
        newArr.push(newtramite);
      }

      setMyArray(newArr);

  
      }).catch(({response}) => {
            Swal.fire({
              title: 'Organizacion o correo ingresado ya existentes',
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
              }).then((result) => {
              
              })
        })
  };

  const onChangeCasos = (value) => {
    setTram(value);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <>
       <Button icon="pi pi-plus" className="p-button-rounded p-button-info p-button-lg" onClick={() => setVisible(true)} label="Nuevo Caso" />
    <br/>

      <Modal
        title="Nuevo Caso"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => resetearForm()}
        footer={null}
        width={400}
        >
        <Form
        form={form}
        name="basic"
        labelCol={{
            span: 16,
        }}
        wrapperCol={{
            span: 24,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
        >
            <Form.Item
            name="nombreCaso"
            rules={[
            {
                required: true,
                message: 'El nombre del caso es requerido',
            },
            ]}
        >
            <Input size="large" placeholder="Nombre del caso" onChange={(e) => setCaso(e.target.value)} prefix={<CommentOutlined />} />
        </Form.Item>

        <Form.Item
            name="departamento"
            rules={[
            {
                required: true,
                message: 'El nombre del departamento es requerido',
            },
            ]}
        >
            <Select
        showSearch
        placeholder="Departamento"
        optionFilterProp="children"
        onChange={onChangeTramites}
        onSearch={onSearch}
        prefix={<CommentOutlined />}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        {dep.map(documento => (
            <Option key={documento.key} value={documento.idDepartamento}> {documento.nombre}</Option>
      ))}
      </Select>
        </Form.Item>

        <Form.Item
            name="tramites"
            rules={[
            {
                required: true,
                message: 'El nombre del tramite es requerido',
            },
            ]}
        >
            <Select
        showSearch
        placeholder="Tramites"
        optionFilterProp="children"
        onChange={onChangeCasos}
        onSearch={onSearch}
        prefix={<CommentOutlined />}
        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      >
        {myArray.map(documento => (
            <Option key={documento.key} value={documento.idTramite}> {documento.nombre}</Option>
      ))}
      </Select>
        </Form.Item>

        <Form.Item
            name="Finalizacion"
            rules={[
            {
                required: true,
                message: 'La descripcion del departamento es requerida',
            },
            ]}
        >
           <DatePicker placeholder="Fecha de finalizacion" onChange={date => setFechaFinalizacion(date)} style={{ width: '100%' }}  />
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 18,
            span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
            Crear Caso
            </Button>
        </Form.Item>
        </Form>
      </Modal>
      
    </>
  );
};

export default App;