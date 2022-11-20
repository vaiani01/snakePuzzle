import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Input,
} from "@mui/material";
import { useCallback, useState } from "react";
import { ErrorOption, FieldValues, useForm } from "react-hook-form";
import {
  INVALID_COMBINAISON_MESSAGE,
  INVALID_COMPUTATION_MESSAGE,
  SNAKE_TABLE_ALLOWED_VALUES,
  SUCCESS_COMPUTATION_MESSAGE,
} from "../../constants/SnakeTableConstant";
import { SnakeTableForm, SnakeTableValues } from "../../types/SnakeTableTypes";
import computePuzzle from "../../utils/MathUtil";
import SnakeTableFirstRow from "./SnakeTableFirstRow";
import "./SnakeTableForm.css";
import SnakeTableLastRow from "./SnakeTableLastRow";
import SnakeTableMiddleRow from "./SnakeTableMiddleRow";

const SnakeTable = () => {
  const [canCellBeModified, setCanCellBeModified] = useState<boolean>(false);
  const [isAlertMessageOpen, setIsAlertMessageOpen] = useState<boolean>(true);
  const [isSolutionFound, setIsSolutionFound] = useState<boolean>(false);
  const handleOnclick = () => {
    setCanCellBeModified(true);
  };

  const computeSolution = useCallback((values: SnakeTableForm): number => {
    return computePuzzle(values);
  }, []);

  const {
    register,
    reset,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const isCombinationValid = (values: SnakeTableValues[]) => {
    const isValid = SNAKE_TABLE_ALLOWED_VALUES.every(
      (value: SnakeTableValues) => values.includes(value)
    );
    return isValid;
  };

  const isComputationValid = (values: SnakeTableForm): boolean => {
    return computeSolution(values) === 66;
  };

  const handleSolutionCancel = () => {
    setCanCellBeModified(false);
    reset();
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
        setIsSolutionFound(true);
      }
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
          <Button type="reset">Supprimer</Button>
          <Button>Tout supprimer</Button>
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
          <Button onClick={handleOnclick}>Modifier</Button>
          <Button type="submit">
            {canCellBeModified ? "Valider ma solution" : "Générer une solution"}
          </Button>
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
