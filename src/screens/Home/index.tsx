import { Text, View, TextInput, TouchableOpacity , FlatList} from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home() {

  const participants = ['Rodrigo', 'Levir' , 'Diego' , 'Maria' , 
  'Vitória', 'Laura','Marcelo', 'Carol', 
  'Dirceu', 'Emily', 'João', 'Marcos']
  
  function handleParticipantAdd(){
    console.log("Você clicou no botão de Adicionar!");
  }

  function handleParticipantRemove(name : string){
    console.log(`Você clicou em remover o participante ${name}`);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Terça, 17 de Janeiro de 2023.</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
          +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
              key={item}
              name={item} 
              onRemove={()=>handleParticipantRemove(item)}
            />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=> (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
        
    </View>
  );
}
