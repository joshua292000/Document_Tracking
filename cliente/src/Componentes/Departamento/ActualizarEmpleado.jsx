import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, DatePicker, Select  } from 'antd';
import { UserOutlined, AuditOutlined, BankOutlined, PhoneOutlined, CommentOutlined, SolutionOutlined, HomeOutlined} from '@ant-design/icons';
import { message } from 'antd';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import axios from "axios";
import moment from "moment";
import Cookies from "universal-cookie";



const App = ({idU, cedulaU, nombreU, PapellidoU, SApellidoU, fechaU, edadU, nacionalidadU, direccionU, correoU, TelefonoU, puestoU}) => {

    const [form] = Form.useForm();

  const resetearForm = () => {
    form.resetFields();
    setVisible(false);
  }
  
  const cookies = new Cookies();

  const { Option } = Select;

  const [visible, setVisible] = useState(false);

  const [cedula, setCedula] = useState('');

  const [nombre, setNombre] = useState('');

  const [Papellido, setPApellido] = useState('');

  const [Sapellido, setSApellido] = useState('');

  const [fechaNac, setFechaNacimiento] = useState(new Date());

  const [edad, setEdad] = useState('');

  const [nacionalidad, setNacionalidad] = useState('');

  const [direccion, setDireccion] = useState('');

  const [correo, setCorreo] = useState('');

  const [telefono, setTelefono] = useState('');

  const [rol, setRol] = useState([

  ]);
  const [tipoEmpleado, setTipoEmp] = useState('');
  

    const onFinish = (values) => {

        console.log(fechaNac);

        const newData = {
          Identificacion: cedula,
          Nombre: nombre,
          PApellido: Papellido,
          SApellido: Sapellido,  
          FecNaci: fechaNac,
          Edad: edad,
          Nacionalidad: nacionalidad,
          direccion: direccion,
          Correo: correo,
          Telefono: telefono,
          rol: tipoEmpleado

        }

        axios.put('http://localhost:8080/api/v1/persona/actualizarpersona/'+idU, newData)
        .then(({data}) => {
  
          setTimeout(() => {
            swal({
                title: "Felicidades",
                text: "Infromacion de empleado actualizada",
                icon: "success",
                button: "Aceptar"
            }).then((result) => {
              window.location.reload();
            })
  
        },200)
  
        }).catch(({response}) => {
  
      }) 

        
    };


    useEffect(() => {
      return () => {
        (
          async () => {
            axios.get('http://localhost:8080/api/v1/roles/findallroles')
            .then(({data}) => {
    
              for(let i = 0; i < data.user.length; i++){   
                const newRol = {
                key: i,
                id_rol: data.user[i]._id,
                nombre: data.user[i].nombre,
                };
                setRol((pre) => {
                  return [...pre, newRol];
                });
            }
    
            }).catch(({response}) => {
      
           })
          }
        )();
    }
    },[]);

    const onChangeEmpleado = (value) => {
        setTipoEmp(value);
      };
    
      const onSearch = (value) => {
        console.log('search:', value);
      };

      const handleDateChange = date => {
        console.log(date);
    }

    useEffect(() => {
        setCedula(cedulaU);
        setNombre(nombreU);
        setPApellido(PapellidoU)
        setSApellido(SApellidoU);
        setFechaNacimiento(fechaU);
        setEdad(edadU);
        setNacionalidad(nacionalidadU);
        setDireccion(direccionU);
        setCorreo(correoU);
        setTelefono(TelefonoU)
        setTipoEmp(puestoU);

      },[]);

      const cargarForm = () => {
        form.setFieldsValue({cedulaE: cedula, nombreE: nombre, PapellidoE: Papellido, SapellidoE: Sapellido, 
          fechaNacimiento: moment(fechaNac), edadE: edad, nacionalidadE: nacionalidad, direccionE: direccion, 
          correoE: correo, telefonoE: telefono, tipoEmpleadoE: tipoEmpleado});
        setVisible(true)
      }


  return (
    <>
      <button className='button-users' onClick={() => cargarForm()}>
      </button>

      <Modal
        title="Actualizar empleado"
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
        name="cedulaE"
        rules={[
          {
            required: true,
            message: 'La cedula del empleado es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="Cedula" onChange={(e) => setCedula(e.target.value)} prefix={<SolutionOutlined />} />
      </Form.Item>

      <Form.Item
        name="nombreE"
        rules={[
          {
            required: true,
            message: 'El nombre del empleado es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del empleado" onChange={(e) => setNombre(e.target.value)} prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item
        name="PapellidoE"
        rules={[
          {
            required: true,
            message: 'El primer apellido del empleado es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="PApellido" onChange={(e) => setPApellido(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="SapellidoE"
        rules={[
          {
            required: true,
            message: 'El segundo apellido del empleado es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="SApellido" onChange={(e) => setSApellido(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>


      <Form.Item
        name="fechaNacimiento"
        rules={[
          {
            required: true,
            message: 'La fecha de nacimiento es requerida',
          },
        ]}
      >
        <DatePicker placeholder="Fecha de nacimiento" onChange={date => setFechaNacimiento(date)} style={{ width: '100%' }}  />
      </Form.Item>

      <Form.Item
        name="edadE"
        rules={[
          {
            required: true,
            message: 'La edad del empleado es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="edad" onChange={(e) => setEdad(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="nacionalidadE"
        rules={[
          {
            required: true,
            message: 'La nacionalidad del empleado es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="nacionalidad" onChange={(e) => setNacionalidad(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="direccionE"
        rules={[
          {
            required: true,
            message: 'La direccion del empleado es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="direccion" onChange={(e) => setDireccion(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>


      <Form.Item
        name="correoE"
        rules={[
          {
            required: true,
            message: 'La direccion de correo del empleado es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="correo" onChange={(e) => setCorreo(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="telefonoE"
        rules={[
          {
            required: true,
            message: 'El numero de telefono del empleado es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="telefono" onChange={(e) => setTelefono(e.target.value)} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
      name="tipoEmpleadoE"
    >
       <Select
        showSearch
        placeholder="Rol a Asignar"
        optionFilterProp="children"
        onChange={onChangeEmpleado}
        onSearch={onSearch}
        prefix={<HomeOutlined />}
      >
      {rol.map(rol => (
            <Option key={rol.key} value={rol.id_rol}> {rol.nombre}</Option>
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
          Actualizar
        </Button>
      </Form.Item>
    </Form>
      </Modal>
      
    </>
  );
};

export default App;