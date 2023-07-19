import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Trans } from '@lingui/macro';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const FoundedButton = ({ dynamicCircle, play, catX, catY }) => {
    const searchingIcon = <MaterialCommunityIcons name={"map-marker-question-outline"} size={128} color={"green"} />;
    var bandth = dynamicCircle.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300]
    });
    
    return <>
      <TouchableOpacity style={styles.playBtn} onPress={play}>
        {searchingIcon}
        <Text style={styles.textFound}><Trans>touch_found</Trans></Text>
      </TouchableOpacity>

      <Animated.View style={{
        zIndex: -4,
        borderRadius: 50, borderWidth: 2,
        backgroundColor: "transparent", borderColor: "green",
        width: 10, height: 10, transform: [{ scale: bandth }]
      }}>
      </Animated.View>
      <View style={{
        zIndex: -3, position: 'absolute', height: "100%", width: "100%", top: catY, left: catX, backgroundColor: "transparent"
      }}>
        <MaterialCommunityIcons name={"cat"} size={32} color={"green"} />
      </View>
    </>;
  };


  
const styles = StyleSheet.create({
    playBtn: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    textFound: {
      color: "white",
      textAlign: "center"
    }
  });
  