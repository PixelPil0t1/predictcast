export function validateEventTitle(title: string): string | null {
  if (!title || title.trim().length === 0) {
    return 'Назва події обов\'язкова';
  }
  if (title.length < 10) {
    return 'Назва повинна містити мінімум 10 символів';
  }
  if (title.length > 200) {
    return 'Назва занадто довга (макс. 200 символів)';
  }
  return null;
}

export function validateOptions(options: string[]): string | null {
  if (!options || options.length < 2) {
    return 'Додайте мінімум 2 варіанти відповіді';
  }
  if (options.length > 10) {
    return 'Максимум 10 варіантів відповіді';
  }
  const emptyOptions = options.filter(o => !o.trim());
  if (emptyOptions.length > 0) {
    return 'Всі варіанти повинні містити текст';
  }
  return null;
}

export function validateClosingDate(timestamp: number): string | null {
  const now = Date.now();
  const minFuture = now + 60 * 60 * 1000; // Мінімум 1 година
  const maxFuture = now + 365 * 24 * 60 * 60 * 1000; // Максимум 1 рік
  
  if (timestamp < minFuture) {
    return 'Подія повинна закритися мінімум через 1 годину';
  }
  if (timestamp > maxFuture) {
    return 'Подія не може тривати більше року';
  }
  return null;
}

