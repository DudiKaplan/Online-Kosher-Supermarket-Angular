import { ActionType } from './action-type';

// Action for performing some operation on the data
export interface IAction {
    type: ActionType,
    payload?: any
}