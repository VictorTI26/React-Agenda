import { Button, Text, View } from "react-native";

function ListScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>List Screen</Text>
        <Button
                title="voltar"
                onPress={() => navigation.navigate('Home')}
            />
      </View>
    );
  }

  export default ListScreen;