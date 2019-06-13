import React from 'react';

export default (props) => {
  const books = props.books;
  if( !books || !books.length ){
    return null;
  }

  let booksHTML;
  booksHTML = books.map(book => {
    let imageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";

    return <li key={book.id}>
      <div>
        {book.volumeInfo.title}
      </div>
      <div>
        <img src={imageLink || ""} />
      </div>
    </li>
  });

  return <ol>{booksHTML}</ol>
}
