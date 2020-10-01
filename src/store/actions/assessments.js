import { GET_ASSESSMENTS_REQUEST, GET_ASSESSMENTS_SUCCESS, GET_ASSESSMENTS_FAILURE } from '../types/assessments';
import assessmentsService from '../services/assessments';

function getAssessments(teacherId) {
  return function (dispatch) {
    dispatch({ type: GET_ASSESSMENTS_REQUEST });

    assessmentsService
      .getAssessments(teacherId)
      .then(({ data }) => {
        dispatch({ type: GET_ASSESSMENTS_SUCCESS, payload: { assessments: data.data } });
      })
      .catch((error) => {
        dispatch({ type: GET_ASSESSMENTS_FAILURE, error });
      });
  };
}

export default {
  getAssessments
};
