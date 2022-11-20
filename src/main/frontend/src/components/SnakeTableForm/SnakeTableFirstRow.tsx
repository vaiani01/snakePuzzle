import { Input } from "@mui/material";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface SnakeTableFirstRowProps {
  canCellBeModified: boolean;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
}

const SnakeTableFirstRow = ({
  canCellBeModified,
  placeholder,
  register,
}: SnakeTableFirstRowProps): React.ReactElement => (
  <>
    <tr>
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
          {...register("number-1")}
        />
      </td>
      <td></td>
      <td>
        <Input
          disabled={!canCellBeModified}
          placeholder={placeholder}
          type="number"
          inputProps={{
            style: { textAlign: "center" },
            min: "1",
            max: "9",
            required: true,
          }}
          {...register("number-5")}
        />
      </td>
      <td> - </td>
      <td>
        <Input
          disabled={!canCellBeModified}
          placeholder={placeholder}
          type="number"
          inputProps={{
            style: { textAlign: "center" },
            min: "1",
            max: "9",
            required: true,
          }}
          {...register("number-6")}
        />
      </td>
      <td></td>
      <td> 66 </td>
    </tr>
  </>
);

export default SnakeTableFirstRow;
