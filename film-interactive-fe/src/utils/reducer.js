export const reducer =
  (actions) =>
  (state, { type, payload }) => {
    const action = actions[type];

    if (typeof action === 'function') return action(state, payload);

    return state;
  };
