import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
export default function TextInputError({ error = null, ...props }) {
  return (
    <View style={{ paddingBottom: 6 }}>
      <TextInput error={!!error} {...props} />
      {!!error && typeof error === "string" && <Text style={styles.formInputError}>{error}</Text>}
    </View>
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