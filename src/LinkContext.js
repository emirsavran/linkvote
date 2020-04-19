import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const LinkContext = createContext();

const initialState = [
  { name: 'Hacker News', url: 'https://news.ycombinator.com' },
  { name: 'Google', url: 'https://google.com' },
  { name: 'Product Hunt', url: 'https://producthunt.com' },
  { name: 'REDDIT', url: 'https://reddit.com' },
  { name: 'Hepsi Burada', url: 'https://hepsiburada.com' },
  { name: 'Twitter', url: 'https://twitter.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
  { name: 'GitHub', url: 'https://github.com' },
];

// Actions
const ADD_LINK = 'ADD_LINK';
const REMOVE_LINK = 'REMOVE_LINK';
const UPVOTE_LINK = 'UPVOTE_LINK';
const DOWNVOTE_LINK = 'DOWNVOTE_LINK';

// Action Creators
export function addLink(name, url) {
  return { type: ADD_LINK, payload: { name, url } };
}

export function removeLink(id) {
  return { type: REMOVE_LINK, payload: { id } };
}

export function upvoteLink(id) {
  return { type: UPVOTE_LINK, payload: { id } };
}

export function downvoteLink(id) {
  return { type: DOWNVOTE_LINK, payload: { id } };
}

function linkReducer(state, action) {
  const { type } = action;
  switch (type) {
    case ADD_LINK:
    case REMOVE_LINK:
    case UPVOTE_LINK:
    case DOWNVOTE_LINK:
    default:
      return state;
  }
}

function LinkProvider({ children }) {
  const [links, dispatch] = useReducer(linkReducer, initialState);

  return <LinkContext.Provider value={{ links, dispatch }}>{children}</LinkContext.Provider>;
}

LinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useLinkContext() {
  return useContext(LinkContext);
}

export { LinkProvider, useLinkContext };
