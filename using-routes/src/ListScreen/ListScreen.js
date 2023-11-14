import React, { useState } from 'react';
import { Button, Text, View, TextInput, FlatList } from "react-native";

function ListScreen({ route }) {
  const { nomeLista } = route.params;
  const [itens, setItens] = useState([]);
  const [nomeItem, setNomeItem] = useState('');
  const [descricaoItem, setDescricaoItem] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);

  const adicionarItem = () => {
    if (nomeItem.trim() === '') {
      alert('Digite um nome para o item');
      return;
    }

    if (editandoIndex !== null) {
      const itensAtualizados = [...itens];
      const itemAtualizado = {
        nome: nomeItem,
        descricao: descricaoItem,
      };
      itensAtualizados[editandoIndex] = itemAtualizado;
      setItens(itensAtualizados);
      setEditandoIndex(null);
    } else {
      const newItem = {
        nome: nomeItem,
        descricao: descricaoItem,
      };

      setItens([...itens, newItem]);
    }

    setNomeItem('');
    setDescricaoItem('');
  };

  const editarItem = (index) => {
    const itemSelecionado = itens[index];
    setNomeItem(itemSelecionado.nome);
    setDescricaoItem(itemSelecionado.descricao);
    setEditandoIndex(index);
  };

  const excluirItem = (index) => {
    const itensAtualizados = itens.filter((_, i) => i !== index);
    setItens(itensAtualizados);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{nomeLista}</Text>
      <TextInput
        placeholder="Nome do item"
        value={nomeItem}
        onChangeText={setNomeItem}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'gray', padding: 5 }}
      />
      <TextInput
        placeholder="Descrição do item"
        value={descricaoItem}
        onChangeText={setDescricaoItem}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'gray', padding: 5 }}
      />
      <Button title={editandoIndex !== null ? "Salvar alteração" : "Adicionar Item"} onPress={adicionarItem} />

      <FlatList
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ marginTop: 10, width: '80%' }}>
            <Text>Nome: {item.nome}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
              <Button title="Editar" onPress={() => editarItem(index)} />
              <Button title="Excluir" onPress={() => excluirItem(index)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default ListScreen;
