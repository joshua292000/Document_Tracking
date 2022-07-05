import React, {useState, useEffect} from "react";
import { Modal, Input, Form, Alert, Select  } from 'antd';
import { useLocation } from 'react-router-dom';
import {ContainerOutlined,AlignCenterOutlined, HomeOutlined} from '@ant-design/icons';
import { message } from 'antd';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from "axios";
import { Button } from 'primereact/button'
import Cookies from "universal-cookie";
import uniquid from "uniquid";

const { Option } = Select;

const CrearTramite = (mostrar) => {

  const location = useLocation();

    const [visible, setVisible] = useState(false);

    const [Identificacion, setIdentificacion] = useState('');

    const [nombre, setnombre] = useState('');

    const [depaActual, setdepaActual] = useState('');

    const [descripcion, setDescripcion] = useState('');

    const [nombreDep, setNombreDep] = useState('');

    const [idDep, setIdDep] = useState('');

    const [estadoCiclo, setEstadoCiclo] = useState('');

    const [nombreDoc, setNombreDoc] = useState('');

    const [descripcionDoc, setDesdoc] = useState('');

    const [estado, setEstado] = useState('');

    const [tipoArch, setTipoArc] = useState('');

    const [dep, setDep] = useState([

    ]);
    
    const data = location.state;

    const cookies = new Cookies();


    useEffect(() => {
      console.log(cookies.get('organizacion_id'))
      return () => {
        (
          async () => {
            axios.get('http://localhost:8080/api/v1/departamento/getByIdOrg/'+cookies.get('organizacion_id'))
            .then(({data}) => {
    
              for(let i = 0; i < data.user.length; i++){   
                const newDep = {
                key: i,
                id_dep: data.user[i]._id,
                nombre: data.user[i].Nombre,
                };
                setDep((pre) => {
                  return [...pre, newDep];
                });
            }
    
            }).catch(({response}) => {
      
           })
          }
        )();
    }
    },[]);

    const onFinish = (values) => {
      if(nombre != '' && depaActual != ''){


        const user = {
          Identificacion: uniquid(),
          nombre: nombre,
          depaActual: depaActual,
          descripcion: descripcion,
          organizacion_id: cookies.get('organizacion_id'),
          ciclo:[],
          documentos:[],
          casos:[]

      }
      console.log("Esto lleva tramite ", user)
        axios.post('http://localhost:8080/api/v1/tramite/registrartramite',user)
        .then(({data}) => {


          setVisible(false);
          form.resetFields();
              swal({
                  title: "Felicidades",
                  text: "Tramite registrado con exito",
                  icon: "success",
                  button: "Aceptar",
              }).then((result) => {
                window.location.reload();
              })
              
                }).catch(({response}) => {
    
            if(response.status == "500"){
              Swal.fire({
                title: 'Tramite ya existentes',
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
      }else{
      
      }
  };

    const [form] = Form.useForm();

    const resetearForm = () => {
        form.resetFields();
        setVisible(false);
    }


    const onChangeDepartamento = (value) => {
        setdepaActual(value);
    };
  
    const onSearch = (value) => {
      console.log('search:', value);
    };

    return(
    <>
    

        <Button icon="pi pi-plus" className="p-button-rounded p-button-info p-button-lg" onClick={() => setVisible(true)} label="Nuevo tramite" />

    <Modal
        title="Nuevo Tramite"
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
        name="tramite"
        rules={[
          {
            required: true,
            message: 'El nombre del tramite es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del tramite" onChange={(e) => setnombre(e.target.value)} prefix={<ContainerOutlined />} />
      </Form.Item>

      <Form.Item
        name="Descripcion"
        rules={[
          {
            required: true,
            message: 'La Descripcion del tramite es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="Descripcion" onChange={(e) => setDescripcion(e.target.value)} prefix={<AlignCenterOutlined />} />
      </Form.Item>

      <Form.Item
      name="departamentoAsinar"
    >
       <Select
        showSearch
        placeholder="Departamento a Asignar"
        optionFilterProp="children"
        onChange={onChangeDepartamento}
        onSearch={onSearch}
        prefix={<HomeOutlined />}
      >
      {dep.map(documento => (
            <Option key={documento.key} value={documento.id_dep}> {documento.nombre}</Option>
      ))}
      </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 18,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Registrar
        </Button>
      </Form.Item>
    </Form>
      </Modal>

    </>
    );
}
export default CrearTramite;