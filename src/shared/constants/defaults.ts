import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const expensesLog = [
  {
    id: nanoid(16),
    devLog: false,
    amount: 0,
    addedAt: dayjs(),
  }
];

export {
  expensesLog
};
