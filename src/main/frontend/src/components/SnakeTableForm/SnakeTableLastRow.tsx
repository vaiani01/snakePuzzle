import { Input } from "@mui/material";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { SNAKE_TABLE_PREFIX_KEY } from "../../constants/SnakeTableConstant";

interface SnakeTableLastRowProps {
  canCellBeModified: boolean;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

const SnakeTableLastRow = ({
  canCellBeModified,
  placeholder,
  register,
}: SnakeTableLastRowProps): React.ReactElement => {
  return (
    <tr>
      <td> : </td>
      <td>
        <Input
          disabled={!canCellBeModified}
          placeholder={placeholder}
          type={"number"}
          inputProps={{
            style: { textAlign: "center" },
            min: "1",
            max: "9",
            required: true,
          }}
          {...register(`${SNAKE_TABLE_PREFIX_KEY}3`)}
        />
      </td>
      <td> + </td>
      <td></td>
      <td> X </td>
      <td>
        <Input
          disabled={!canCellBeModified}
          placeholder={placeholder}
          type={"number"}
          inputProps={{
            style: { textAlign: "center" },
            min: "1",
            max: "9",
            required: true,
          }}
          {...register(`${SNAKE_TABLE_PREFIX_KEY}8`)}
        />
      </td>
      <td> : </td>
    </tr>
  );
};

export default SnakeTableLastRow;
