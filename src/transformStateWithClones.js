'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Copia inicial do estado
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties' && action.extraData) {
      currentState = { ...currentState, ...action.extraData };
    } else if (
      action.type === 'removeProperties' &&
      Array.isArray(action.keysToRemove)
    ) {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      );
    }
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
