import test from 'node:test';
import assert from 'node:assert/strict';
import { contactPayload, validateContact } from '../src/utils/contactForm.js';

const valid = { name: 'Agustín', email: 'persona@example.com', message: 'Consulta sobre una oportunidad de QA.' };

test('rechaza nombre y mensaje compuestos solo por espacios', () => {
  const errors = validateContact({ ...valid, name: '   ', message: '\n\t ' });
  assert.ok(errors.name);
  assert.ok(errors.message);
  assert.equal(errors.email, undefined);
});

test('rechaza email inválido y entradas que exceden los límites', () => {
  for (const email of ['sin-arroba', 'a@', 'a@dominio', 'a b@example.com']) assert.ok(validateContact({ ...valid, email }).email);
  assert.ok(validateContact({ ...valid, name: 'a'.repeat(101) }).name);
  assert.ok(validateContact({ ...valid, message: 'a'.repeat(5001) }).message);
});

test('acepta límites válidos y prepara el envío sin mutar el formulario', () => {
  assert.deepEqual(validateContact({ ...valid, name: 'a'.repeat(100), message: 'a'.repeat(5000) }), {});
  const form = { name: '  Ana  ', email: ' ana@example.com ', message: ' Hola equipo. ', _gotcha: '' };
  assert.deepEqual(validateContact(form), {});
  assert.deepEqual(contactPayload(form), { name: 'Ana', email: 'ana@example.com', message: 'Hola equipo.' });
  assert.equal(form.name, '  Ana  ');
});
