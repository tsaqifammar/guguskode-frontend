
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
    'Desember'
  ];
  date = date.split('T')[0].split('-');
  return `${date[2]} ${months[parseInt(date[1]) - 1]} ${date[0]}`;
}
