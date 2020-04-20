import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { LinkProvider } from '../../LinkContext';

import ListPage from '../ListPage';

it('should render correctly', () => {
  const { getByText, getByLabelText } = render(
    <MemoryRouter>
      <LinkProvider>
        <ListPage />
      </LinkProvider>
    </MemoryRouter>,
  );

  const submitLinkButton = getByText('Submit a Link');
  expect(submitLinkButton).toBeInTheDocument();

  const orderBySelectBox = getByLabelText('Order By');
  expect(orderBySelectBox).toBeInTheDocument();
});
