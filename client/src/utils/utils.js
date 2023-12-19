export const APP_HOST = process.env.APP_HOST || 'localhost';
export const APP_PORT = process.env.APP_PORT || 3001;

export const HOST =
  APP_PORT === 80 || process.env.NODE_ENV === 'production'
    ? `http://${APP_HOST}`
    : `http://${APP_HOST}:${APP_PORT}`;

export const moneyFormatter = (price, narrow = true) => {
  return price.toLocaleString('es-do', {
    style: 'currency',
    currency: 'DOP',
    currencyDisplay: narrow ? 'narrowSymbol' : 'symbol',
  });
};

export const getQRUrl = (token) => `${HOST}/verificar?token=${token}`;
export const regExPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,16}$/;

export const generateEmbedUrl = (googleMapsLink) => {
  // Extraer el identificador de la ubicación del enlace de Google Maps
  const match = googleMapsLink.match(/@([0-9.-]+,[0-9.-]+,[0-9z]+)/);
  if (match && match[1]) {
    // Construir y retornar el URL de incrustación
    return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!${match[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`;
  } else {
    // Retornar null o lanzar un error si el formato del enlace no es el esperado
    return null;
  }
}
