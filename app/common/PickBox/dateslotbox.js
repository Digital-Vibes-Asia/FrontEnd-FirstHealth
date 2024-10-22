import {StyleSheet, Pressable, Text, View} from 'react-native';
import {CustomColors} from '../../utils/common/CustomColors';

export default function DateSlotBox({onPress, data}) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          borderColor: data.selected
            ? CustomColors.button_colour
            : CustomColors.bordercolour,
        },
      ]}
      onPress={() => {
        onPress(data);
      }}>
      <View style={styles.txtcontainer}>
        <Text style={styles.boldtextstyle}>
          {data.day}
          {','}
          {data.date}
        </Text>
        {data.avail_slot == 0 ? (
          <Text
            style={[
              styles.normaltextstyle,
              {
                color: CustomColors.hintcolour,
              },
            ]}>
            {'No slots available'}
          </Text>
        ) : (
          <Text
            style={[
              styles.normaltextstyle,
              {
                color: CustomColors.green,
              },
            ]}>
            {data.avail_slot}
            {' slots available'}
          </Text>
        )}
       
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 10,
    width: 160,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtcontainer: {
    alignItems: 'center',
  },

  boldtextstyle: {
    color: CustomColors.textcolour,
    fontSize: 12,
    padding: 5,
    fontWeight: 'bold',
  },
  normaltextstyle: {
    fontSize: 12,
    fontWeight: "500",
    color: CustomColors.textcolour,

  },
});
