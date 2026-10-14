// City slugs stay predictable and URL-safe, including Polish letters and separators.
export function slugify(value: string): string {
  const polishLetters: Record<string, string> = {
    ą: 'a',
    ć: 'c',
    ę: 'e',
    ł: 'l',
    ń: 'n',
    ó: 'o',
    ś: 's',
    ź: 'z',
    ż: 'z',
  };

  return value
    .toLocaleLowerCase('pl')
    .replace(/[ąćęłńóśźż]/g, (letter) => polishLetters[letter] ?? letter)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const silesianCities = [
  'Będzin',
  'Bielsko-Biała',
  'Bieruń',
  'Blachownia',
  'Bytom',
  'Chorzów',
  'Cieszyn',
  'Czechowice-Dziedzice',
  'Czeladź',
  'Czerwionka-Leszczyny',
  'Dąbrowa Górnicza',
  'Gliwice',
  'Imielin',
  'Jaworzno',
  'Kalety',
  'Katowice',
  'Kłobuck',
  'Knurów',
  'Koniecpol',
  'Krzepice',
  'Kuźnia Raciborska',
  'Lubliniec',
  'Łaziska Górne',
  'Miasteczko Śląskie',
  'Mikołów',
  'Mysłowice',
  'Myszków',
  'Orzesze',
  'Piekary Śląskie',
  'Pszczyna',
  'Pszów',
  'Pyskowice',
  'Racibórz',
  'Radlin',
  'Ruda Śląska',
  'Rybnik',
  'Rydułtowy',
  'Siemianowice Śląskie',
  'Skoczów',
  'Sławków',
  'Sośnicowice',
  'Strumień',
  'Szczyrk',
  'Świętochłowice',
  'Tarnowskie Góry',
  'Tychy',
  'Ustroń',
  'Wodzisław Śląski',
  'Wojkowice',
  'Woźniki',
  'Zabrze',
  'Żarki',
  'Żory',
  'Żywiec',
];

const nationalCities = [
  'Warszawa',
  'Łódź',
  'Wrocław',
  'Poznań',
  'Gdańsk',
  'Gdynia',
  'Kraków',
  'Rzeszów',
  'Radom',
];

export const cities = [
  ...silesianCities.map((name) => ({ name, slug: slugify(name), region: 'slask' as const })),
  ...nationalCities.map((name) => ({ name, slug: slugify(name), region: 'polska' as const })),
];
