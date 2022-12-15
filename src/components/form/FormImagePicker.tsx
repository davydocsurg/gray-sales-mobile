import { FormikValues, useFormikContext } from 'formik';
import React from 'react';

import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

interface FieldName {
  fieldName: string;
  imageRadius?: number;
  size: number;
}

const FormImagePicker = ({ fieldName = '', imageRadius, size }: FieldName) => {
  const { errors, setFieldValue, handleChange, values, handleBlur } =
    useFormikContext<FormikValues>();

  const imageUris = values.images;

  const handleAdd = (uri: any) => {
    console.log('====================================');
    console.log(uri);
    console.log('====================================');
    let localUri = uri.uri;
    let filename = localUri.split('/').pop();
    console.log(filename);
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    const xPhoto = { uri: localUri, name: filename, type };
    let arr = [...imageUris];
    arr.push(xPhoto);
    setFieldValue(fieldName!, arr);
  };

  const handleRemove = (uri: any) => {
    let arr = [...imageUris];
    let filter = arr.filter(item => item.uri !== uri);
    setFieldValue(fieldName, filter);
  };

  return (
    <>
      <ImageInputList
        size={size}
        imageRadius={imageRadius!}
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage
        error={errors.images || errors.profilePhoto}
        visible={handleBlur(fieldName)}
      />
    </>
  );
};

export default FormImagePicker;
