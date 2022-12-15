import { FormikValues, useFormikContext } from 'formik';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

interface FieldName {
  fieldName: string;
  imageRadius?: number;
  size: number;
}

const ProfileImagePicker = ({
  fieldName = '',
  imageRadius,
  size,
}: FieldName) => {
  const { errors, setFieldValue, handleChange, values, handleBlur } =
    useFormikContext<FormikValues>();
  const [showImageUploader, setShowImageUploader] = useState(true);

  const imageUris = values.profilePhoto;

  const handleAdd = (uri: any) => {
    let localUri = uri.uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    const xPhoto = { uri: localUri, name: filename, type };
    // console.log(xPhoto, "photo");
    let arr = [...imageUris];
    // console.log(imageUris, "arr", arr);
    arr.push(xPhoto);
    setFieldValue(fieldName!, arr);
    setShowImageUploader(false);
  };

  const handleRemove = (uri: any) => {
    let arr = [...imageUris];
    let filter = arr.filter(item => item.uri !== uri);
    setFieldValue(fieldName, filter);
    setShowImageUploader(true);
  };

  return (
    <>
      <ImageInputList
        size={size}
        hideImageUploader={showImageUploader}
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

const styles = StyleSheet.create({
  container: {},
});

export default ProfileImagePicker;
