function classesBlock(filename: string) {
    return !!filename.match(/\.(jpg|jpeg|png)$/);
}

function classes(filename: string) {
    return !!filename.match(/\.(jpg|jpeg|png)$/);
}

const filters = {
    classesBlock,
    classes,
};

export default filters;
