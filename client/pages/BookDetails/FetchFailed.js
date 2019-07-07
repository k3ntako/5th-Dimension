import React from 'react';
import ErrorMessage from '../../components/ErrorMessage';

export default () => {
  return <ErrorMessage
    title="Book Not Found"
    message="Couldn't find the book you were looking for." />
}
