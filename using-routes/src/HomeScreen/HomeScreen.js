import React, { useState } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const [listas, setListas] = useState([]);
  const [nomeLista, setNomeLista] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);

  const addOrEditList = () => {
    if (nomeLista.trim() === '') {
      alert('Digite um nome para a lista');
      return;
    }

    if (editandoIndex !== null) {
      const listasAtualizadas = [...listas];
      listasAtualizadas[editandoIndex].nome = nomeLista;
      setListas(listasAtualizadas);
      setEditandoIndex(null);
    } else {
      if (listas.length < 10) {
        setListas([...listas, { id: listas.length, nome: nomeLista }]);
      } else {
        alert('Você atingiu o limite de 10 listas');
      }
    }

    setNomeLista('');
  };

  const editList = (index) => {
    setNomeLista(listas[index].nome);
    setEditandoIndex(index);
  };

  const deleteList = (index) => {
    setListas(listas.filter((_, i) => i !== index));
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

      <Button title={editandoIndex !== null ? "Salvar alteração" : "Adicionar Lista"} onPress={addOrEditList} />

      {listas.map((lista, index) => (
        <View key={lista.id} style={{ marginTop: 10, width: '15%' }}>
          <Button
            title={lista.nome}
            onPress={() => navigation.navigate('ListScreen', { nomeLista: lista.nome })}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <Button title="Editar" onPress={() => editList(index)} />
            <Button title="Excluir" onPress={() => deleteList(index)} />
          </View>
        </View>
      ))}
    </View>
  );
}

export default HomeScreen;
