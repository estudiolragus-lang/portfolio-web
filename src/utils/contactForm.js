export function validateContact(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Escribí tu nombre, sin dejar el campo vacío.';
  else if (form.name.length > 100) errors.name = 'Usá hasta 100 caracteres para el nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Escribí un email válido para que pueda responderte.';
  else if (form.email.length > 254) errors.email = 'El email es demasiado largo.';
  if (!form.message.trim()) errors.message = 'Contame brevemente sobre la búsqueda o el proyecto.';
  else if (form.message.length > 5000) errors.message = 'Usá hasta 5000 caracteres para el mensaje.';
  return errors;
}

export const contactPayload = form => ({ name: form.name.trim(), email: form.email.trim(), message: form.message.trim() });
