'use client';

import * as React from 'react';

import { TextField } from '#/app/components/MaterialUINext';
import Chip from '@mui/material/Chip';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { useTranslation } from '#/app/i18n/client';
import HighlightLabel from '#/app/components/HighlightLabel';
import { useTheme } from '@mui/material/styles';
import { VariableSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const formation = data[index];
  const [{ key, ...eltProps }] = formation;
  const inlineStyle = {
    ...style,
    top: style.top as number,
  };

  return (
    <HighlightLabel
      key={key}
      {...eltProps}
      style={inlineStyle}
      highlightOptionKey={'title'}
      option={formation[1]}
      state={formation[3]}
    />
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});
OuterElementType.displayName = 'OuterElementType';

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactChild[] = [];
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );
  const theme = useTheme();
  const itemCount = itemData.length;
  const itemSize = 50;

  const getChildSize = (child: any) => {
    if (child[1].title.length > 50) {
      return 70;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2}
          width={'100%'}
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});
ListboxComponent.displayName = 'ListboxComponent';

export type FormationType = { title: string; cfd: string };

export type FormationProps = {
  formations: FormationType[];
  form: {
    field: any;
    fieldState: any;
    formState: any;
    error: any;
  };
} & Omit<
  AutocompleteProps<FormationType, true, false, false>,
  'renderInput' | 'options'
>;

export default function Formation({
  formations,
  form: {
    field: { onChange, onBlur, value, name, ref },
    error,
    ...formProps
  },
  ...props
}: FormationProps) {
  const { t } = useTranslation();

  return (
    <Autocomplete
      {...props}
      onChange={(e, newValue: FormationType[]) => {
        onChange(newValue);
      }}
      // limitTags={1}
      value={value}
      multiple
      disableListWrap
      options={formations}
      getOptionLabel={(option) => option.title}
      ListboxComponent={ListboxComponent}
      renderOption={(props, option, state) =>
        [props, option, state.index, state] as React.ReactNode
      }
      isOptionEqualToValue={(option, value) => option.cfd === value.cfd}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.cfd}
            label={
              option.title.length > 35
                ? option.title.substr(0, 35) + '...'
                : option.title
            }
          />
        ));
      }}
      renderInput={(params) => {
        return (
          <TextField
            error={error}
            helperText={error ? t('Veuillez entrer au moin un diplôme.') : ''}
            {...params}
            InputLabelProps={{ shrink: true }}
            label={t('Sélectionner des formations qui vous intéressent')}
            placeholder={t('Cuisine, électrotechnique, secrétaire....')}
          />
        );
      }}
    />
  );
}
