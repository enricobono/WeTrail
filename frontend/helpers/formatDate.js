import moment from 'moment';

export default function formatDate(value) {
  if (value === undefined) {
    return ''
  }

  return moment(String(value)).format('Do MMM YYYY')
}
