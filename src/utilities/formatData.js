export function formatDate(date) {
  // ex: '2022-06-26T09:40:15.270Z' --> '26 Juni 2022'
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  date = date.split('T')[0].split('-');
  return `${date[2]} ${months[parseInt(date[1]) - 1]} ${date[0]}`;
}

export function titleCase(str) {
  return str
    .toLowerCase()
    .split('-')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

const isLetter = (c) => c.toLowerCase() !== c.toUpperCase();

export function truncate(s) {
  s = s.replace(/\n/g, ' ');
  let justLetters = '';
  for (let i = 0; i < s.length; i++) {
    if (isLetter(s[i]) || s[i] === ' ' || s[i] === '-') {
      justLetters += s[i];
    }
  }
  return justLetters.slice(0, 100);
}
