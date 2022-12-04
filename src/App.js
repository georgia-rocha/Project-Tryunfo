import React from 'react';
import './index.css';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;

    this.setState((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }), this.validationButton);
  };

  validationButton = () => {
    const { cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3 } = this.state;

    const nameValidation = cardName.length > 0;
    const descriptionValidation = cardDescription.length > 0;
    const imgValidation = cardImage.length > 0;
    const cardRareValidation = cardRare.length > 0;
    const maxValueInd = 90;
    const maxValueTotal = 210;
    const somaValidationInd = parseInt(cardAttr1, 10) <= maxValueInd
      && parseInt(cardAttr2, 10) <= maxValueInd
      && parseInt(cardAttr3, 10) <= maxValueInd;

    const somaValidationTotal = (parseInt(cardAttr1, 10)
      + parseInt(cardAttr2, 10)
      + parseInt(cardAttr3, 10)) <= maxValueTotal;

    const valueMini = parseInt(cardAttr1, 10) >= 0
      && parseInt(cardAttr2, 10) >= 0
      && parseInt(cardAttr3, 10) >= 0;

    if (nameValidation
      && descriptionValidation
      && imgValidation
      && cardRareValidation
      && somaValidationInd
      && somaValidationTotal
      && valueMini) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
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
