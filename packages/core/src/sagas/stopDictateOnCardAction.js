import {
  put,
  take
} from 'redux-saga/effects';

import whileConnected from './effects/whileConnected';

import stopDictate from '../actions/stopDictate';
import { POST_ACTIVITY_PENDING } from '../actions/postActivity';

export default function* () {
  yield whileConnected(function* () {
    for (;;) {
      // TODO: [P2] We should stop speech input when the user click on anything on a card, including open URL which doesn't generate postActivity
      //       This functionality was not implemented in v3

      yield take(
        // Currently, there are no actions that are related to card input
        // For now, we are using POST_ACTIVITY of a "message" activity
        // In the future, if we have an action for card input, we should use that instead
        ({ payload, type }) => type === POST_ACTIVITY_PENDING && payload.activity.type === 'message'
      );

      yield put(stopDictate());
    }
  });
}
