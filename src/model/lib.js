export const parseTable = (data) => {
    const values = data.reduce((memo, item) => {
        const [region, year, count] = item;
        if (!year) return memo;

        if (memo[region]) memo[region][year] = count
        else memo[region] = {[year]: count}

        return memo
    }, {});
    const list = Object.entries(values).map(([key, value]) => ({ region: key, ...value}));
    const headers = Object.keys(list[0]).sort((a, b) => b.localeCompare(a))

    return ({
        headers, list
    })
};

export const parseGraph = (data) => {
    let maxCount = 0;
    let maxRegion = '';

    const obj = data.reduce((memo, item) => {
        const [region, year, count] = item;
        if (!year) return memo;

        if (Number(count) > maxCount) {
            maxCount = Number(count);
            maxRegion = region
        };

        if (memo[year]) memo[year][region] = count
        else memo[year] = {year, [region]: count}

        return memo
    }, {});

    return {
        parsedData: Object.values(obj),
        maxData: maxRegion
    }
};

export const parseLastYear = (data) => data.reduce((memo, item) => {
    const [region, year, count] = item;
    if (year === '2023') memo[region] = count;

    return memo
}, {});
