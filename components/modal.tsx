import { PropsWithChildren } from "react";
import { Portal, Modal, Button } from "react-native-paper";

export default function ModalToShow({visible, setVisible, children}: {visible: boolean, setVisible: Function, children: PropsWithChildren<any>}) {
  return (
    <Portal>
        <Modal visible={visible} dismissableBackButton={true} onDismiss={() => setVisible(!visible)} contentContainerStyle={{ padding: 20}} style={{
          backfaceVisibility: "visible",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }} >
            {children}
          <Button mode="contained" onPress={() => setVisible(!visible)}>Close</Button>
        </Modal>
      </Portal>
  );
}
