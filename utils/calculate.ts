// 上限値に対するパーセントを返す
export const calculatePercentage = (value: number, max: number = 255): number => {
  return (value / max) * 100
}
