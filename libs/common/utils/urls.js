export const URLS = {
  version: '/version',
  login: '/login',
  //users
  userCreate: '/user/create',
  userEdit: '/user/edit',
  userDisabled: '/user/disabled/:id',
  userActive: '/user/active/:id',
  userPasswordChange: '/user/password/change',
  userPasswordRecovery: '/user/password/recovery',
  getAllUser: '/user/getalluser',
  getOneUser: '/user/getoneuser/:id',
  validateUser: '/user/validate',
  //ruta para publicaciones
  createPublication: '/publication/create',
  getPublications: '/publication/getpublications',
  getAllPublications: '/publication/getall/publications',
  disabledPublications: '/publication/disabled/publications/:id',
  activePublications: '/publication/active/publications/:id',
  editPublications: '/publication/edit/publications',
  getOnePublications: '/publication/getone/publications/:id',
  deleteImagen: '/publication/deleteimagen/:id',
  //ruta para notify
  getOneNotify: '/notify/getone/notify/:id',
  getAllNotificationsUser: '/notify/getall/notify/User',
  disabledNotify: '/notify/disabled/notify/:id',
  //ruta para notify
  addCars: '/car/create',
  getAllCarsUser: '/car/getall/car/User',
}