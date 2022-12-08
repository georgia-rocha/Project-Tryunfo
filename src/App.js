import React from 'react';
import './index.css';
import Form from './components/Form';
import Card from './components/Card';

const stateInitial = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: '',
  cardRare: 'normal',
  cardTrunfo: false,
  hasTrunfo: false,
  isSaveButtonDisabled: true,
};

class App extends React.Component {
  state = {
    ...stateInitial,
    cardSave: [],
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;

    this.setState((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }), this.validationButton);
  };

  validationTrunfo = () => {
    const { cardTrunfo } = this.state;
    console.log('sss');

    if (cardTrunfo) {
      this.setState(() => ({
        hasTrunfo: true,
      }));
    } else {
      this.setState(() => ({
        hasTrunfo: false,
      }));
    }
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

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState(({ cardSave }) => ({
      cardSave: [...cardSave, newCard],
      ...stateInitial,
    }));
    this.validationTrunfo();
  };

  removeCard = ({ target }) => {
    const cardName = target.id;
    const { cardSave } = this.state;
    const verifyDeleted = cardSave.filter((card) => card.cardName !== cardName);

    this.setState((estadoAnterior) => ({
      ...estadoAnterior,
      cardSave: verifyDeleted,
    }), this.validationTrunfo);
  };

  render() {
    const { cardSave } = this.state;
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
            removeCard={ this.removeCard }
          />
        </div>
        <ul className="cards">
          {
            cardSave.map(({
              cardName,
              cardDescription,
              cardAttr1,
              cardAttr2,
              cardAttr3,
              cardImage,
              cardRare,
              cardTrunfo,
            }) => (
              <li key={ cardName }>
                <Card
                  cardName={ cardName }
                  cardDescription={ cardDescription }
                  cardAttr1={ cardAttr1 }
                  cardAttr2={ cardAttr2 }
                  cardAttr3={ cardAttr3 }
                  cardImage={ cardImage }
                  cardRare={ cardRare }
                  cardTrunfo={ cardTrunfo }
                />
                <button
                  id={ cardName }
                  type="button"
                  data-testid="delete-button"
                  onClick={ this.removeCard }
                >
                  Excluir
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
