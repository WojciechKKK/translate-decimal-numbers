import { FC, useEffect, useState } from 'react';
import './SearchComponent.scss';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CODE_VALIDATIONS } from '../../config/generatorConfig';

interface SearchComponentProps {
  handleGenerateAction: (code: string) => void,
  isActiveSearch: boolean
}

const SearchComponent: FC<SearchComponentProps> = ({ handleGenerateAction, isActiveSearch }) => {
const [ searchValue, setSearchValue ] = useState("");
const [ codeError, setCodeError ] = useState("");

  useEffect(() => {
    if (isActiveSearch) {
      setSearchValue("");
    }
  },[isActiveSearch]);

  const setHandleSearch = (e: any) => {
    setSearchValue(e.target.value);

    if (e.target.value && (e.target.value < CODE_VALIDATIONS.min || e.target.value > CODE_VALIDATIONS.max) ) {
      setCodeError(CODE_VALIDATIONS.errorText);
    } else {
      setCodeError("");
    }
  }

  const submit = () => {
    if(!searchValue) {
      setCodeError(CODE_VALIDATIONS.requiredField);
      return;
    };

    handleGenerateAction(searchValue);
  };

  return (
    <>
      <TextField
        type="number"
        label={CODE_VALIDATIONS.label}
        value={searchValue}
        onChange={setHandleSearch}
        error={Boolean(codeError)}
        helperText={codeError}
        fullWidth
        disabled={!isActiveSearch}
        sx={{input: {textAlign: "center"}}}
      />
      <Box sx={{ m: 3 }} />
      {isActiveSearch && 
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          disabled={Boolean(codeError)}
          onClick={submit}
        >
          Generate
        </Button>
      }
    </>
  )
};

export default SearchComponent;
