import React from 'react';
import Services from '.';
import config from '@src/config';

/**
 * Контекст для Services
 * @type {React.Context<Services>}
 */
export const ServicesContext = React.createContext<Services>(new Services(config));
