import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SolicitudItem = ({ solicitud }) => {


  return (
    <View style={styles.card}>
      <View style={[styles.status, solicitud.aceptada === 0 ? styles.pendiente : styles.aprobada]} />
      <Text style={styles.title}>Solicitud ID {solicitud.cod_solicitud}</Text>
      <Text>Fecha de Creación: {solicitud.fecha_creacion}</Text>
      <View style={styles.statusBox}>
        <Text>Status:</Text>
        <Text style={styles.statusText}>
          {solicitud.aceptada === 0 ? 'Pendiente' : 'Aprobada'}
        </Text>
      </View>
      <Text>Comentario: {description.substring(0, 15) + "..."}</Text>
    </View>
  );
};

const SolicitudList = ({ listaSolicitudes }) => {
  return (
    <View>
      {listaSolicitudes.map((solicitud) => (
        <Card key={solicitud.cod_solicitud} solicitud={solicitud} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  status: {
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    marginLeft: 5,
    fontWeight: 'bold',
  },
  pendiente: {
    backgroundColor: 'orange',
  },
  aprobada: {
    backgroundColor: 'green',
  },
});

export default SolicitudList;