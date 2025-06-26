import { View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  divider: {
    height: 2,
    backgroundColor: "#444", // darker line
    marginVertical: 8,
  },
});

export const Divider = () => {
  return <View style={styles.divider} />;
};
