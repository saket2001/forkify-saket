export default class View {
  _parentElement = '';
  _data;
  _errorMessage =
    "Couldn't find any recipe with this id !! Try again with another id";
  _message = '';

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg();
    // alert('in');
    this._data = data;
    // clearing the parent element of any data
    this._clear();
    // getting the recipe html
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = ' ';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
          <svg>
            <use href="src/img/icons.svg_icon-loader"></use>
          </svg>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMsg(msg = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${msg}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
