import assert from 'assert';

/**
 * Represents a movie record.
 */
type Movie = {
  title: string;
  year: number;
  cast: string[];
};

/**
 * Embedded movies dataset.
 */
const movies: Movie[] = [
  {
    title: 'The Lego Batman Movie',
    year: 2017,
    cast: ['Will Arnett', 'Michael Cera', 'Rosario Dawson'],
  },
  {
    title: 'Fifty Shades Darker',
    year: 2017,
    cast: ['Dakota Johnson', 'Jamie Dornan'],
  },
  {
    title: 'John Wick: Chapter 2',
    year: 2017,
    cast: ['Keanu Reeves', 'Common'],
  },
  {
    title: 'Avengers: Infinity War',
    year: 2018,
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
  },
  {
    title: 'Black Panther',
    year: 2018,
    cast: ['Chadwick Boseman', 'Michael B. Jordan'],
  },
];

/**
 * Returns an array of all actor names appearing in the movies dataset.
 * Duplicate actor names are removed.
 *
 * @param movies - Array of movie objects
 * @returns Array of unique actor names
 */
export function getAllActorNames(movies: Movie[]): string[] {
  return [...new Set(movies.flatMap((movie) => movie.cast))];
}

/**
 * Groups movie titles by their release year.
 * Only the first three movies per year are included.
 *
 * @param movies - Array of movie objects
 * @returns Object where keys are years and values are arrays of movie titles
 */
function getMoviesByYear(movies: Movie[]): Record<string, string[]> {
  return movies.reduce(
    (acc, movie) => {
      const yearKey = String(movie.year);

      if (!acc[yearKey]) {
        acc[yearKey] = [];
      }

      if (acc[yearKey].length < 3) {
        acc[yearKey].push(movie.title);
      }

      return acc;
    },
    {} as Record<string, string[]>
  );
}

const grouped = getMoviesByYear(movies);

assert.strictEqual(grouped['2017'].length, 3);
assert(grouped['2017'].includes('John Wick: Chapter 2'));

assert.strictEqual(grouped['2018'].length, 2);
