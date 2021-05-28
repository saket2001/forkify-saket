import View from './View.js';
import PreviewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    "Couldn't find any recipe with this name ! Please Try again with another name ;)";
  _message = '';

  _generateMarkup() {
    return this._data
      .map(results => PreviewView.render(results, false))
      .join('');
  }
}

export default new ResultsView();
