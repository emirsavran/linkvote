/* eslint-disable quote-props */
import React, {
  createContext, useReducer, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const LinkContext = createContext();

const localState = JSON.parse(localStorage.getItem('links'));

const initialState = {
  byId: {
    'lCMBQOL': { id: 'lCMBQOL', name: 'Hacker News', url: 'https://news.ycombinator.com' },
    'wCiNNW0': { id: 'wCiNNW0', name: 'Google', url: 'https://google.com' },
    'jYj0Axf': { id: 'jYj0Axf', name: 'Product Hunt', url: 'https://producthunt.com' },
    'CIuEK8-': { id: 'CIuEK8-', name: 'REDDIT', url: 'https://reddit.com' },
    'z8uu8Lo': { id: 'z8uu8Lo', name: 'Hepsi Burada', url: 'https://hepsiburada.com' },
    '6twbBEZ': { id: '6twbBEZ', name: 'Twitter', url: 'https://twitter.com' },
    'neywAqn': { id: 'neywAqn', name: 'Instagram', url: 'https://instagram.com' },
    'ondvt7t': { id: 'ondvt7t', name: 'GitHub', url: 'https://github.com' },
  },
  allIds: ['lCMBQOL', 'wCiNNW0', 'jYj0Axf', 'CIuEK8-', 'z8uu8Lo', '6twbBEZ', 'neywAqn', 'ondvt7t'],
};

// Actions
const ADD_LINK = 'ADD_LINK';
const REMOVE_LINK = 'REMOVE_LINK';
const UPVOTE_LINK = 'UPVOTE_LINK';
const DOWNVOTE_LINK = 'DOWNVOTE_LINK';

// Action Creators
export function addLink(name, url) {
  const id = nanoid(7);
  return { type: ADD_LINK, payload: { id, name, url } };
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
  const { type, payload } = action;
  const { id } = payload;
  switch (type) {
    case ADD_LINK:
      return {
        byId: {
          ...state.byId,
          [id]: payload,
        },
        allIds: [id, ...state.allIds],
      };
    case REMOVE_LINK: {
      const { [id]: toBeRemoved, ...rest } = state.byId;
      return {
        byId: rest,
        allIds: state.allIds.filter((anyId) => anyId !== id),
      };
    } case UPVOTE_LINK:
    case DOWNVOTE_LINK:
    default:
      return state;
  }
}

function LinkProvider({ children }) {
  const [links, dispatch] = useReducer(linkReducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  return <LinkContext.Provider value={{ links, dispatch }}>{children}</LinkContext.Provider>;
}

LinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useLinkContext() {
  return useContext(LinkContext);
}

export { LinkProvider, useLinkContext };
