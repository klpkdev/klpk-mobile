import {FC, useEffect, useRef, useState} from 'react';
import {FieldError, FieldErrorsImpl, Merge} from 'react-hook-form';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  actions,
  RichEditor,
  RichToolbar,
  RichEditorProps,
} from 'react-native-pell-rich-editor';
import styles from './styles';

interface IProps extends RichEditorProps {
  label: string;
  placeholder?: string | undefined;
  value: string;
  onChange: ((text: string) => void) | undefined;
  isError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const InputRichEditor: FC<IProps> = ({
  placeholder,
  label,
  value,
  onChange,
  isError,
}) => {
  const richText = useRef<RichEditor>(null);

  useEffect(() => {
    if (value === '') {
      richText.current?.setContentHTML('');
    }
  }, [value]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          richText.current?.blurContentEditor();
        }}>
        <Text style={styles.label}>{label}</Text>
      </TouchableWithoutFeedback>
      <View style={[styles.container_input, isError ? styles.isError : null]}>
        <RichToolbar
          editor={richText}
          style={styles.toolbar}
          actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
        />

        <RichEditor
          initialHeight={150}
          initialContentHTML={value}
          ref={richText}
          editorStyle={styles.input}
          placeholder={placeholder}
          onChange={onChange}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputRichEditor;
