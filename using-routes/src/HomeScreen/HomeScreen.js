// HomeScreen.js

import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const [quantidadeLista, setQuantidadeLista] = useState(0);
  const [botoesAdicionais, setBotoesAdicionais] = useState([]);

  const addList = () => {
    if (quantidadeLista < 10) {
      setQuantidadeLista(quantidadeLista + 1);

      if (quantidadeLista < 10) {
        const novoBotao = (
          <Button
            key={quantidadeLista}
            title={`Botão ${quantidadeLista}`}
            onPress={() => {
              navigation.navigate('ListScreen'); // Navega para a página "ListScreen"
            }}
          />
        );
        setBotoesAdicionais([...botoesAdicionais, novoBotao]);
      }
    } else {
      alert('Você atingiu o limite de 10 listas');
    }
  }

  const deleteList = () => {
    if (quantidadeLista > 0) {
      setQuantidadeLista(quantidadeLista - 1);

      if (botoesAdicionais.length > 0) {
        setBotoesAdicionais(botoesAdicionais.slice(0, -1));
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Suas listas</Text>

      {quantidadeLista < 10 && (
        <Button title="add list" onPress={addList} />
      )}

      {botoesAdicionais.length > 0 && (
        <Button title="delete list" onPress={deleteList} />
      )}

      <Text>Você tem {quantidadeLista}/10</Text>

      {botoesAdicionais.map((botao) => botao)}
    </View>
  );
}

export default HomeScreen;
