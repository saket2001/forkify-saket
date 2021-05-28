export default class View {
  _parentElement = '';
  _data;
  _errorMessage =
    "Couldn't find any recipe with this id !! Try again with another id";
  _message = '';

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg();
    this._data = data;
    // getting the recipe html
    const markup = this._generateMarkup();
    if (!render) return markup;
    // clearing the parent element of any data
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    //
    const newMarkup = this._generateMarkup();
    // creating a nodelist dom of all html
    const newDom = document.createRange().createContextualFragment(newMarkup);
    // selecting all as arrays
    const newElements = [...newDom.querySelectorAll('*')];
    const oldElements = [...this._parentElement.querySelectorAll('*')];

    // comparing them
    // console.log(oldElements);
    newElements.forEach((newEl, i) => {
      const curEl = oldElements[i];

      // updates changed text only
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // updates changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
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
