export function validateEventTitle(title: string): string | null {
  if (!title || title.trim().length === 0) {
    return 'Event title is required';
  }
  if (title.length < 10) {
    return 'Title must be at least 10 characters';
  }
  if (title.length > 200) {
    return 'Title is too long (max 200 characters)';
  }
  return null;
}

export function validateOptions(options: string[]): string | null {
  if (!options || options.length < 2) {
    return 'Add at least 2 answer options';
  }
  if (options.length > 10) {
    return 'Maximum 10 answer options';
  }
  const emptyOptions = options.filter(o => !o.trim());
  if (emptyOptions.length > 0) {
    return 'All options must contain text';
  }
  return null;
}

export function validateClosingDate(timestamp: number): string | null {
  const now = Date.now();
  const minFuture = now + 60 * 60 * 1000; // Minimum 1 hour
  const maxFuture = now + 365 * 24 * 60 * 60 * 1000; // Maximum 1 year
  
  if (timestamp < minFuture) {
    return 'Event must close at least 1 hour in the future';
  }
  if (timestamp > maxFuture) {
    return 'Event cannot last more than 1 year';
  }
  return null;
}

