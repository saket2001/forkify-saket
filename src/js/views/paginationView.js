import View from './View.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      //get the btn clicked
      const btn = e.target.closest('.btn--inline');
      //get the data set value
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this.generateBtnMarkup(currentPage, 1);
    }
    //   other pages
    if (currentPage < numPages) {
      return this.generateBtnMarkup(currentPage, 2);
    }
    //   last page
    if (currentPage === numPages && numPages > 1) {
      return this.generateBtnMarkup(currentPage, 3);
    }
    //   only page 1
    if (currentPage === 1 && numPages <= 1) {
      return '';
    }
  }
  generateBtnMarkup(currentPage, btn) {
    if (btn === 1) {
      return `
            <button data-goto="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
            </button> 
            `;
    }
    if (btn == 2) {
      return `
            </button>
               <button data-goto="${
                 currentPage - 1
               }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
                </svg>
                <span>page ${currentPage - 1}</span>
            </button>
            <button  data-goto="${
              currentPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
            </button> 
        `;
    } else {
      return `
            </button>
               <button  data-goto="${
                 currentPage - 1
               }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="src/img/icons.svg#icon-arrow-left"></use>
                </svg>
                <span>page ${currentPage - 1}</span>
            </button>
        `;
    }
  }
}

export default new paginationView();
