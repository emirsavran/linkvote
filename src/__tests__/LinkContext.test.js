import {
  ADD_LINK, REMOVE_LINK, UPVOTE_LINK, DOWNVOTE_LINK, addLink, removeLink, upvoteLink, downvoteLink,
  linkReducer,
} from '../LinkContext';

jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'mockId'),
}));

const mockState = {
  byId: {
    mockId1: {
      id: 'mockId1',
      name: 'Reddit',
      url: 'https://reddit.com',
      vote: 0,
      lastVotedAt: 1587393449911,
    },
  },
  allIds: ['mockId1'],
};

describe('actions', () => {
  it('should create an action to add a link', () => {
    const expectedPayload = {
      id: 'mockId',
      name: 'GitHub',
      url: 'https://github.com',
      vote: 0,
    };

    const {
      type,
      payload: { lastVotedAt, ...rest },
    } = addLink(expectedPayload.name, expectedPayload.url);

    expect(type).toBe(ADD_LINK);
    expect(rest).toEqual(expectedPayload);
    expect(lastVotedAt).toEqual(expect.any(Number));
  });

  it('should create an action to remove a link', () => {
    const id = 'mockId';
    const expectedAction = {
      type: REMOVE_LINK,
      payload: { id },
    };

    expect(removeLink(id)).toEqual(expectedAction);
  });

  it('should create an action to upvote a link', () => {
    const id = 'mockId';
    const {
      type,
      payload: { lastVotedAt, ...rest },
    } = upvoteLink(id);

    expect(type).toBe(UPVOTE_LINK);
    expect(rest).toEqual({ id });
    expect(lastVotedAt).toEqual(expect.any(Number));
  });

  it('should create an action to downvote a link', () => {
    const id = 'mockId';
    const {
      type,
      payload: { lastVotedAt, ...rest },
    } = downvoteLink(id);

    expect(type).toBe(DOWNVOTE_LINK);
    expect(rest).toEqual({ id });
    expect(lastVotedAt).toEqual(expect.any(Number));
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(linkReducer(mockState, {})).toEqual(mockState);
  });

  it('should handle ADD_LINK', () => {
    const action = addLink('GitHub', 'https://github.com');
    const state = linkReducer(mockState, action);
    expect(state.byId[action.payload.id]).toEqual(action.payload);
    expect(state.allIds[0]).toBe('mockId');
  });

  it('should handle UPVOTE_LINK', () => {
    const { id, vote: initialVote } = mockState.byId[mockState.allIds[0]];
    const action = upvoteLink(id);
    const state = linkReducer(mockState, action);
    expect(state.byId[id].vote).toBe(initialVote + 1);
  });

  it('should handle DOWNVOTE_LINK', () => {
    const { id, vote: initialVote } = mockState.byId[mockState.allIds[0]];
    const action = downvoteLink(id);
    const state = linkReducer(mockState, action);
    expect(state.byId[id].vote).toBe(initialVote - 1);
  });

  it('should handle REMOVE_LINK', () => {
    const { id } = mockState.allIds[0];
    const action = removeLink(id);
    const state = linkReducer(mockState, action);
    expect(state.byId[id]).toBeUndefined();
    expect(state.allIds).not.toContain(id);
  });
});
