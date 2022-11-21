import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Input,
} from "@mui/material";

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
} from "../../constants/SnakeTableConstant";
import { SnakeTableForm, SnakeTableValues } from "../../types/SnakeTableTypes";
import computePuzzle from "../../utils/MathUtil";
import SnakeTableFirstRow from "./SnakeTableFirstRow";
import "./SnakeTableForm.css";
import SnakeTableLastRow from "./SnakeTableLastRow";
import SnakeTableMiddleRow from "./SnakeTableMiddleRow";
import { useIsFetching } from "@tanstack/react-query";
import useApiDatas from "./../../hooks/useApiDatas";

const SnakeTable = () => {
  const [canCellBeModified, setCanCellBeModified] = useState<boolean>(false);
  const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(true);
  const [isSolutionFound, setIsSolutionFound] = useState<boolean>(false);

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

  const isFetchingCombination = useIsFetching({
    queryKey: ["post-combinations"],
  });
  const isDeletingCombination = useIsFetching({
    queryKey: ["delete-combination"],
  });
  const isDeletingAllCombinations = useIsFetching({
    queryKey: ["delete-all-combinations"],
  });

  //API DATAS
  const { getPuzzleCombinations } = useApiDatas();
  const {
    data: combination,
    refetch: fetchCombination,
    remove: removeCombination,
  } = getPuzzleCombinations;
  console.log(" MES DONNEES", combination);

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
    combination?.split(",").forEach((num, index) => {
      setValue(`${SNAKE_TABLE_PREFIX_KEY}${index + 1}`, num);
    });
  }, [combination, setValue, fetchCombination]);

  /** Event Handlers */

  const handleEditForm = () => {
    setCanCellBeModified(true);
  };

  const handleSolutionCancel = () => {
    setCanCellBeModified(false);
    // reset form
    reset();
    // remove react-query cache
    removeCombination();
  };

  const handleDeleteCombination = () => {
    // reset form
    reset();
    // remove react-query cache
    removeCombination();
    /// CALL DELETE API
  };

  const handleDeleteAllCombinations = () => {
    /// CALL DELETE API
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
        // TODO CALL API
        setIsSolutionFound(true);
      }
    } else {
      fetchCombination();
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
            startIcon={<DeleteIcon />}
            color="error"
          >
            Supprimer
          </Button>
          <Button color="error">Tout supprimer</Button>
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
            loading={isFetchingCombination > 0}
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
      {isSolutionFound && (
        <Box
          sx={{
            marginTop: "32px",
          }}
          display="flex"
          justifyContent="center"
        >
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
        </Box>
      )}
      <table className="table-hide">
        <tbody>
          <SnakeTableFirstRow
            canCellBeModified={canCellBeModified}
            placeholder={"?"}
            register={register}
          />
          <SnakeTableMiddleRow
            firstValue="+"
            secondValue="X"
            thirdValue="-"
            fourthValue="="
          />
          <SnakeTableMiddleRow
            firstValue="13"
            secondValue="12"
            thirdValue="11"
            fourthValue="10"
          />
          <SnakeTableMiddleRow
            firstValue="X"
            secondValue="+"
            thirdValue="+"
            fourthValue="-"
          />
          <SnakeTableMiddleRow
            firstValue={
              <Input
                disabled={!canCellBeModified}
                placeholder={"?"}
                type={"number"}
                inputProps={{
                  style: { textAlign: "center" },
                  min: "1",
                  max: "9",
                  required: true,
                }}
                {...register("number-2")}
              />
            }
            secondValue={
              <Input
                disabled={!canCellBeModified}
                placeholder={"?"}
                type={"number"}
                inputProps={{
                  style: { textAlign: "center" },
                  min: "1",
                  max: "9",
                  required: true,
                }}
                {...register("number-4")}
              />
            }
            thirdValue={
              <Input
                disabled={!canCellBeModified}
                placeholder={"?"}
                type={"number"}
                inputProps={{
                  style: { textAlign: "center" },
                  min: "1",
                  max: "9",
                  required: true,
                }}
                {...register("number-7")}
              />
            }
            fourthValue={
              <Input
                disabled={!canCellBeModified}
                placeholder={"?"}
                type={"number"}
                inputProps={{
                  style: { textAlign: "center" },
                  min: "1",
                  max: "9",
                  required: true,
                }}
                {...register("number-9")}
              />
            }
          />
          <SnakeTableLastRow
            canCellBeModified={canCellBeModified}
            placeholder={"?"}
            register={register}
          />
        </tbody>
      </table>
    </form>
  );
};

export default SnakeTable;
