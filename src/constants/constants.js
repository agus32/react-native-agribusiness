
export const fechaParser = (fecha) => {
  const date = new Date(fecha);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

  export const Verde = "#abc051";
  export const Azul = "#1a6fb7";


  export const getInitials = (fullName) => {
    const names = fullName.split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase()).join('');
    return initials;
  };
