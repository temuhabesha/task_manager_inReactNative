import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />; // Permissions loading
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleFlash() {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }

  async function takePicture() {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      setPhotoUri(photo.uri);

      // Save to gallery
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      if (mediaPermission.granted) {
        await MediaLibrary.createAssetAsync(photo.uri);
        Alert.alert('Saved', 'Photo saved to gallery');
      } else {
        Alert.alert('Note', 'Photo taken but not saved');
      }
    } catch (error) {
      console.log('Error taking photo:', error);
      Alert.alert('Error', 'Could not take photo');
    }
  }

  function retakePhoto() {
    setPhotoUri(null);
  }

  // Show preview if photo taken
  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.camera} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={retakePhoto}>
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Photo Selected', 'You can now use this photo')}
          >
            <Text style={styles.text}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} flash={flash} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleFlash}>
          <Text style={styles.text}>{flash === 'off' ? 'Flash On' : 'Flash Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.text}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#00000080',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
