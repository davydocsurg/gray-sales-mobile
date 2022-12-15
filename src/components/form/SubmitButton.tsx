import React from 'react';
import { FormikValues, useFormikContext } from 'formik';

import AppButton from '../../commons/AppButton';

interface SubmitButtonProps {
  // handleSubmit: Function;
  color: string;
  title: string;
  width?: string;
}

const SubmitButton = ({ color, title, width }: SubmitButtonProps) => {
  const { handleSubmit } = useFormikContext<FormikValues>();
  return (
    <AppButton
      width={width}
      color={color}
      onPress={() => handleSubmit()}
      title={title}
    />
  );
};

export default SubmitButton;
