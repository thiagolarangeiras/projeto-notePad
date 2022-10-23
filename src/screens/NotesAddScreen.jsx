import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Keyboard, View, Text, ScrollView} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";

import { executeSql } from "../db";
import TextInputError from "../components/TextInputError";

const NoteAddSchema = Yup.object().shape({
  title: Yup.string().required('Campo obrigatório.'),
  description: Yup.string(),
});

export default function NotesAddScreen({ route, navigation }) {
  const dados = route?.params?.nota;
  async function salvaNota(values) {
    try {
      const rs = await executeSql("INSERT INTO notes(idUser, title, description) VALUES(?, ?, ?)", [1, values.title, values.description]);
      navigation.navigate("NotesList", { novoItem: true });
    } catch (err) {
      console.error(err);
    }
  }
  async function atualizaNota(values) {
    try {
      const rs = await executeSql("UPDATE notes SET title = ?, description = ? WHERE id = ?", [values.title, values.description, dados.id ]);
      navigation.navigate("NotesList", { novoItem: true });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Formik
      initialValues={{
        title: !!dados ? dados.title : "",
        description: !!dados ? dados.description : "",
      }}
      validationSchema={NoteAddSchema}
      onSubmit={async (values, actions) => {
        if (!!dados)
          await atualizaNota(values);
        else
          await salvaNota(values);
        actions.resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => {
        return (
          <ScrollView contentContainerStyle={styles.formContainer}>
            {/* <Text style={styles.title}>Cadastrar uma nova conta</Text> */}
            <TextInputError
              autoCapitalize="none"
              autoCorrect={false}
              label="Titulo"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              error={touched.title && errors.title}
            />
            <TextInputError
              style={styles.content}
              autoCapitalize="none"
              autoCorrect={false}
              numberOfLines={20}
              multiline
              label="Conteudo"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              error={touched.description && errors.description}
            />
            <Button onPress={handleSubmit} mode="contained" style={{ marginTop: 12 }}>
              Salvar
            </Button>
          </ScrollView>
        );
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    //flex: 1,
    //justifyContent: "center",
    padding: 21,
  },
  formInputError: {
    fontSize: 13,
    color: "#C00",
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 18,
  },
  content: {
    
  }
});