import { useState } from "react";
import { StyleSheet } from "react-native";
import { Checkbox, Card, Paragraph } from "react-native-paper";

export default function NotasCard({ note, onPress, onLongPress, notaDeletar, setNotaDeletar }) {
  function CustomCheckBox(){
    const [checked, setChecked] = useState(false);
    return( 
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
          let notas = [...notaDeletar] // pegar copia, se não ele pega referencia e estraga o useState na hora de chamar set, não atualizando elementos
          if (checked == false){
            notas.push(note.id);
            setNotaDeletar(notas);
          } else{
            let index = notas.indexOf(note.id);
            if (index > -1) { 
              notas.splice(index, 1);
              setNotaDeletar(notas);
            }
          }
        }}
      />
    );
  }
  return (
    <Card style={styles.content} onPress={onPress} onLongPress={onLongPress} mode="outlined">
    <Card.Title title={`${note.title}`} left={CustomCheckBox} />
    <Card.Content>
      <Paragraph>{note.description.replace(/(\r\n|\n|\r)/gm, " ").substring(0,50) + " ..."}</Paragraph>
    </Card.Content>
  </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 18,
  },
  content: {
    backgroundColor: "#f5f5f5",
    padding: 5,
    marginVertical: 10,
  }
});