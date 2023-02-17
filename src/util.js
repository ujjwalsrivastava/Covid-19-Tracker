export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a,b)=> (a.cases>b.cases ? -1 : 1));        //comparing the first two data
    return sortedData;
}