import dayjs from 'dayjs';

export const formatDate = (date: Date) => {
    return dayjs(date).format('DD/MM/YYYY');
};


// export default formatDate;


// export const extractValues = (data: any) => {
//     var names = data.map( (item: any) => {
//       return item['shipped_city'];
//     });
//     return names
//   }

//   export default extractValues;

