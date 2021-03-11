import {IpcMainEvent} from 'electron';
import { IpcRequest } from './IpcRequestInterface';

export interface IpcChannelInterface {
  getName(): string;

  handle(event: IpcMainEvent, request: IpcRequest): void;

  listen(): void;
}

