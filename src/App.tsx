import { useState } from 'react';
import './index.css'

interface Persona {
  nombre: string;
  documento: string;
}

function App() {

  //Lista de personas que se van agregando 
  const [personas, setPersonas] = useState<Persona[]>([]);
  //Campo donde ira el nombre a agregar 
  const [nombre, setNombre] = useState('');
  //Campo donde ira el documento a agregar 
  const [documento, setDocumento] = useState('');
  //recuento en lista de las personas que se van agregando 
  const [personaCount, setPersonaCount] = useState(0);

  const handleDeletePersona = (index: number) => {
    const newPersonas = [...personas];
    newPersonas.splice(index, 1);
    setPersonas(newPersonas);
    setPersonaCount(personaCount - 1);
  };

  //Funcion que agregara las personas digitadas a la lista
  const handleAddPersona = () => {
    const nombreTrim = nombre.trim();
    const documentoTrim = documento.trim();
    const regexNombre = /^[a-zA-Z\s]*$/;
    const regexDocumento = /^\d+$/;
    const regexPalabras = /[a-zA-Z]/;
    const regexNumeros = /\d/;
  
    const esNombreValido = regexNombre.test(nombreTrim) && nombreTrim !== '';
    const esDocumentoValido = regexDocumento.test(documentoTrim) && documentoTrim !== '';
    const documentoContienePalabras = regexPalabras.test(documentoTrim);
    const nombreContieneNumeros = regexNumeros.test(nombreTrim);
  
    if (esNombreValido && esDocumentoValido) {
      setPersonas([...personas, { nombre: nombreTrim, documento: documentoTrim }]);
      setNombre('');
      setDocumento('');
      setPersonaCount(personaCount + 1);
    } else {
      if (nombreContieneNumeros) {
        alert('Please enter a valid name (only letters)');
      }
      if (documentoContienePalabras) {
        alert('Please enter a valid document (only numbers)');
      }
      if (!esNombreValido && !esDocumentoValido) {
        alert('Please enter a valid name and document');
      } else if (!esNombreValido) {
        alert('Please enter a valid name');
      } else {
        alert('Please enter a valid document');
      }
    }
  };

  return (
    <body>
    <div className="container">
      <h1 className='title'>Person List</h1>
      <div className="input-group">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Enter Name"
          className="input-field"
        />
        <input
          type="text"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          placeholder="Enter Document"
          className="input-field"
        />
        <button onClick={handleAddPersona} className="btn-add">
          Add
        </button>
      </div>
      <ul className="persona-list">
        {personas.map((persona, index) => (
          <li key={index} className="persona-item">
            <span className="persona-number">{index + 1}.</span>
            <span className="persona-text">Name: {persona.nombre}</span>
            <span className="persona-text"> Document: {persona.documento}</span>
            <button onClick={() => handleDeletePersona(index)} className="btn-delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
   </body>
  );
}

export default App;