import {
  GET_ASSESSMENT_RESULTS_REQUEST,
  GET_ASSESSMENT_RESULTS_SUCCESS,
  GET_ASSESSMENT_RESULTS_FAILURE,
  NOTE_ASSESSMENT_RESULT_REQUEST,
  NOTE_ASSESSMENT_RESULT_SUCCESS,
  NOTE_ASSESSMENT_RESULT_FAILURE,
  PUBLISH_ASSESSMENT_RESULTS_REQUEST,
  PUBLISH_ASSESSMENT_RESULTS_SUCCESS,
  PUBLISH_ASSESSMENT_RESULTS_FAILURE
} from '../types/assessment-results';
import assessmentResultsService from '../services/assessment-results';
import assessmentsService from '../services/assessments';
import { processHttpErrorResponse } from '../../api';
import loadingActions from './ui/loading';

function getAssessmentResults(assessmentId) {
  return function (dispatch) {
    dispatch({ type: GET_ASSESSMENT_RESULTS_REQUEST });

    assessmentResultsService
      .getAssessmentResults(assessmentId)
      .then(({ data }) => {
        dispatch({ type: GET_ASSESSMENT_RESULTS_SUCCESS, payload: { assessmentResults: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_ASSESSMENT_RESULTS_FAILURE, error });
      });
  };
}

function noteAssessmentResult({ assessmentResultId, noteUpdates, notification, history }) {
  return function (dispatch) {
    dispatch({ type: NOTE_ASSESSMENT_RESULT_REQUEST });
    dispatch(loadingActions.showLoading());

    assessmentResultsService
      .noteAssessmentResult(assessmentResultId, noteUpdates)
      .then(() => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: NOTE_ASSESSMENT_RESULT_SUCCESS });

        history.goBack();

        notification.showSuccessNotification('Note ajoutée', 'Votre mise à jour a bien été enregistrée');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: NOTE_ASSESSMENT_RESULT_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

function publishAssessmentResults({ assessmentId, notification }) {
  return function (dispatch) {
    dispatch({ type: PUBLISH_ASSESSMENT_RESULTS_REQUEST });
    dispatch(loadingActions.showLoading());

    assessmentsService
      .publishAssessmentResults(assessmentId)
      .then(({ data }) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: PUBLISH_ASSESSMENT_RESULTS_SUCCESS, payload: { assessmentResults: data.data } });

        notification.showSuccessNotification('Notes publiées', 'Vos mises à jour ont bien été enregistrées');
      })
      .catch((error) => {
        dispatch(loadingActions.closeLoading());
        dispatch({ type: PUBLISH_ASSESSMENT_RESULTS_FAILURE, error });

        processHttpErrorResponse(error, notification);
      });
  };
}

export default {
  getAssessmentResults,
  noteAssessmentResult,
  publishAssessmentResults
};
