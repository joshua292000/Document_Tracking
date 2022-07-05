import React, { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useLocation } from 'react-router-dom';
import NavBar from "./NavBar.js";
import { Link } from 'react-router-dom';
import { Alert, Form, Input, Select, DatePicker } from 'antd';
import { UserOutlined, AuditOutlined, BankOutlined, PhoneOutlined, CommentOutlined, SolutionOutlined, HomeOutlined} from '@ant-design/icons';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import TablaEmpleados from "../Componentes/Departamento/TablaEmpleados";
import axios from "axios";
import { Button } from 'primereact/button'


const { Option } = Select;

function EditarDepartamento(props) {

  const location = useLocation();

  const data = location.state;

const [showAlert, setShowAlert] = useState(false);

const [nombreDepartamentoT, setNombDepT] = useState('');


//Departamento
const [body, setBody] = useState({ departamento: '', descripcion: '', telefono: '', correoElectronico: '', jefeDepa:''})

	const handleChange = (e,name) => {

    if(name == "departamento"){
      body.departamento = e.target.value;
    } 
    else if(name == "descripcion"){
      body.descripcion = e.target.value;
    }
    else if(name == "telefono"){
      body.telefono = e.target.value;
    }
    else if(name == "correoElectronico"){
      body.correoElectronico = e.target.value;
    }
    else if(name == "tipoEmpleado"){
      body.jefeDepa = e.target.value;
    }

	}

  //Empleado
  const [cedula, setCedula] = useState('');

  const [nombre, setNombre] = useState('');

  const [Papellido, setPApellido] = useState('');

  const [Sapellido, setSApellido] = useState('');

  const [fechaNac, setFechaNacimiento] = useState('');

  const [edad, setEdad] = useState('');

  const [nacionalidad, setNacionalidad] = useState('');

  const [direccion, setDireccion] = useState('');

  const [correo, setCorreo] = useState('');

  const [telefono, setTelefono] = useState('');

  const [rol, setRol] = useState([ ]);

  const [tipoEmpleado, setTipoEmp] = useState('');

  const [form2] = Form.useForm();

  const [idJefe, setIdJefe] = useState('');

  const [emp, setEmp] = useState([]);


useEffect(() => {
  return () => {
    (async () => {
      axios.get('http://localhost:8080/api/v1/departamento/findByIddepartamento/'+data.myData.id_dep)
      .then(({data}) => {

        body.departamento = data.user.Nombre;
        body.descripcion = data.user.Descripcion;
        body.telefono = data.user.Telefono;
        body.correoElectronico = data.user.Correo;
        body.jefeDepa = data.user.Jefe;

        setNombDepT(body.departamento);

        cargarForm();


      }).catch(({response}) => {

     })
    }
    )();

    (
      async () => {
        axios.get('http://localhost:8080/api/v1/persona/getAllByIdDepartamento/'+data.myData.id_dep)
        .then(({data}) => {

          for(let i = 0; i < data.user.length; i++){   
            const newUser = {
            key: i,
            nombre: data.user[i].Nombre +' '+data.user[i].PApellido, 
            idJefe: data.user[i]._id
            };
            setEmp((pre) => {
              return [...pre, newUser];
            });
        }

        }).catch(({response}) => {
  
       })
      }
    )();
  }
},[]);

  
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

  const onChangeFecha = (value) => {
    setFechaNacimiento(value);
  };
  
  const onChangeJefe = (value) => {
    body.jefeDepa = value;
  };

  const onSearch = (value) => {
  };

    const actualizarDepartamento = (values) => {
      const user = {
        Nombre: body.departamento,
        Jefe: emp[0].idJefe,
        Descripcion: body.descripcion,
        Telefono: body.telefono,
        Correo: body.correoElectronico
      }
      axios.put('http://localhost:8080/api/v1/departamento/actualizardepartamento/'+data.myData.id_dep, user)
        .then(({data}) => {

  
          setTimeout(() => {
            swal({
                title: "Felicidades",
                text: "Infromacion de departamento actualizada",
                icon: "success",
                button: "Aceptar"
            }).then((result) => {
              window.location.reload();
            })
  
        },200)
  
        }).catch(({response}) => {
  
      }) 

    };


   const [form] = Form.useForm();

   const cargarForm = () => {
    if(body.jefeDepa != ''){
      form.setFieldsValue({departamento: body.departamento, jefeDepartamento: body.jefeDepa, descripcion: body.descripcion, telefono: body.telefono, correoElectronico: body.correoElectronico});
    }else{
      form.setFieldsValue({departamento: body.departamento, descripcion: body.descripcion, telefono: body.telefono, correoElectronico: body.correoElectronico});
    }
    
  }

   //Variables para agregar empleados
   const registrarUsuario = (values) => {

    const user = {
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
        rol: tipoEmpleado,
        departamento_id: data.myData.id_dep


    }

    axios.post('http://localhost:8080/api/v1/persona/crearpersona', user)
      .then(({data}) => {

        setTimeout(() => {
          swal({
              title: "Felicidades",
              text: "Infromacion de departamento actualizada",
              icon: "success",
              button: "Aceptar"
          }).then((result) => {
            window.location.reload();
          })

      },200)

      }).catch(({response}) => {

    })
  };


  return (
      <div className="metrics">
      <NavBar name = {<div>
                 <span className='nav-text' style={{cursor: "pointer"}} onClick={ () => {window.history.back()}}>Departamentos {'>'} </span>
                <span className='nav-text' style={{cursor: "pointer"}} > Editar</span></div>}/>
      <div className="grid-edit">
      <div className="top__edit" id = "Infodepa" >
        <div className="container_edit">
          <h3 id="txtCaso">Informacion del departamento</h3>
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
      onFinish={actualizarDepartamento}
      autoComplete="off"
    >
      <Form.Item
        name="departamento"
        rules={[
          {
            required: true,
            message: 'El nombre del departamento es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Nombre del departamento" onChange={e => handleChange(e,"departamento")} prefix={<BankOutlined />} />
      </Form.Item>

      <Form.Item
        name="descripcion"
        rules={[
          {
            required: true,
            message: 'La descripcion del departamento es requerida',
          },
        ]}
      >
        <Input size="large" placeholder="Descripcion" onChange={e => handleChange(e,"descripcion")} prefix={<AuditOutlined />} />
      </Form.Item>

      <Form.Item
        name="telefono"
        rules={[
          {
            required: true,
            message: 'El numero de telefono es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Telefono" onChange={e => handleChange(e,"telefono")} prefix={<PhoneOutlined />} />
      </Form.Item>

      <Form.Item
        name="correoElectronico"
        rules={[
          {
            required: true,
            message: 'El correo electronico es requerido',
          },
        ]}
      >
        <Input size="large" placeholder="Correo electronico" onChange={e => handleChange(e,"correoElectronico")} prefix={<CommentOutlined />} />
      </Form.Item>

      <Form.Item
      name="jefeDepartamento"
    >
       <Select
        showSearch
        placeholder="Jefe del departamento"
        optionFilterProp="children"
        onChange={onChangeJefe}
        onSearch={onSearch}
        prefix={<CommentOutlined />}
      >
        {emp.map((user)=> <Option key={user.key} value={user.nombre}/>) }
      </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 10,
        }}
      >
        <Button id= "ActualizarDepa" type="primary" className="p-button-rounded p-button-info p-button-lg" label= "Actualizar"/>
      </Form.Item>
    </Form>
        </div>
       </div>
       <div className="top__edit" id = "Infodepa">
       <h3 id="txtCaso" >Agregar empleado</h3>
       <Form
      form={form2}
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
      onFinish={registrarUsuario}
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
      {rol.map(newRol => (
            <Option key={newRol.key} value={newRol.id_rol}> {newRol.nombre}</Option>
      ))}
      </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 10,
        }}
      >
        <Button id= "RegistrarEmpleado" type="primary" className="p-button-rounded p-button-info p-button-lg" label= "Registrar empleado"/>
      </Form.Item>
    </Form>
       </div>
      </div>
      <div className="grid-users">
      <div className="bootom__users">
       <h3 id="txtCaso" >Empleados del departamento</h3>
       <ResponsiveContainer width="70%" height="70%" id="ResponsiveContainer">
         <div className="container_table">
         <TablaEmpleados id_dep = {data.myData.id_dep}/>
         </div>
      </ResponsiveContainer>
       </div>
      </div>
    </div>
  );
}
 
export default EditarDepartamento;