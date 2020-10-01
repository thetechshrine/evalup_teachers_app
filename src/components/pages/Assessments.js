import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import assessmentsActions from '../../store/actions/assessments';

import PDFViewerModal from '../helpers/asset_modals/PDFViewerModal';
import Block from '../helpers/Block';
import Assessment from '../core/assessments/Assessment';
import useDisclosure from '../hooks/useDisclosure';

function Assessments() {
  const dispatch = useDispatch();
  const { assessments, loading } = useSelector((state) => state.assessments);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const { shown, open, close } = useDisclosure();

  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    if (user && !hasFetched) {
      dispatch(assessmentsActions.getAssessments(user.id));
      setHasFetched(true);
    }
  }, [dispatch, user]);

  const [assessementSubjectUrl, setAssessmentSubjectUrl] = useState(null);
  function handleOpenAssessemntSubject({ url } = {}) {
    setAssessmentSubjectUrl(url);
    open();
  }

  function handleCloseAssessmentSubject() {
    setAssessmentSubjectUrl(null);
    close();
  }

  function handleOpenResults({ assessmentId } = {}) {
    history.push(`/assessments/${assessmentId}`);
  }

  function displayAssessments() {
    return (
      <SimpleGrid spacing={10}>
        {assessments.map((assessment) => (
          <Assessment
            key={assessment.id}
            assessment={assessment}
            onOpenSubject={handleOpenAssessemntSubject}
            onOpenResults={handleOpenResults}
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <Block>
        <Block.Header title='Evaluations' showOnCreate={false} />

        <Block.Main loading={loading} dataLength={assessments.length} emptyDataMessage='Aucune évaluation assignée'>
          {displayAssessments(assessments)}
        </Block.Main>
      </Block>

      <PDFViewerModal shown={shown} onClose={handleCloseAssessmentSubject} url={assessementSubjectUrl} />
    </>
  );
}

export default Assessments;
