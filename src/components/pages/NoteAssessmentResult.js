import React, { useContext } from 'react';
import { Heading, Stack } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';

import assessmentsResultsActions from '../../store/actions/assessment-results';

import { NotificationContext } from '../providers/Notification';
import NotationForm from '../core/assessment_results/note/NotationForm';
import useFormChange from '../hooks/useFormChange';

function NoteAssessmentResult() {
  const dispatch = useDispatch();
  const notification = useContext(NotificationContext);
  const { formState, handleChange } = useFormChange();
  const history = useHistory();

  function handleSaveAssessmentResultNote(evt) {
    evt.preventDefault();

    const { assessmentResultId } = queryString.parse(window.location.search);
    dispatch(
      assessmentsResultsActions.noteAssessmentResult({
        assessmentResultId,
        noteUpdates: formState,
        notification,
        history
      })
    );
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <Stack>
      <Heading>Attribuer la note</Heading>

      <NotationForm onChange={handleChange} onSave={handleSaveAssessmentResultNote} onCancel={handleCancel} />
    </Stack>
  );
}

export default NoteAssessmentResult;
