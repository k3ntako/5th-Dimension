import React from 'react';

const GOOGLE_BOOKS_API_LINK = <a href="https://developers.google.com/books/docs/overview" target="_blank">
  Google Books API Family
</a>

const NYT_API_LINK = <a href="https://developer.nytimes.com/docs/books-product/1/overview" target="_blank">
  New York {"Times'"} Books API
</a>


export default (props) => {
  return <section className="page">
    <h3>About</h3>
    <p>
      5th Dimension is a book search website that uses { GOOGLE_BOOKS_API_LINK } to
      provide the search results as well as the information associated with
      the book (e.g., title, publisher picture).
    </p>
    <p>
      The website uses { NYT_API_LINK } to retreive the list of best selling books.
      And uses the above mentioned Google Books API Family to retreive information
      about the books.
    </p>
    <h4>Name: 5th Dimension</h4>
    <p>
      NOTE: This contains spoilers about the movie, Interstellar (2014).
    </p>
    <p>
      The name is a reference to a scene in the movie, Interstellar, a movie
      about a group of people looking for an alternative planet to live on.
      There is a scene where the main character communicates with his daughter
      in the past using a bookshelf, the Tesseract, which is a tool to represent
      the fifth dimension (past, present, future).
    </p>
    <p>
      In the movie, the bookshelf is the key to saving humanity. I chose the
      name to emphasize the importance of books has played in society, especially
      in a world where we other types of media.
    </p>
    <h4>Developer</h4>
    <p>
      This was developed by Kentaro Kaneki in June 2019. The code for this website can be
      found on <a href="https://github.com/k3ntako/5th-Dimension" target="_blank">Github</a>.
    </p>
  </section>
}
