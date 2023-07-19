/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  NativeModules,
} from 'react-native';

import { I18nProvider } from '@lingui/react';
import { i18n } from "@lingui/core";
import { messages as enMessages } from "./src/locales/en/messages";
import { messages as ptBRMessages } from "./src/locales/pt_BR/messages";
import { messages as enUSMessages } from "./src/locales/en_US/messages";
import { MainFrame } from './MainFrame';

i18n.load({ "en": enMessages, "pt_BR": ptBRMessages, "en_US": enUSMessages });
const locale = NativeModules.I18nManager.localeIdentifier;
i18n.activate(locale);

const App = () => <I18nProvider i18n={i18n}>
  <MainFrame />
</I18nProvider>;

export default App;