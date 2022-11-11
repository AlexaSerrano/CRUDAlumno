import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, NoControl: 15321248, PrimerNombre: "Genesis", SegundoNombre: "Alexa", ApellidoPaterno: "Serrano",
  ApellidoMaterno: "Cruz", Correo: "Genesis@hotmail.com" },
  { id: 2, NoControl: 15324568, PrimerNombre: "Adriana", SegundoNombre: "Dania", ApellidoPaterno: "Rodriguez",
  ApellidoMaterno: "Martinez", Correo: "Adriana@hotmail.com" },
  { id: 3, NoControl: 15324508, PrimerNombre: "Claudia", SegundoNombre: "Cecilia", ApellidoPaterno: "Bibiano",
  ApellidoMaterno: "Cortes", Correo: "Claudia@hotmail.com" },
  { id: 4, NoControl: 15320033, PrimerNombre: "Victor", SegundoNombre: "Manuel", ApellidoPaterno: "Ávila",
  ApellidoMaterno: "Marquez", Correo: "Victor@hotmail.com" },
  { id: 5, NoControl: 15322211, PrimerNombre: "Jesus", SegundoNombre: "Arturo", ApellidoPaterno: "Gomez",
  ApellidoMaterno: "Urbano", Correo: "Jesus@hotmail.com" },
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      NoControl: "",
      PrimerNombre: "",
      SegundoNombre: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      Correo: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.forEach((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].NoControl=dato.NoControl;
        arreglo[contador].PrimerNombre=dato.PrimerNombre;
        arreglo[contador].SegundoNombre=dato.SegundoNombre;
        arreglo[contador].ApellidoPaterno=dato.ApellidoPaterno;
        arreglo[contador].ApellidoMaterno=dato.ApellidoMaterno;
        arreglo[contador].Correo=dato.Correo;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas eliminar el registro"+dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.forEach((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Alumno</Button>
          <br />
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
              <th>Id</th>
              <th>No. Control</th>
              <th>Primer Nombre</th>
              <th>Segundo Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Correo electrónico</th>
              <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.NoControl}</td>
                  <td>{dato.PrimerNombre}</td>
                  <td>{dato.SegundoNombre}</td>
                  <td>{dato.ApellidoPaterno}</td>
                  <td>{dato.ApellidoMaterno}</td>
                  <td>{dato.Correo}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                NoControl: 
              </label>
              <input
                className="form-control"
                name="NoControl"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.NoControl}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                PrimerNombre: 
              </label>
              <input
                className="form-control"
                name="PrimerNombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.PrimerNombre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                SegundoNombre: 
              </label>
              <input
                className="form-control"
                name="SegundoNombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.SegundoNombre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                ApellidoPaterno: 
              </label>
              <input
                className="form-control"
                name="ApellidoPaterno"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ApellidoPaterno}
              />
            </FormGroup>

            <FormGroup>
              <label>
                ApellidoMaterno: 
              </label>
              <input
                className="form-control"
                name="ApellidoMaterno"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ApellidoMaterno}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="Correo"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.Correo}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Alumno</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                NoControl: 
              </label>
              <input
                className="form-control"
                name="NoControl"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                PrimerNombre: 
              </label>
              <input
                className="form-control"
                name="PrimerNombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                SegundoNombre: 
              </label>
              <input
                className="form-control"
                name="SegundoNombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                ApellidoPaterno: 
              </label>
              <input
                className="form-control"
                name="ApellidoPaterno"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                ApellidoMaterno: 
              </label>
              <input
                className="form-control"
                name="ApellidoMaterno"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                className="form-control"
                name="Correo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;