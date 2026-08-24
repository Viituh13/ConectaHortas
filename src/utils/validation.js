export function validateFullName(value) {
  if (!value) return 'Digite seu nome completo.';
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return 'Digite seu nome completo (nome e sobrenome).';
  if (words.some((word) => word.length < 2 || !/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(word))) return 'Cada parte do nome deve ter pelo menos 2 letras (ex: Maria Souza).';
  return '';
}
export function validateEmail(value) {
  if (!value) return 'Digite seu e-mail.';
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(value) ? '' : 'Digite um e-mail válido (ex: joao@gmail.com).';
}
export function validateMessage(value) {
  if (!value) return 'Escreva sua mensagem antes de enviar.';
  if (value.length < 10) return 'Sua mensagem está muito curta. Conte um pouco mais.';
  if (value.length > 500) return 'Sua mensagem passou do limite de 500 caracteres.';
  return '';
}