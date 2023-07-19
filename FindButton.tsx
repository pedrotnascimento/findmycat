import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Trans } from '@lingui/macro';

export const FindButton = ({ play }) => {
    const catIcon = <MaterialCommunityIcons name={"cat"} size={128} />;
    
    return <TouchableOpacity style={styles.playBtn
    } onPress={play} >
        {catIcon}
        < Text style={styles.text} > <Trans>touch_to_find </Trans></Text >
    </TouchableOpacity >;
};

const styles = StyleSheet.create({

    playBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: "center",
    },

});