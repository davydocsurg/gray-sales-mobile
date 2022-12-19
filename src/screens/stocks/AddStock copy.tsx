import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
  FormImagePicker,
} from '../../components/form';
import { Screen, CategoryPicker, LoadingIndicator } from '../../components';
import colors from '../../utils/colors';
// import { FormImagePicker } from "../components/form";
import { useCategoryContext } from '../../contexts/CategoryContext';
import { useStockContext } from '../../contexts/StockContext';
import routes from '../../navigation/routes';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(3).label('Title'),
  price: Yup.number().required().min(3).max(10000).label('Price'),
  description: Yup.string().min(5).required().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
});

const AddStock = ({ navigation }: any) => {
  const { categories, errors, handleFetchCategories, loading } =
    useCategoryContext();

  useEffect(() => {
    handleFetchCategories();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values: Object, { resetForm }: any) => {};

  return (
    <ScrollView>
      <Screen
        style={[
          styles.container,
          { marginBottom: Platform.OS === 'android' ? 120 : 0 },
        ]}>
        <LoadingIndicator visible={loading} />

        <Form
          initialValues={{
            title: '',
            price: '',
            description: '',
            category: null,
            images: [],
          }}
          validationSchema={validationSchema}
          onSubmit={(values: Object, formikBag: Object) =>
            handleSubmit(values, formikBag)
          }>
          {/* {({ handleBlur, values, errors }) => ( */}
          <FormImagePicker size={100} imageRadius={15} fieldName="images" />

          <FormField maxLength={255} name="title" placeholder="Title" />

          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
          />

          <Picker
            PickerItemComponent={CategoryPicker}
            numberOfColumns={3}
            items={categories}
            name="category"
            placeholder="Category"
            onPress={handleFetchCategories}
          />

          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />

          <SubmitButton title="Submit" color={colors.orange} />
          {/* )} */}
        </Form>
      </Screen>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.brown,
  },
});

export default AddStock;
