import { FormikValues, useFormikContext } from 'formik';
import React from 'react';
import Picker from '../Picker';
import ErrorMessage from './ErrorMessage';

const AppFormPicker = ({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}: any) => {
  const { errors, setFieldValue, touched, values } =
    useFormikContext<FormikValues>();

  return (
    <>
      <Picker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item: any) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormPicker;
