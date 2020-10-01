import { httpClient, getHeaders } from '../../api';

const baseUrl = '/assessment-results';

async function getAssessmentResults(assessmentId) {
  return httpClient.get(baseUrl, { headers: getHeaders(), params: { assessmentId } });
}

async function noteAssessmentResult(assessmentResultId, noteUpdates) {
  return httpClient.put(`${baseUrl}/${assessmentResultId}/note`, noteUpdates, { headers: getHeaders() });
}

export default {
  getAssessmentResults,
  noteAssessmentResult
};
