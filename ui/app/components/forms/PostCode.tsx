'use client';
import React from 'react';
import { TextField } from '#/app/components/MaterialUINext';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { useTranslation } from '#/app/i18n/client';
import HighlightLabel from '#/app/components/HighlightLabel';

import PostCodeList from '#/files/code_postal.json';

export default function PostCode({
  form: {
    field: { onChange, onBlur, value, name, ref },
    error,
    ...formProps
  },
}: any) {
  const { t } = useTranslation();
  return (
    <Autocomplete
      value={value}
      defaultValue={value}
      onInputChange={(e, v) => onChange(v)}
      onChange={(e, v) => onChange(v)}
      filterOptions={(options, state) =>
        state.inputValue.length > 2
          ? options.filter(
              (v) => v.substr(0, state.inputValue.length) === state.inputValue
            )
          : []
      }
      freeSolo
      options={PostCodeList.map(({ code_postal }) => code_postal)}
      renderOption={(props, option, state) => {
        return (
          <HighlightLabel
            {...props}
            option={option}
            state={state}
            key={option}
          />
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={error ? t("Votre code postal n'est pas valide.") : ''}
          InputLabelProps={{ shrink: true }}
          label={t('Code postal')}
          placeholder={t('Indiquez un code postal')}
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
        />
      )}
    />
  );
}
