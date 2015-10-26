import React from "react-native";
import Reflux from "reflux";
import Dimensions from "Dimensions";
import {Settings} from "../stores";
import {settingActions} from "../actions";
import Swatches from "../utils/swatches";

const {NativeModules, TouchableOpacity, StyleSheet, Text, View} = React;
const {KDSocialShare} = NativeModules;

export default React.createClass({
  mixins: [Reflux.connect(Settings, "settings")],
  changeColor(hex) {
    settingActions.changeColor(hex);
  },
  render() {
    return (
      <View style={styles.colorPicker}>
        {Swatches.all().map(swatch =>
          <TouchableOpacity
            key={swatch}
            onPress={() => this.changeColor(swatch)}
          >
            <View style={[
              styles.swatches,
              {backgroundColor: swatch},
              swatch === this.state.settings.color && styles.colorSelected
            ]}/>
          </TouchableOpacity>, this)}
      </View>
    );
  }
});

console.log(Dimensions.get("window").width);

const styles = StyleSheet.create({
  colorPicker: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  swatches: {
    width: 38,
    height: 38,
    marginBottom: 6,
    marginRight: Dimensions.get("window").width === 320 ? 2 : 6
  },
  colorSelected: {
    borderWidth: 2,
    borderColor: "#fff"
  }
});
