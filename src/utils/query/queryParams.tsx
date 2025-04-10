function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function flattenParams(params: Record<string, any>): Record<string, any> {
  const flattened: Record<string, any> = {};

  for (const key in params) {
    const value = params[key];

    // 배열이면 key 반복
    if (Array.isArray(value)) {
      value.forEach((v: any, index: number) => {
        if (!flattened[key]) {
          flattened[key] = [];
        }
        flattened[key].push(v);
      });
    }
    // 중첩 객체 (ex: contractPeriod: { minYear, maxMonth })
    else if (value && typeof value === 'object') {
      for (const subKey in value) {
        flattened[`${key}${capitalize(subKey)}`] = value[subKey];
      }
    }
    // 일반 값
    else {
      flattened[key] = value;
    }
  }

  return flattened;
}
