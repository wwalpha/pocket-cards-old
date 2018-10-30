
export const isEmpty = (value: any) => value === undefined || value === null || value === '';

export const isNotEmpty = (value: any) => !isEmpty(value);
