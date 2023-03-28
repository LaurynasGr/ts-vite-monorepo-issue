import { DeepKeyOf, DeepKeyValue } from "@demo/utils";

export const useFieldValue = <FormValues extends Record<string, any>, ValueType = any>(
  name: DeepKeyOf<FormValues>,
  params: { name?: string } = {},
) => (params.name || name) as ValueType;

export type UseFieldValue<DataType> = {
  [DataIndex in DeepKeyOf<DataType>]: {
      field: DataIndex;
      value: DeepKeyValue<DataType, DataIndex>;
  };
};
