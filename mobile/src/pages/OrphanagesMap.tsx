import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE}  from 'react-native-maps';
import {Feather} from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import {RectButton} from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';
import { useState } from 'react';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanges] = useState<Orphanage[]>([]);
    const navigation = useNavigation();

    useFocusEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanges(response.data);

      })
    })

    function handleNavigateToCreateOrphange(){
      navigation.navigate('selectMapPosition');
      
    }

    function handleNavigateToOrphangeDetails(id: number){
       navigation.navigate('OrphangeDetails', { id })
    }

    return(
        <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map} 
        initialRegion={{
          latitude: -65.68999,
          longitude: -87.9874268,
          longitudeDelta: 0.825,
          latitudeDelta: 0.5858,
        }}
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y:0.8
              }}
              cordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip onPress={() => handleNavigateToOrphangeDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}>
      <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphange}>
          <Feather name="plus" size={20} color="#FFF"/>
        </RectButton>

      </View>
    </View>
    )
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  
  calloutContainer: {
    width: 160,
    heoght: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
    
  },

  calloutText: {
    color:'#00089A5',
    fontSize:14,
  },
  footer:{
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height:56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation:3,
  },

  footerText:{
    color: '#8fa7b3',
  },

  createOrphanageButton:{
    width:56,
    height:56,
    backgroundColor: '#15c3d6',
    borderRadius:20,

    justifyContent:'center',
    alignItems:'center',

  }

});
