import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import assessemtResultsActions from '../../store/actions/assessment-results';
import assessemtResultEnums from '../../utils/enums/assessment-result';

import { NotificationContext } from '../providers/Notification';
import Block from '../helpers/Block';
import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import AssessmentResult from '../core/assessment_results/AssessmentResult';
import useDisclosure from '../hooks/useDisclosure';

function AssessmentResults() {
  const dispatch = useDispatch();
  const { assessmentResults, loading } = useSelector((state) => state.assessmentResults);
  const { shown, open, close } = useDisclosure();
  const { assessmentId } = useParams();
  const history = useHistory();
  const notification = useContext(NotificationContext);

  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (assessmentId && !hasFetched) {
      dispatch(assessemtResultsActions.getAssessmentResults(assessmentId));
      setHasFetched(true);
    }
  }, [assessmentId]);

  const [assessementResultReportUrl, setAssessmentResultReportUrl] = useState(null);
  function handleOpenAssessemntResultReport({ url } = {}) {
    setAssessmentResultReportUrl(url);
    open();
  }

  function handleCloseAssessmentResultReport() {
    setAssessmentResultReportUrl(null);
    close();
  }

  function handleAssignNote({ assessmentResultId } = {}) {
    history.push(`/assessments/${assessmentId}/assign-note?assessmentResultId=${assessmentResultId}`);
  }

  function displayAssessmentResults() {
    return (
      <SimpleGrid columns={3} spacing={10}>
        {assessmentResults.map((assessmentResult) => (
          <AssessmentResult
            key={assessmentResult.id}
            assessmentResult={assessmentResult}
            onOpenReport={handleOpenAssessemntResultReport}
            onAssignNote={handleAssignNote}
          />
        ))}
      </SimpleGrid>
    );
  }

  const [showPublishNotesButton, setShowPublishNotesButton] = useState(false);
  useEffect(() => {
    function checkAssessmentResultsStatuses() {
      const notedAssessmentResults = assessmentResults.filter(
        (assessmentResult) => assessmentResult.status === assessemtResultEnums.statuses.NOTED
      );
      if (notedAssessmentResults.length === assessmentResults.length) {
        setShowPublishNotesButton(true);
      } else setShowPublishNotesButton(false);
    }

    if (assessmentResults && assessmentResults.length > 0) checkAssessmentResultsStatuses();
  }, [assessmentResults]);

  function handlePublishNotes() {
    dispatch(
      assessemtResultsActions.publishAssessmentResults({
        assessmentId,
        notification
      })
    );
  }

  return (
    <>
      <Block>
        <Block.Header
          title='Tous les rendus'
          showOnCreate={showPublishNotesButton}
          onCreateLabel='Publier les notes'
          onCreate={handlePublishNotes}
        />

        <Block.Main
          loading={loading}
          dataLength={assessmentResults.length}
          emptyDataMessage="Aucun rendu n'a été ajouté"
        >
          {displayAssessmentResults()}
        </Block.Main>
      </Block>

      <PDFViewerModal shown={shown} onClose={handleCloseAssessmentResultReport} url={assessementResultReportUrl} />
    </>
  );
}

export default AssessmentResults;
