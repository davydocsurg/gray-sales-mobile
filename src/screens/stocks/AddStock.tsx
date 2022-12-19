import React, { useEffect } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import * as Yup from 'yup';

// locals
import Screen from '../../components/Screen';
import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
  FormImagePicker,
} from '../../components/form';
import { LoadingIndicator, CategoryPicker } from '../../components';
import { useCategoryContext } from '../../contexts/CategoryContext';
import colors from '../../utils/colors';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(3).label('Title'),
  price: Yup.number().required().min(3).max(10000).label('Price'),
  description: Yup.string().min(5).required().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
});

const AddStock = () => {
  const { categories, errors, handleFetchCategories, loading } =
    useCategoryContext();

  useEffect(() => {
    handleFetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LoadingIndicator visible={loading} />
      <ScrollView style={styles.container}>
        <Screen
          style={[
            styles.container,
            { marginBottom: Platform.OS === 'android' ? 120 : 0 },
          ]}>
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

            <SubmitButton title="Post" color={colors.orange} />
          </Form>
        </Screen>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    //  backgroundColor: colors.brown,
    zIndex: 1,
  },
});

export default AddStock;
