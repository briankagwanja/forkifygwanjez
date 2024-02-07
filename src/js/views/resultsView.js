import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = `No recipes found for your query! Please try again;`;
  _message = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data.map(result => previewView.render(result, false)).join();
  }
}

export default new ResultsView();
