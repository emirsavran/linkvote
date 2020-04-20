import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListItem from '../ListItem';

it('should render correctly', () => {
  const handleRemoveClick = jest.fn();
  const handleUpvoteClick = jest.fn();
  const handleDownvoteClick = jest.fn();

  const { getByText, getByLabelText } = render(
    <ListItem
      id="a1b2c3"
      name="GitHub"
      url="https://github.com"
      vote={10}
      onRemoveClick={handleRemoveClick}
      onUpvoteClick={handleUpvoteClick}
      onDownvoteClick={handleDownvoteClick}
    />,
  );

  const name = getByText('GitHub');
  expect(name).toBeInTheDocument();

  const url = getByText('(https://github.com)');
  expect(url).toBeInTheDocument();

  const vote = getByText('10');
  expect(vote).toBeInTheDocument();

  const upvoteButton = getByText('Up Vote');
  expect(upvoteButton).toBeInTheDocument();
  fireEvent.click(upvoteButton);
  expect(handleUpvoteClick).toHaveBeenCalledTimes(1);

  const downvoteButton = getByText('Down Vote');
  expect(downvoteButton).toBeInTheDocument();
  fireEvent.click(downvoteButton);
  expect(handleDownvoteClick).toHaveBeenCalledTimes(1);

  const removeButton = getByLabelText('remove link');
  expect(removeButton).toBeInTheDocument();
  fireEvent.click(removeButton);
  expect(handleRemoveClick).toHaveBeenCalledTimes(1);
});
