'use client';
import { createContext } from 'react';
import { BoardContextType } from './boardTypes';

const boardContext = createContext<BoardContextType | null>(null);

export default boardContext;