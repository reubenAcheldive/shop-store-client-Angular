import { createAction, props } from '@ngrx/store';
import { Iuser } from 'src/app/InterfaceModal/user';
import { IUserInformation } from 'src/app/InterfaceModal/userInformation';



export const loginInit =
 createAction('[User] before user Login', props<{userName: string, password: string}>());

export const loginByJwt = createAction('[User] Login By JWT', props<{jwt: string}>());

export const loginInitSuccess = createAction(
  '[User] Login User Success',
  props<{ infoLogin: IUserInformation }>()
);

export const loginInitFailure = createAction(
  '[User] Login User Failure',
  props<{ error: any }>()
);

export const checkRegisterInit = createAction(
  '[User] lode start check register',props<{id:string}>()
);
export const checkRegisterSuccess = createAction(
  '[User] lode check register Success',
  props<{ success: boolean }>()
);
export const checkRegisterFailure = createAction(
  '[User] lode check register failure',
  props<{ error: any }>()
);

export const registerUserInit = createAction('[User] lode start full register',props<{data:Iuser}>()
);
export const registerUserSuccess = createAction(
  '[User] lode full register Success',
  props<{ infoLogin: IUserInformation }>()
);
export const registerUserFailure = createAction(
  '[User] lode full  register failure',
  props<{ error: any }>()
);
