import React from 'react';
import PropTypes from 'prop-types';
import { Stack, FormControl, FormLabel, NumberInput, Input, NumberInputField, Textarea, Button } from '@chakra-ui/core';

import Form from '../../../helpers/Form';

function NotationForm({ onChange, onSave, onCancel }) {
  return (
    <Form onSubmit={onSave}>
      <Stack w='30%' py={5}>
        <FormControl isRequired>
          <FormLabel color='gray.500' htmlFor='obtainedNote'>
            Note obtenue
          </FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            max={20}
            id='obtainedNote'
            onChange={(value) => onChange({ name: 'obtainedNote', value: Number(value) })}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel color='gray.500' htmlFor='comments'>
            Commentaires
          </FormLabel>
          <Textarea id='comments' name='comments' onChange={(evt) => onChange(evt.target)} />
        </FormControl>

        <Stack direction='row' justifyContent='flex-end' py={8}>
          <Button type='button' variant='outline' onClick={onCancel}>
            Annuler
          </Button>
          <Button colorScheme='blue' type='submit'>
            Enregistrer
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

NotationForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NotationForm;
