const test = require('node:test');
const assert = require('node:assert/strict');

const { validateFullName, validateEmail, validateMessage } = require('../script.js');

test('valida nome completo com nome e sobrenome', () => {
  assert.equal(validateFullName(''), 'Digite seu nome completo.');
  assert.equal(validateFullName('Maria'), 'Digite seu nome completo (nome e sobrenome).');
  assert.equal(validateFullName('João S'), 'Cada parte do nome deve ter pelo menos 2 letras (ex: Maria Souza).');
  assert.equal(validateFullName('Maria Souza'), '');
});

test('valida e-mail com formato correto', () => {
  assert.equal(validateEmail(''), 'Digite seu e-mail.');
  assert.equal(validateEmail('maria@teste'), 'Digite um e-mail válido (ex: joao@gmail.com).');
  assert.equal(validateEmail('maria@teste.com'), '');
});

test('valida mensagem com tamanho e obrigatoriedade', () => {
  assert.equal(validateMessage(''), 'Escreva sua mensagem antes de enviar.');
  assert.equal(validateMessage('curta'), 'Sua mensagem está muito curta. Conte um pouco mais.');
  const longMessage = 'a'.repeat(501);
  assert.equal(validateMessage(longMessage), 'Sua mensagem passou do limite de 500 caracteres.');
  assert.equal(validateMessage('Mensagem com conteúdo suficiente para passar.'), '');
});
