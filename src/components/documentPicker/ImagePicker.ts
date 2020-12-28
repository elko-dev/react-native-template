import DocumentPicker from 'react-native-document-picker';
import { filesUriPicker, fileUriPicker } from './PickerRoot';
import Log from '../../utilities/Logger';
export const ImagePicker = async (): Promise<string | undefined> => {
  // Pick a single file
  return await fileUriPicker({ type: [DocumentPicker.types.images] });
};
export const ImagesPicker = async (): Promise<string[] | undefined> => {
  // Pick multiple files
  return await filesUriPicker({ type: [DocumentPicker.types.images] }).catch((e:Error)=>Log.err(e));
};