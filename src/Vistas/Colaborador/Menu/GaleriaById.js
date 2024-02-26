import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,FlatList} from 'react-native';
import { getApiData} from '../../../services/ApiHandler';
import { AppBarTab } from '../../../components/AppBarTab';
import { useParams } from 'react-router-native';
import { AntDesign } from '@expo/vector-icons';
import { downloadFile } from '../../../services/DownloadHandler';

const ImagenesList = () => {
    const { id } = useParams();
    const [imagenes, setImagenes] = useState([]); 

    const fetchImagenes = async () => {
        const response = await getApiData(`producto/${id}/imagen`);
        console.log(response.imagenes); 
        setImagenes(response.imagenes || []);
    }

    useEffect(() => {
        fetchImagenes();
    }, []);

    const handleShare = async (imageUrl) => {
      try {
        await downloadFile(imageUrl);
      } catch (error) {
        console.error('Error al intentar compartir la imagen', error);
      }
    };


    return(
        <View style={styles.container}>
          <FlatList
            data={imagenes}
            renderItem={({item}) => (
              <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={{uri: item.path}}
                    resizeMode="cover" 
                />
                <View style={styles.imageInfoContainer}>
                <Text style={styles.comment}>{item.comentarios}</Text>
                <TouchableOpacity style={styles.downloadIconContainer} onPress={() => handleShare(item.path)}>
                    <AntDesign name="download" size={24} color="white" />
                </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.nro_imagen}
            ListEmptyComponent={<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                   <Text>No hay imagenes</Text>
                                </View>}
            ListFooterComponent={<View style={{ height: 50 }}/>}
          />
        </View>


    );

  
};
  
const styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      backgroundColor: 'white',
      width: '100%',
    },
    imageContainer: {
      marginBottom: 20,
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 3,
    },
    image: {
      width: '100%',
      height: 200,
    },
    imageInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    comment: {
      flex: 1,
      color: '#fff',
      marginRight: 10,
    },
    downloadIconContainer: {
      padding: 10,
    },
  });

  
  
export const GaleriaByID = () => {
    return (
        <View style={{ width: '100%',flexGrow: 1 }}>
            <AppBarTab children={"Galeria Compartida"}/>
            <ImagenesList/>
        </View>
    )
};