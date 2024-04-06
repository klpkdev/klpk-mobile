import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

import {ReactNode, useCallback, useMemo} from 'react';
import {
  GestureResponderEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderBottomSheet from './HeaderBottomSheet';
import styles from './styles';

interface IProps {
  children: ReactNode;
  bottomSheetRef?: React.Ref<BottomSheetModalMethods> | undefined;
  top: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  title: string;
  leftPress?: ((event: GestureResponderEvent) => void) | undefined;
  rightPress?: ((event: GestureResponderEvent) => void) | undefined;
  footer?: React.ReactNode;
}

const BottomSheetCustom: React.FC<IProps> = ({
  children,
  bottomSheetRef,
  top,
  footer,
  ...props
}) => {
  // variables
  const snapPoints = useMemo(() => ['25%', top], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleStyle={styles.handleStyle}
      handleHeight={0}>
      <View style={styles.bottomSheet}>
        <View style={[styles.bottomSheetHeader, {borderBottomWidth: 0}]}>
          <Text style={[styles.bottomSheetHeaderTitle, {textAlign: 'left'}]}>
            {props?.title}
          </Text>
        </View>
        <ScrollView>{children}</ScrollView>
        {footer}
      </View>
    </BottomSheetModal>
  );
};

export default BottomSheetCustom;
