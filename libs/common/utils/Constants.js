export const MESSAGES = {
    success: 'Operación exitosa',
    sesionSuccess: 'Sesión Iniciada',
    successCreate: 'Registro exitoso',
    badRequest: 'El envío de la información no se pudo completar',
    dataIncorrect: 'Usuario o contraseña incorrecta',
    Unauthorized: 'Perfil no autorizado',
    sesionExpire: 'Sesion Expirada',
    notFound: 'Registro no encontrado',
    notCreate: 'Esta información fue registrada previamente',
    incorrectPassword: 'contraseña Incorrecta',
    incorrectUserName: 'Usuario Incorrecto',
    numberIdDuplicate: 'Cedula ya se encuentra registrada',
    emialDuplicate: 'Correo ya se encuentra registrado',
    errorServe: 'Internal Server Error',
    notDisableCategory: 'No se puede deshabilitar esta categoria',
    carAdd: 'Producto agregado satisfactorimente',
}

export const STATUS = {
    incorrectUserName: 401,
    incorrectPassword: 401,
    success: 200,
    sesionSuccess: 200,
    successCreate: 201,
    badRequest: 400,
    dataIncorrect: 401,
    Unauthorized: 403,
    notFound: 404,
    notCreate: 409,
    numberIdDuplicate: 409,
    emialDuplicate: 409,
    errorServe: 500,
    incorrectPasswordConfirmation: 401,
    notDisableCategory: 401,
    notDisableCategory: 401,
    carAdd: 200
}

export const VALIDATESCHEMA = {
    required: "campo requerido",
    maxLength: "campo no cumple con el maximo de caracteres",
    minLength: "campo no cumple con el minimo de caracteres",
    boolean: "campo debe ser true o false'",
    array: "campo debe ser un array",
    sizeImage: "Tamano de la imagen incorrecto",
    UserDuplicate: "Usuario ya se encuentra registrado",
    EmailDuplicate: "Correo ya se encuentra registrado",
    numberIdDuplicate: 'Cédula  ya se encuentra registrada',
    incorrectPasswordConfirmation: 'Contraseña y confimacion de contraseña no coinciden',
    incorrectPasswordOld: 'Contraseña no coinciden con la ya registrada',
    decimal: 'Campo debe ser decimal',
    numerico: 'Campo debe ser numerico'
}