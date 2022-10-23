import { useEffect, useState } from "react";
import { StyleSheet, Alert, FlatList, PixelRatio, View, Text } from "react-native";
import { List, Button, IconButton } from "react-native-paper";

import { executeSql } from "../db";
import NotasCard from "../components/NotasCard";

export default function NotesListScreen({ route, navigation }) {
  const [ notaDeletar, setNotaDeletar ] = useState([]);
  const [notes, setNotes] = useState([]);
  const [updated, setUpdated] = useState(false);

  async function recuperaListaNotas() {
    const rs = await executeSql("SELECT * FROM notes ORDER BY ID");
    console.log(rs.rows._array)
    setNotes(rs.rows._array);
  }

  function excluirNota(id) {
    const _runDeleteQuery = async () => {
      await executeSql("DELETE FROM notes WHERE id = ?", [id]);
      recuperaListaNotas();
    };

    Alert.alert(
      "Remover item da lista",
      `Você confirma a exclusão deste item?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: _runDeleteQuery },
      ],
      { cancelable: false }
    );
  }
  function excluirNotaMarcadas() {
    let listaNotas = notaDeletar.join(',');
    console.log(listaNotas);
    const _runDeleteQuery = async () => {
      let teste = await executeSql(`DELETE FROM notes WHERE id in (${listaNotas})`);
      setNotaDeletar([]);
      console.log(JSON.stringify(teste));
      recuperaListaNotas();
    };
    Alert.alert(
      "Remover item da lista",
      `Você confirma a exclusão deste item?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: _runDeleteQuery },
      ],
      { cancelable: false }
    );
    
  }

  useEffect(() => {
    if (route.params?.novoItem == true) {
      recuperaListaNotas();
      route.params.novoItem = false;
    }
  }, [route.params?.novoItem]);
  useEffect(() => {
    recuperaListaNotas();
  }, []);
  useEffect(() => {
    console.log('novo');
  }, [notaDeletar]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button icon="plus-circle" onPress={() => navigation.navigate("NotesAdd")} mode="contained" style={{ marginTop: 12}}>
          Novo
        </Button>
        {notaDeletar.length > 0 &&
          ( <Button icon="delete" onPress={() => excluirNotaMarcadas()} mode="contained" style={{ marginTop: 12 }}>
              Excluir
            </Button>
          )
        }
      </View>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={({ highlighted }) => (
          <View style={[styles.rowSeparator, highlighted && styles.rowSeparatorHide]} />
        )}
        ListEmptyComponent={() => {}}
        renderItem={({ item }) => (
          <View style={styles.fixCardSize}>
            <NotasCard
              notaDeletar={notaDeletar}
              setNotaDeletar={setNotaDeletar}
              note={item}
              onPress={() => {
                navigation.navigate("NotesAdd", {nota: item})  
              }}
              onLongPress={() => excluirNota(item.id)}
            />
          </View>
        )}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 9,
    paddingHorizontal: 16,
    justifyContent:"space-around",
    flexDirection:"row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 12,
  },
  textInfo: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 4,
  },
  itemCircular: {
    backgroundColor: "rgba(231, 224, 236, 1)",
    marginRight: 3,
    paddingVertical: 9,
    paddingHorizontal: 11,
    borderRadius: 11,
    overflow: "hidden",
  },
  itemCircularText: { fontSize: 16, fontWeight: "500", color: "#333" },
  rowSeparator: {
    backgroundColor: "#cdcdcd",
    height: 1 / PixelRatio.get(),
  },
  rowSeparatorHide: {
    opacity: 0.0,
    paddingHorizontal:10
  },
  fixCardSize:{
    paddingHorizontal:10, 
  }
});
