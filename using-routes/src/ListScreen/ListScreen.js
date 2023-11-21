import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ListScreen({ route }) {
  const { nomeLista } = route.params; // Obtém o nome da lista da navegação
  const [itens, setItens] = useState([]); // Estado para armazenar a lista de itens
  const [nomeItem, setNomeItem] = useState(''); // Estado para armazenar o nome do novo item
  const [descricaoItem, setDescricaoItem] = useState(''); // Estado para armazenar a descrição do novo item
  const [editandoIndex, setEditandoIndex] = useState(null); // Estado para rastrear o índice do item em edição

  useEffect(() => {
    // Efeito colateral para carregar os itens salvos ao montar o componente
    const carregarItens = async () => {
      try {
        const itensSalvos = await AsyncStorage.getItem(nomeLista);
        if (itensSalvos !== null) {
          setItens(JSON.parse(itensSalvos));
        }
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    };

    carregarItens();
  }, [nomeLista]); // O efeito será executado sempre que o nome da lista for alterado

  const adicionarItem = async () => {
    // Função para adicionar ou editar um item na lista
    if (nomeItem.trim() === '') {
      alert('Digite um nome para o item');
      return;
    }

    const dataHoraCriacao = new Date().toLocaleString(); // Obtém a data/hora atual como string

    let novosItens;
    if (editandoIndex !== null) {
      // Editando item existente
      const itensAtualizados = [...itens];
      itensAtualizados[editandoIndex] = {
        nome: nomeItem,
        descricao: descricaoItem,
        dataHoraCriacao,
      };
      novosItens = itensAtualizados;
    } else {
      // Adicionando novo item
      novosItens = [
        ...itens,
        { nome: nomeItem, descricao: descricaoItem, dataHoraCriacao },
      ];
    }

    setNomeItem('');
    setDescricaoItem('');
    setEditandoIndex(null);

    try {
      await AsyncStorage.setItem(nomeLista, JSON.stringify(novosItens));
      setItens(novosItens);
    } catch (error) {
      console.error('Erro ao salvar itens:', error);
    }
  };

  const excluirItem = async (index) => {
    // Função para excluir um item da lista
    const itensAtualizados = itens.filter((_, i) => i !== index);
    try {
      await AsyncStorage.setItem(nomeLista, JSON.stringify(itensAtualizados));
      setItens(itensAtualizados);
    } catch (error) {
      console.error('Erro ao atualizar itens:', error);
    }
  };

  const editarItem = (index) => {
    // Função para iniciar a edição de um item
    const itemSelecionado = itens[index];
    setNomeItem(itemSelecionado.nome);
    setDescricaoItem(itemSelecionado.descricao);
    setEditandoIndex(index);
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
          // Renderiza cada item da lista usando FlatList
          <View style={{ marginTop: 10, width: '80%' }}>
            <Text>Nome: {item.nome}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <Text>Data de Criação: {item.dataHoraCriacao}</Text>
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
