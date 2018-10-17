/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { initEosioWorker } from '../saga';

import { INIT_EOSIO_SUCCESS, INIT_EOSIO_ERROR } from '../constants';

describe('initEosioWorker Saga', () => {
  const generator = initEosioWorker({});
  it('Checking, step2 is action with INIT_EOSIO_SUCCESS type', () => {
    generator.next();
    const step = generator.next();
    expect(step.value.PUT.action.type).toBe(INIT_EOSIO_SUCCESS);
  });

  it('Error: Completing action with INIT_EOSIO_ERROR type', () => {
    const response = new Error('Some error');
    const putDescriptor = generator.throw(response).value;
    expect(putDescriptor.PUT.action.type).toEqual(INIT_EOSIO_ERROR);
  });
});
