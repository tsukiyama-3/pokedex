// 表示用の名前をフォーマットする
export const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
