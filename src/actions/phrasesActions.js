import database from '../shared/firebase/database';

import {
  FETCH_PHRASE_REQUEST,
  FETCH_PHRASE_SUCCESS,
  ADD_PHRASE_REQUEST,
  DELETE_PHRASE_REQUEST,
  DELETE_PHRASE_SUCCESS,
  UPDATE_PHRASE_REQUEST,
  UPDATE_PHRASE_SUCCESS,
  UPDATE_PHRASE_ERROR,
} from './actionTypes';

import { request, received } from '../shared/redux/baseActions';

export const fetchPhrases = () => (dispatch) => {
  dispatch(request(FETCH_PHRASE_REQUEST));

  database.on('child_added', (snapshot) => {
    dispatch(received(
      FETCH_PHRASE_SUCCESS,
      {
        key: snapshot.key,
        ...snapshot.val(),
      },
    ));
  });

  database.on('child_changed', (snapshot) => {
    dispatch(received(
      UPDATE_PHRASE_SUCCESS,
      {
        key: snapshot.key,
        ...snapshot.val(),
      },
    ));
  });

  database.on('child_removed', (snapshot) => {
    dispatch(received(
      DELETE_PHRASE_SUCCESS,
      {
        key: snapshot.key,
      },
    ));
  });
};

export const addPhrase = (phrase, author) => (dispatch) => {
  dispatch(request(ADD_PHRASE_REQUEST));

  database.push({
    phrase,
    author,
  });
};

export const deletePhrase = key => (dispatch) => {
  dispatch(request(DELETE_PHRASE_REQUEST));

  database.child(key).remove();
};

export const updatePhrase = (key, phrase, author) => (dispatch) => {
  dispatch(request(UPDATE_PHRASE_REQUEST));

  const data = {
    phrase,
    author,
  };

  database
    .child(key)
    .update(data)
    .then(() => database.once('value'))
    .then(snapshot => snapshot.val())
    .catch((error) => {
      dispatch(request(UPDATE_PHRASE_ERROR));
      return {
        errorCode: error.code,
        errorMessage: error.message,
      };
    });
};
