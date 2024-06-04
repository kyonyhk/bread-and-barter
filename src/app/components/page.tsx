'use client';

import { css } from '../../../styled-system/css';
import Tag from '@repo/components/atoms/tags/Tag';
import ButtonSmall from '@repo/components/atoms/buttons/ButtonSmall';
import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import ButtonNoBorder from '@repo/components/atoms/buttons/ButtonNoBorder';
import {
  UpArrow,
  DownArrow,
  LeftArrow,
  RightArrow,
  Minus,
  Plus,
  Cancel,
  Check,
  FilledStar,
  Star,
  Preview,
  Edit,
  Save,
  Delete,
  FileDownload,
  Folder,
  Play,
  Upload,
} from '@repo/components/atoms/icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/components/atoms/select/Select';
import { TextArea } from '@repo/components/atoms/textarea/TextArea';
import { HStack } from '../../../styled-system/jsx';
import { Input } from '@repo/components/atoms/input/Input';

export default function Home() {
  return (
    <div
      className={css({
        w: 'full',
        h: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '40px',
      })}
    >
      <div
        className={css({
          color: 'white',
          textStyle: 'heading4',
        })}
      >
        Icons
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        {/* Icons Row 1 */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          })}
        >
          <Minus
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Plus
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Cancel
            className={css({
              stroke: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Check
            className={css({
              stroke: 'yellow100',
              w: '24px',
              h: '24px',
            })}
          />
          <FilledStar
            className={css({
              stroke: 'yellow100',
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Star
            className={css({
              stroke: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Preview
            className={css({
              stroke: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Edit
            className={css({
              stroke: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
        </div>

        {/* Icons Row 2 */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          })}
        >
          <UpArrow
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <DownArrow
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <RightArrow
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <LeftArrow
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Save
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Delete
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <FileDownload
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Folder
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
        </div>

        {/* Icons Row 3 */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
          })}
        >
          <Upload
            className={css({
              fill: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
          <Play
            className={css({
              fill: 'yellow100',
              stroke: 'yellow100',
              h: '24px',
              w: '24px',
            })}
          />
        </div>
      </div>

      {/* Components */}
      <div
        className={css({
          color: 'white',
          textStyle: 'heading4',
        })}
      >
        Components
      </div>

      <HStack className={css({ justifyContent: 'space-between', gap: '40px' })}>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          <Tag>Editing</Tag>

          {/* Button No Border */}
          <ButtonNoBorder>
            <Plus
              className={css({
                fill: 'yellow100',
                h: '24px',
                w: '24px',
              })}
            />
            Add Timeslot
          </ButtonNoBorder>

          {/* Small Button */}
          <ButtonSmall>Small</ButtonSmall>

          {/* Medium Button */}
          <ButtonMedium>
            Medium
            <RightArrow
              className={css({
                fill: 'yellow100',
                h: '24px',
                w: '24px',
              })}
            />
          </ButtonMedium>

          {/* Large Button */}
          <ButtonLarge>
            Large
            <RightArrow
              className={css({
                fill: 'yellow100',
                h: '24px',
                w: '24px',
              })}
            />
          </ButtonLarge>

          {/* No Icon Button */}
          <ButtonLarge>Large</ButtonLarge>
        </div>

        {/* Components Column 2 */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          {/* Input Dropdown */}
          <Select>
            <SelectTrigger
              w="360px"
              className={css({
                color: 'altyellow',
                borderColor: 'yellow20',
                bg: 'yellow5',
                borderRadius: '20px',
                _focus: {
                  borderColor: 'yellow100',
                  bg: 'yellow5',
                },
              })}
            >
              <SelectValue placeholder="2 hours" />
            </SelectTrigger>
            <SelectContent
              className={css({
                bg: 'yellow5',
                borderColor: 'yellow20',
                borderRadius: '20px',
                color: 'altyellow',
                backdropFilter: 'blur(4px)', // Add the backdrop filter for the blur effect
              })}
            >
              <SelectItem
                value="60min"
                className={css({
                  _hover: { bg: 'yellow10', color: 'yellow100' },
                })}
              >
                1 hour
              </SelectItem>
              <SelectItem
                value="90min"
                className={css({
                  _hover: { bg: 'yellow10', color: 'yellow100' },
                })}
              >
                1.5 hours
              </SelectItem>
              <SelectItem
                value="120min"
                className={css({
                  _hover: { bg: 'yellow10', color: 'yellow100' },
                })}
              >
                2 hours
              </SelectItem>
            </SelectContent>
          </Select>

          {/* TextArea */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            })}
          >
            <TextArea
              placeholder="Type your message here."
              className={css({
                textStyle: 'paragraph2',
                borderColor: 'yellow20',
                borderWidth: '1px',
                borderRadius: '16px',
                padding: '16px',
                bg: 'yellow5',
                h: '100px',
                w: '560px',
                color: 'altyellow',
              })}
            />
            <div
              className={css({
                textStyle: 'paragraph4',
                color: 'altyellow',
                opacity: 0.5,
              })}
            >
              Maximum 200 characters.
            </div>
          </div>

          <Input
            className={css({
              bg: 'yellow5',
              borderColor: 'yellow20',
              borderRadius: '16px',
              padding: '8px 16px',
              color: 'altyellow',
              textStyle: 'paragraph2',
              _active: {
                borderColor: 'yellow100',
              },
            })}
          />
        </div>
      </HStack>
    </div>
  );
}
