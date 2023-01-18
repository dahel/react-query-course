import { useLabelsData } from "../helpers/useLabelsData";

export const Label = ({ label }) => {
  const labelsQuery = useLabelsData();

  if (labelsQuery.isLoading) return null;

  const labelObj = labelsQuery.data.find((lbl) => {
    return lbl.id === label;
  });

  if (!labelObj) return null;

  return (
    <span key={label} className={`label ${labelObj.color}`}>
      {label}
    </span>
  );
};
