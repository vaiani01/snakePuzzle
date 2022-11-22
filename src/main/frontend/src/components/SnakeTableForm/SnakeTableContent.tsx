import SnakeTableFirstRow from "./SnakeTableFirstRow";
import SnakeTableMiddleRow from "./SnakeTableMiddleRow";
import { Input } from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import SnakeTableLastRow from "./SnakeTableLastRow";

interface SnakeTableContentProps {
  canCellBeModified: boolean;
  register: UseFormRegister<FieldValues>;
}

const SnakeTableContent = ({
  canCellBeModified,
  register,
}: SnakeTableContentProps): React.ReactElement => {
  return (
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
  );
};

export default SnakeTableContent;
