export class ColumnDateTransformer {
  to(data: Date | null): Date | null {
    return data;
  }
  from(data: Date | null): Date | null | string {
    if (data === null) {
      return data;
    }

    return new Date(
      data.getTime() - data.getTimezoneOffset() * 60000,
    ).toISOString();
  }
}

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

export function isNumber(val: string | number): boolean {
  return val === +val;
}
