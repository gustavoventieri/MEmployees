import { useEffect, useMemo, useState } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";
import { PositionService } from "../../../shared/services/position/PositionServices";

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompletePositionProps {
  isExternalLoading?: boolean;
}
export const AutoComplete: React.FC<IAutoCompletePositionProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField("positionId");
  const { debounce } = useDebounce();

  const [selectedId, setSelectedId] = useState<number | undefined>(
    defaultValue
  );

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState("");

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
      PositionService.getAll(1, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          // alert(result.message);
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
  }, [busca]);

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
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca("");
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
