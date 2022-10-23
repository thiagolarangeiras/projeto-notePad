import { useState, useEffect } from "react";
import { StyleSheet, Keyboard, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { executeSql } from "../../db";

import TextInputError from "../components/TextInputError";

const UsuarioSchema = Yup.object().shape({
  passwd: Yup.string().required('Campo obrigatório.').min(8,'senha deve ter 8 ou mais caracteres.').matches(/[a-zA-Z0-9]/, 'Senha não pode conter caracteres especiais'),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
});

export default function SinginScreen({ navigation }) {
  async function salvaSingin(values) {
    try {
      const rs = await executeSql("INSERT INTO users(email, passwd) VALUES(?, ?)", [values.email, values.passwd]);
      navigation.navigate("NotesNavigator");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Formik
      initialValues={{
        email: "",
        passwd: "",
      }}
      validationSchema={UsuarioSchema}
      onSubmit={async (values, actions) => {
        await salvaSingin(values);
        actions.resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => {
        return (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Cadastrar uma nova conta</Text>
            <TextInputError
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              label="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              error={touched.email && errors.email}
            />
            <TextInputError
              keyboardType="password"
              autoCapitalize="none"
              autoCorrect={false}
              label="Senha"
              onChangeText={handleChange("passwd")}
              onBlur={handleBlur("passwd")}
              value={values.passwd}
              error={touched.passwd && errors.passwd}
            />
            <Button onPress={handleSubmit} mode="contained" style={{ marginTop: 12 }}>
              Criar Conta
            </Button>
            <Button onPress={() => navigation.navigate("Login")} mode="contained" style={{ marginTop: 12 }}>
              Já tem uma conta?
            </Button>
          </View>
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
    flex: 1,
    justifyContent: "center",
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
});
