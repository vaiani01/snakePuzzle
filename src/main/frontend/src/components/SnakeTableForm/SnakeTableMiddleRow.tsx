interface SnakeTableMiddleRowProps {
  firstValue: string | React.ReactElement;
  secondValue: string | React.ReactElement;
  thirdValue: string | React.ReactElement;
  fourthValue: string | React.ReactElement;
}

const SnakeTableMiddleRow = ({
  firstValue,
  secondValue,
  thirdValue,
  fourthValue,
}: SnakeTableMiddleRowProps): React.ReactElement => {
  return (
    <tr>
      <td>{firstValue}</td>
      <td></td>
      <td>{secondValue}</td>
      <td></td>
      <td>{thirdValue}</td>
      <td></td>
      <td>{fourthValue}</td>
    </tr>
  );
};

export default SnakeTableMiddleRow;
