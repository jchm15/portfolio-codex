import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDateKST = (dateString: string): string => {
  return dayjs(dateString).tz('Asia/Seoul').format('YYYY-MM-DD');
};

export default formatDateKST;
