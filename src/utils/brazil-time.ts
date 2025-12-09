/**
 * Essa função transforma a hora de agora de UTC para UTC-3
 *
 * @returns Date
 */

const brazilTimeNow = () => {
  const dataUTC = new Date();
  const dataLocal = dataUTC.toLocaleDateString();
  const horaLocal = dataUTC.toLocaleTimeString();
  const miliSegundos = dataUTC.getMilliseconds();
  const [dia, mes, ano] = dataLocal.split('/');

  const horaBr = new Date(`${ano}-${mes}-${dia}T${horaLocal}.${miliSegundos}Z`);
  return horaBr;
};

export default brazilTimeNow;
