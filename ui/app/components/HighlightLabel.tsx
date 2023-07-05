import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { fr } from '@codegouvfr/react-dsfr';

interface HighlightLabelProps<T> extends React.HTMLAttributes<HTMLLIElement> {
  option: T;
  highlightOptionKey?: keyof T;
  state: AutocompleteRenderOptionState;
}

export default function HighlightLabel<T>({
  option,
  highlightOptionKey,
  state,
  ...props
}: HighlightLabelProps<T>) {
  const { inputValue } = state;

  const currentValue = highlightOptionKey ? option[highlightOptionKey] : option;
  const matches = match(currentValue as string, inputValue, {
    insideWords: true,
  });
  const parts = parse(currentValue as string, matches);

  return (
    <li {...props}>
      <div>
        {parts.map((part, index) => (
          <span
            key={index}
            className={part.highlight ? fr.cx('fr-text--bold') : ''}
          >
            {part.text}
          </span>
        ))}
      </div>
    </li>
  );
}
