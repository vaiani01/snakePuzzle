import { Alert, Box, Button, ButtonGroup, Collapse } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import { useCallback, useEffect, useState } from "react";
import { ErrorOption, FieldValues, useForm } from "react-hook-form";
import {
  INVALID_COMBINAISON_MESSAGE,
  INVALID_COMPUTATION_MESSAGE,
  SNAKE_TABLE_ALLOWED_VALUES,
  SNAKE_TABLE_PREFIX_KEY,
  SUCCESS_COMPUTATION_MESSAGE,
  SUCCESS_DELETE_MESSAGE,
} from "../../constants/SnakeTableConstant";
import {
  Combination,
  SnakeTableForm,
  SnakeTableValues,
} from "../../types/SnakeTableTypes";
import computePuzzle from "../../utils/MathUtil";
import { SUCCESS_DELETE_ALL_MESSAGE } from "./../../constants/SnakeTableConstant";
import useApiDatas from "./../../hooks/useApiDatas";
import SnakeTableContent from "./SnakeTableContent";
import "./SnakeTableForm.css";

const SnakeTable = () => {
  const [canCellBeModified, setCanCellBeModified] = useState<boolean>(false);
  const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(true);
  const [isSolutionFound, setIsSolutionFound] = useState<boolean>(false);
  const [isCombinationDeleted, setIsCombinationDeleted] =
    useState<boolean>(false);
  const [areAllCombinationsDeleted, setAreAllCombinationsDeleted] =
    useState<boolean>(false);

  const computeSolution = useCallback((values: SnakeTableForm): number => {
    return computePuzzle(values);
  }, []);

  const {
    register,
    reset,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [displayedCombination, setDisplayedCombination] = useState<
    Combination | undefined
  >(undefined);

  //API DATAS
  const {
    postPuzzleCombination,
    deletePuzzleCombination,
    deleteAllPuzzleCombinations,
    updatePuzzleCombinations,
  } = useApiDatas(displayedCombination);

  const {
    data: combination,
    isLoading: isLoadingCombination,
    mutate: postCombination,
  } = postPuzzleCombination;

  const { mutateAsync: updateCombination } = updatePuzzleCombinations;

  const {
    refetch: deleteCombination,
    data: isDeleted,
    remove: removeIsDeleted,
  } = deletePuzzleCombination;
  const {
    refetch: deleteAllCombinations,
    data: areDeleted,
    remove: removeAreDeleted,
  } = deleteAllPuzzleCombinations;

  const isCombinationValid = (values: SnakeTableValues[]) => {
    const isValid = SNAKE_TABLE_ALLOWED_VALUES.every(
      (value: SnakeTableValues) => values.includes(value)
    );
    return isValid;
  };

  const isComputationValid = (values: SnakeTableForm): boolean => {
    return computeSolution(values) === 66;
  };

  /** Update form with combination fetched by API */
  useEffect(() => {
    combination?.combination.split(",").forEach((num, index) => {
      setValue(`${SNAKE_TABLE_PREFIX_KEY}${index + 1}`, num);
    });
    setDisplayedCombination(combination);
  }, [combination, setValue]);

  // Delete confirmation
  useEffect(() => {
    if (isDeleted) {
      setIsCombinationDeleted(true);
    }
  }, [isDeleted]);

  // Delete All confirmation
  useEffect(() => {
    if (areDeleted) {
      setAreAllCombinationsDeleted(true);
    }
  }, [areDeleted]);

  /** Event Handlers */

  const handleEditForm = () => {
    setCanCellBeModified(true);
  };

  const handleSolutionCancel = () => {
    setCanCellBeModified(false);
    // reset form
    reset();
    setDisplayedCombination(undefined);
  };

  const handleDeleteCombination = () => {
    if (displayedCombination?.id) {
      // reset form
      reset();
      setDisplayedCombination(undefined);
      /// CALL DELETE API
      deleteCombination();
    }
  };

  const handleDeleteAllCombinations = () => {
    // reset form
    reset();
    setDisplayedCombination(undefined);
    /// CALL DELETE ALL API
    deleteAllCombinations();
  };

  const onSubmit = (data: FieldValues) => {
    const castedDatas = data as SnakeTableForm;
    const castedValues = Object.values(castedDatas);
    const isValid = isCombinationValid(castedValues);
    if (canCellBeModified) {
      if (!isValid) {
        setIsAlertMessageOpen(true);
        setError("INVALID_COMBINAISON_MESSAGE", {
          message: INVALID_COMBINAISON_MESSAGE,
        } as ErrorOption);
      }
      if (!isComputationValid(castedDatas)) {
        setIsAlertMessageOpen(true);
        setError("INVALID_COMPUTATION_MESSAGE", {
          message: INVALID_COMPUTATION_MESSAGE,
        } as ErrorOption);
      } else {
        // sorting value by key and generate combination to send in DB
        const sortedValue = Object.keys(data)
          .sort()
          .reduce((accu: string, key: string, index: number) => {
            accu = accu.concat(data[key]).concat(",");
            return accu;
          }, "")
          ?.slice(0, -1);
        // CALLING API
        updateCombination(sortedValue);
        setIsSolutionFound(true);
      }
    } else {
      postCombination();
    }
  };

  return (
    <form onSubmit={handleSubmit?.(onSubmit)}>
      <Box display="flex" justifyContent="space-evenly">
        <ButtonGroup
          // orientation="vertical"
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={handleDeleteCombination}
            disabled={!displayedCombination?.id}
            startIcon={<DeleteIcon />}
            color="error"
          >
            Supprimer
          </Button>
          <Button color="error" onClick={handleDeleteAllCombinations}>
            Tout supprimer
          </Button>
        </ButtonGroup>
        <ButtonGroup
          // orientation="vertical"
          variant="contained"
          aria-label="outlined primary button group"
        >
          {canCellBeModified && (
            <Button onClick={handleSolutionCancel}>
              Annuler mes modifications
            </Button>
          )}
          <Button onClick={handleEditForm}>Modifier</Button>
          <LoadingButton
            sx={{ backgroundColor: "primary.main", color: "white" }}
            loading={isLoadingCombination}
            type="submit"
            endIcon={<SendIcon />}
          >
            {canCellBeModified ? "Valider ma solution" : "Générer une solution"}
          </LoadingButton>
        </ButtonGroup>
      </Box>
      {errors &&
        (errors.INVALID_COMBINAISON_MESSAGE ||
          errors.INVALID_COMPUTATION_MESSAGE) && (
          <Box
            sx={{
              marginTop: "32px",
            }}
            display="flex"
            justifyContent="center"
          >
            <Collapse in={isAlertMessageOpen}>
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small">
                    X
                  </Button>
                }
                onClick={() => {
                  setIsAlertMessageOpen(false);
                  clearErrors();
                }}
              >
                {`${
                  errors?.INVALID_COMBINAISON_MESSAGE?.message ||
                  errors?.INVALID_COMPUTATION_MESSAGE?.message
                }`}
              </Alert>
            </Collapse>
          </Box>
        )}
      {(isSolutionFound ||
        isCombinationDeleted ||
        areAllCombinationsDeleted) && (
        <Box
          sx={{
            marginTop: "32px",
          }}
          display="flex"
          justifyContent="center"
        >
          {isSolutionFound && (
            <Collapse in={isSolutionFound}>
              <Alert
                severity="success"
                action={
                  <Button color="inherit" size="small">
                    X
                  </Button>
                }
                onClick={() => {
                  setIsSolutionFound(false);
                }}
              >
                {SUCCESS_COMPUTATION_MESSAGE}
              </Alert>
            </Collapse>
          )}
          {isCombinationDeleted && (
            <Collapse in={isCombinationDeleted}>
              <Alert
                severity="success"
                action={
                  <Button color="inherit" size="small">
                    X
                  </Button>
                }
                onClick={() => {
                  setIsCombinationDeleted(false);
                  removeIsDeleted();
                }}
              >
                {SUCCESS_DELETE_MESSAGE}
              </Alert>
            </Collapse>
          )}
          {areAllCombinationsDeleted && (
            <Collapse in={areAllCombinationsDeleted}>
              <Alert
                severity="success"
                action={
                  <Button color="inherit" size="small">
                    X
                  </Button>
                }
                onClick={() => {
                  setAreAllCombinationsDeleted(false);
                  removeAreDeleted();
                }}
              >
                {SUCCESS_DELETE_ALL_MESSAGE}
              </Alert>
            </Collapse>
          )}
        </Box>
      )}
      <SnakeTableContent
        canCellBeModified={canCellBeModified}
        register={register}
      />
    </form>
  );
};

export default SnakeTable;
