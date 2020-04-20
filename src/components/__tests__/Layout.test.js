import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../Layout';

it('should render correctly', () => {
  const { getByText } = render(
    <Layout>
      <p>Children</p>
    </Layout>,
  );

  const appBarText = getByText('LinkVOTE Challenge');
  expect(appBarText).toBeInTheDocument();

  const children = getByText('Children');
  expect(children).toBeInTheDocument();
});
