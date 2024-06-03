import {
  styled,
  HTMLStyledProps,
} from '../../../../@shadow/panda/styled-system/jsx';
import { textarea } from '../../../../@shadow/panda/styled-system/recipes';

export const TextArea = styled('textarea', textarea);
export type TextAreaProps = HTMLStyledProps<typeof TextArea>;
