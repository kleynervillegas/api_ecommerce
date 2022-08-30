import ModelNotifications from '../models/Notifications.js'
export const createNotification = async (
    active = false,
    publication,
    id_user_origin,
    description,
    origin,
    first_notify = null
) => {

    const nofitysave = {
        publication_id: (active) ? null : publication.id,
        user_id: (active) ? null : publication.user_id,
        user_origin_id: (active) ? null : id_user_origin,
        description: (active) ? description : description + ' ' + publication.name,
        send_user: false,
        origin: origin,
        first_notify: first_notify,
        view_notify: false,
    }

    const notification = await ModelNotifications.create(nofitysave)
    
    return notification
}