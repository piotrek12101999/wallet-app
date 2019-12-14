import React from 'react';
import { Chip } from '@material-ui/core';

export const ExpensesCategories = () => {
  return (
    <div className="chips-container">
      <p> Choose a collection </p>
      <Chip label="Basic" />
      <Chip label="Ok how bao tads" />
      <Chip color="primary" label="Lets see this" />
      <Chip label="Basic" />
    </div>
  );
};
