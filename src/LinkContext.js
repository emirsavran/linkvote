/* eslint-disable quote-props */
import React, {
  createContext, useReducer, useContext, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

const LinkContext = createContext();

const localState = JSON.parse(localStorage.getItem('links'));

const initialState = {
  byId: {
    'lCMBQOL': {
      id: 'lCMBQOL',
      name: 'Hacker News',
      url: 'https://news.ycombinator.com',
      vote: 8,
      lastVotedAt: 1587378056668,
    },
    'wCiNNW0': {
      id: 'wCiNNW0',
      name: 'Google',
      url: 'https://google.com',
      vote: 7,
      lastVotedAt: 1587378066668,
    },
    'jYj0Axf': {
      id: 'jYj0Axf',
      name: 'Product Hunt',
      url: 'https://producthunt.com',
      vote: 6,
      lastVotedAt: 1587378076668,
    },
    'CIuEK8-': {
      id: 'CIuEK8-',
      name: 'REDDIT',
      url: 'https://reddit.com',
      vote: 9,
      lastVotedAt: 1587378086668,
    },
    'z8uu8Lo': {
      id: 'z8uu8Lo',
      name: 'Hepsi Burada',
      url: 'https://hepsiburada.com',
      vote: 5,
      lastVotedAt: 1587378096668,
    },
    '6twbBEZ': {
      id: '6twbBEZ',
      name: 'Twitter',
      url: 'https://twitter.com',
      vote: 2,
      lastVotedAt: 1587378106668,
    },
    'neywAqn': {
      id: 'neywAqn',
      name: 'Instagram',
      url: 'https://instagram.com',
      vote: 1,
      lastVotedAt: 1587378116668,
    },
    'ondvt7t': {
      id: 'ondvt7t',
      name: 'GitHub',
      url: 'https://github.com',
      vote: 10,
      lastVotedAt: 1587378126668,
    },
  },
  allIds: ['lCMBQOL', 'wCiNNW0', 'jYj0Axf', 'CIuEK8-', 'z8uu8Lo', '6twbBEZ', 'neywAqn', 'ondvt7t'],
};

// Actions
export const ADD_LINK = 'ADD_LINK';
export const REMOVE_LINK = 'REMOVE_LINK';
export const UPVOTE_LINK = 'UPVOTE_LINK';
export const DOWNVOTE_LINK = 'DOWNVOTE_LINK';

// Action Creators
export function addLink(name, url) {
  const id = nanoid(7);
  const lastVotedAt = Date.now();

  return {
    type: ADD_LINK,
    payload: {
      id, name, url, vote: 0, lastVotedAt,
    },
  };
}

export function removeLink(id) {
  return { type: REMOVE_LINK, payload: { id } };
}

export function upvoteLink(id) {
  const lastVotedAt = Date.now();
  return { type: UPVOTE_LINK, payload: { id, lastVotedAt } };
}

export function downvoteLink(id) {
  const lastVotedAt = Date.now();
  return { type: DOWNVOTE_LINK, payload: { id, lastVotedAt } };
}

export function linkReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_LINK: {
      const { id } = payload;
      return {
        byId: {
          ...state.byId,
          [id]: payload,
        },
        allIds: [id, ...state.allIds],
      };
    } case REMOVE_LINK: {
      const { id } = payload;
      const { [id]: toBeRemoved, ...rest } = state.byId;
      return {
        byId: rest,
        allIds: state.allIds.filter((anyId) => anyId !== id),
      };
    } case UPVOTE_LINK: {
      const { id } = payload;
      const { [id]: toBeIncremented, ...rest } = state.byId;
      return {
        ...state,
        byId: {
          ...rest,
          [id]: {
            ...toBeIncremented,
            vote: toBeIncremented.vote + 1,
            lastVotedAt: payload.lastVotedAt,
          },
        },
      };
    } case DOWNVOTE_LINK: {
      const { id } = payload;
      const { [id]: toBeDecremented, ...rest } = state.byId;
      return {
        ...state,
        byId: {
          ...rest,
          [id]: {
            ...toBeDecremented,
            vote: toBeDecremented.vote - 1,
            lastVotedAt: payload.lastVotedAt,
          },
        },
      };
    } default:
      return state;
  }
}

function sortLinksByVote(links) {
  return [...links.allIds].sort((a, b) => {
    const first = links.byId[a];
    const second = links.byId[b];

    if (first.vote > second.vote) return -1;
    if (first.vote < second.vote) return 1;

    // if their votes are equal then check lastVotedAt
    if (first.lastVotedAt < second.lastVotedAt) return 1;
    return -1;
  });
}

function LinkProvider({ children }) {
  const [links, dispatch] = useReducer(linkReducer, localState || initialState);
  const state = useMemo(() => {
    const mostVoted = sortLinksByVote(links);
    const lessVoted = [...mostVoted].reverse();
    return {
      ...links,
      mostVoted,
      lessVoted,
    };
  }, [links]);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  return <LinkContext.Provider value={{ links: state, dispatch }}>{children}</LinkContext.Provider>;
}

LinkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useLinkContext() {
  return useContext(LinkContext);
}

export { LinkProvider, useLinkContext };
