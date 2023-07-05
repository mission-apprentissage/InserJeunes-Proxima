'use client';

import React from 'react';
import { TextField } from '#/app/components/MaterialUINext';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from '#/app/i18n/client';

export default function Distance({
  form: { field, error, ...formProps },
  ...props
}: any) {
  const { t } = useTranslation();

  return (
    <TextField
      label={t('Distance')}
      placeholder={t('Distance')}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: <InputAdornment position='end'>km</InputAdornment>,
      }}
      type='number'
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      {...field}
      error={error}
      helperText={error ? t('Veuillez entrer une distance entre 1 et 100') : ''}
      {...props}
    />
  );
}
