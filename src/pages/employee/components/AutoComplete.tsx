import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";
import { PositionService } from "../../../shared/services/api/controllers/position/PositionServices";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompletePositionProps {
  isExternalLoading?: boolean;
}
export const AutoCompletePosition: React.FC<IAutoCompletePositionProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("positionId");
  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  ); // Seta o Id da Position selecionada

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]); // Seta as opções do AutoComplete
  const [isLoading, setIsLoading] = useState(false); // Seta o Loading
  const [search, setSearch] = useState(""); // Seta o search

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      PositionService.getAll(1, search, selectedId).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          //console.log(result.message);
        } else {
          console.log(result);

          setOpcoes(
            result.data.map((position) => ({
              id: position.id,
              label: position.name,
            }))
          );
        }
      });
    });
  }, [search, selectedId]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText="Open"
      closeText="Close"
      noOptionsText="No Options"
      loadingText="Loading..."
      disablePortal
      options={opcoes}
      loading={isLoading}
      disabled={isExternalLoading}
      value={autoCompleteSelectedOption}
      onInputChange={(_, newValue) => setSearch(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setSearch("");
        clearError();
      }}
      popupIcon={
        isExternalLoading || isLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Position"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
