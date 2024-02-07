import previewView from './previewView.js';
import View from './view.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it`;
  _message = '';

  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join();
  }
}

export default new BookmarksView();
