import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { LinkProvider } from '../../LinkContext';

import SubmitPage from '../SubmitPage';

const setup = () => {
  const utils = render(
    <MemoryRouter>
      <LinkProvider>
        <SubmitPage />
      </LinkProvider>
    </MemoryRouter>,
  );

  const nameInput = utils.getByLabelText('Link Name');
  const urlInput = utils.getByLabelText('Link URL');
  const submitButton = utils.getByText('Add');

  return {
    nameInput,
    urlInput,
    submitButton,
    ...utils,
  };
};

it('should render correctly', () => {
  const { nameInput, urlInput, submitButton } = setup();

  expect(nameInput).toBeInTheDocument();
  expect(urlInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

it('should change the value of the name input', async () => {
  const { nameInput } = setup();
  const expectedValue = 'GitHub';

  await userEvent.type(nameInput, expectedValue);
  expect(nameInput).toHaveAttribute('value', expectedValue);
});

it('should change the value of the url input', async () => {
  const { urlInput } = setup();
  const expectedValue = 'https://github.com';

  await userEvent.type(urlInput, expectedValue);
  expect(urlInput).toHaveAttribute('value', expectedValue);
});
