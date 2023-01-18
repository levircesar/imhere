import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity , FlatList , Alert} from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from './styles';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');
  
  function handleParticipantAdd(){
    if(participants.includes(participantName.trim())){
      return Alert.alert("Participante existe", "Já existe um(a) participante na lista com esse nome.")
    }
    if(!participantName.trim()){
      setParticipantName('');
      return Alert.alert("Nome vazio", "Adicione um nome ao participante")
    }
 
    setParticipants(prevState => [...prevState, participantName.trim()]);
    setParticipantName('');
  }

  function handleParticipantRemove(name : string){
    
    Alert.alert("Remover", `Deseja remover o(a) participante ${name} ?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevstate => prevstate.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
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
          onChangeText={setParticipantName}
          value={participantName}
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
