import { httpClient, getHeaders } from '../../api';

const baseUrl = '/assessments';

async function getAssessments(teacherId) {
  return httpClient.get(baseUrl, { headers: getHeaders(), params: { teacherId } });
}

async function publishAssessmentResults(assessmentId) {
  return httpClient.put(`${baseUrl}/${assessmentId}/publish-results`, null, { headers: getHeaders() });
}

export default {
  getAssessments,
  publishAssessmentResults
};
