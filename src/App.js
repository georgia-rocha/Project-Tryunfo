import React from 'react';
import './index.css';
import Form from './components/Form';
import Card from './components/Card';
import imgCard from './imgCard.jpg';

class App extends React.Component {
  state = {
    cardName: 'Nome da carta',
    cardDescription: 'Descrição da carta',
    cardAttr1: '12',
    cardAttr2: '34',
    cardAttr3: '56',
    cardImage: imgCard,
    cardRare: 'raro',
    cardTrunfo: false,
    isSaveButtonDisabled: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  onSaveButtonClick = () => {

  };

  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <div id="div-principal">
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          />
        <Card
          { ...this.state }
          />
          </div>
      </div>
    );
  }
}

export default App;
