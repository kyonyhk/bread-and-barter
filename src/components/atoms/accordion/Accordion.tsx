'use client';

import type { Assign } from '@ark-ui/react';
import { Accordion as ArkAccordion } from '@ark-ui/react/accordion';
import { accordion, type AccordionVariantProps } from 'styled-system/recipes';
import type { JsxStyleProps } from 'styled-system/types';
import { createStyleContext } from '~/lib/create-style-context';

const { withProvider, withContext } = createStyleContext(accordion);

export interface RootProps
  extends Assign<JsxStyleProps, ArkAccordion.RootProps>,
    AccordionVariantProps {}

const Root = withProvider<HTMLDivElement, RootProps>(ArkAccordion.Root, 'root');

const ItemContent = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ArkAccordion.ItemContentProps>
>(ArkAccordion.ItemContent, 'itemContent');

const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ArkAccordion.ItemIndicatorProps>
>(ArkAccordion.ItemIndicator, 'itemIndicator');

const Item = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, ArkAccordion.ItemProps>
>(ArkAccordion.Item, 'item');

const ItemTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, ArkAccordion.ItemTriggerProps>
>(ArkAccordion.ItemTrigger, 'itemTrigger');

const AccordionComponents = {
  Root,
  Item,
  ItemContent,
  ItemIndicator,
  ItemTrigger,
};

export default AccordionComponents;

export {
  AccordionContext as Context,
  AccordionItemContext as ItemContext,
  type AccordionContextProps as ContextProps,
  type AccordionItemContextProps as ItemContextProps,
} from '@ark-ui/react/accordion';

export type {
  AccordionFocusChangeDetails as FocusChangeDetails,
  AccordionValueChangeDetails as ValueChangeDetails,
} from '@ark-ui/react/accordion';
