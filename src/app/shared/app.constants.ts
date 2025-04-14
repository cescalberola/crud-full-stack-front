export const CONFIRM_MESSAGES = {
  DELETE_CUSTOMER: '¿Estás seguro de que quieres eliminar este cliente?',
};

export const BUTTON_LABELS = {
  CONFIRM: 'Sí',
  CANCEL: 'Cancelar',
  CREATE: 'Crear',
  UPDATE: 'Actualizar',
  BACK: '← Volver a la lista',
};

export const ALERT_MESSAGES = {
  CREATE_SUCCESS: 'Cliente creado con éxito',
  CREATE_ERROR: 'Error al crear cliente',
  UPDATE_SUCCESS: 'Cliente actualizado con éxito',
  UPDATE_ERROR: 'Error al actualizar cliente',
  DELETE_SUCCESS: 'Cliente eliminado con éxito',
  DELETE_ERROR: 'Error al eliminar cliente',
};

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type AlertType = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];
