import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen() {
  const navigation = useNavigation();
  const [listas, setListas] = useState([]); // Estado para armazenar a lista de tarefas
  const [nomeLista, setNomeLista] = useState(''); // Estado para armazenar o nome da nova tarefa
  const [editandoIndex, setEditandoIndex] = useState(null); // Estado para rastrear o índice da tarefa em edição

  useEffect(() => {
    // Efeito colateral para carregar as listas salvas ao montar o componente
    const carregarListas = async () => {
      try {
        const listasSalvas = await AsyncStorage.getItem('listas');
        if (listasSalvas !== null) {
          setListas(JSON.parse(listasSalvas));
        }
      } catch (error) {
        console.error('Erro ao carregar listas:', error);
      }
    };

    carregarListas();
  }, []); // O segundo parâmetro vazio assegura que o efeito seja executado apenas uma vez na montagem

  const addEditList = async () => {
    // Função para adicionar ou editar uma tarefa na lista
    if (nomeLista.trim() === '') {
      alert('Digite um nome para a lista');
      return;
    }

    const dataHoraCriacao = new Date().toLocaleString(); // Obtém a data/hora atual

    let novasListas;
    if (editandoIndex !== null) {
      // Editando tarefa existente
      const listasAtualizadas = [...listas];
      listasAtualizadas[editandoIndex] = { ...listasAtualizadas[editandoIndex], nome: nomeLista };
      novasListas = listasAtualizadas;
    } else {
      // Adicionando nova tarefa
      if (listas.length < 10) {
        novasListas = [...listas, { id: listas.length, nome: nomeLista, dataHoraCriacao }];
      } else {
        alert('Você atingiu o limite de 10 listas');
        return;
      }
    }

    setNomeLista('');
    setEditandoIndex(null);

    try {
      await AsyncStorage.setItem('listas', JSON.stringify(novasListas));
      setListas(novasListas);
    } catch (error) {
      console.error('Erro ao salvar listas:', error);
    }
  };

  const deleteList = async (index) => {
    // Função para excluir uma tarefa da lista
    const listasAtualizadas = listas.filter((_, i) => i !== index);
    try {
      await AsyncStorage.setItem('listas', JSON.stringify(listasAtualizadas));
      setListas(listasAtualizadas);
    } catch (error) {
      console.error('Erro ao atualizar listas:', error);
    }
  };

  const editList = (index) => {
    // Função para iniciar a edição de uma tarefa
    setNomeLista(listas[index].nome);
    setEditandoIndex(index);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Suas listas</Text>
      <TextInput
        placeholder="Nome da lista"
        value={nomeLista}
        onChangeText={setNomeLista}
        style={{ marginBottom: 10, borderWidth: 1, borderColor: 'gray', padding: 5 }}
      />

      <Button title={editandoIndex !== null ? "Salvar alteração" : "Adicionar Lista"} onPress={addEditList} />

      {listas.map((lista, index) => (
        // Mapeia as tarefas para exibir na tela
        <View key={lista.id} style={{ marginTop: 10, width: '20%' }}>
          <Button
            title={lista.nome}
            onPress={() => navigation.navigate('ADD list', { nomeLista: lista.nome })}
          />
          <Text>Data de Criação: {lista.dataHoraCriacao}</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Button title="Editar" onPress={() => editList(index)} />
            <Button title="Excluir" onPress={() => deleteList(index)} />
          </View>
        </View>
      ))}
    </View>
  );
}

export default HomeScreen;
