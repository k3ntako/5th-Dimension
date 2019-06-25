# Fifth Dimension
This website allows users to quickly search for books using the [Google Books API Family](https://developers.google.com/books/docs/overview). A demonstration is available at [fifth-dimension.herokuapp.com](https://fifth-dimension.herokuapp.com/).

## Getting Started
If you would like try it out locally, here are the steps:

1. In Terminal go to the directory where you'd like this project to live and run:
  ```
  $ git clone https://github.com/k3ntako/5th-Dimension.git
  ```
2. Go into the newly created folder:
  ```
  $ cd 5th-Dimension
  ```
3. Install all the dependencies:
  ```
  $ npm i
  ```
4. Start the server:
  ```
  $ npm run dev
  ```
5. Visit `localhost:4000` in your browser!

## Testing
This website utilizes [Enzyme](https://airbnb.io/enzyme/) and [Jest](https://jestjs.io/) to test React components. To run the tests, run the following command in the root directory of the project:
```
$ npm test
```

## Built With
- [React](https://reactjs.org/) - used to design the website's front-end.
- [Express.js](https://expressjs.com/) - is the server that handles all requests.
- [Babel](https://babeljs.io/) - converts code into a version of Javascript that is more compatible for older browsers.
- [Webpack](https://webpack.js.org/) - bundles all the assets into a single file to speed up loading times.
- [Google Books API Family](https://developers.google.com/books/docs/overview) - provides the search results and the information about each book.
- [New York Times' Books API](https://developer.nytimes.com/docs/books-product/1/overview) - provides the best-sellers list on the homepage.

## Potential Features
- Book reviews: this would help users decide on a book to read.
- Word exclusion in search: users would be able to specify words they do not want to see in their results. Currently, users can exclude words by putting a `-` (minus sign) in front of a word, but it is not evident on the website.

## Contributing
Currently, this project is not accepting any contributions. However, feel free to fork the project as long as you credit Kentaro Kaneki in the project's README.
