import { compareDesc } from 'date-fns';
const Sorter = (() => {

    const sortByDate = (tasks) => {
        return tasks.sort((a, b) => { return compareDesc(new Date(a.dueDate), new Date(b.dueDate)) });
    };

    return { sortByDate };

})();
export default Sorter;