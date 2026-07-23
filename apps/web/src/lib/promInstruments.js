// Patient-Reported Outcome Measures (PROMs).
// Each instrument defines its questions and a scoring function that returns
// { score, max, percent, interpretation }. Scores are computed client-side and
// stored via POST /prom-responses.

const band = (v, bands) => bands.find((b) => v <= b.max)?.label ?? bands[bands.length - 1].label;

// Numeric Pain Rating Scale (0–10).
const NPRS = {
  id: 'nprs',
  name: 'Pain Rating (NPRS)',
  short: 'NPRS',
  region: 'General',
  description: 'Rate your current pain from 0 (no pain) to 10 (worst imaginable).',
  estMinutes: 1,
  questions: [
    {
      text: 'What is your pain level right now?',
      options: Array.from({ length: 11 }, (_, i) => ({ label: String(i), value: i })),
    },
  ],
  score(answers) {
    const score = answers[0] ?? 0;
    return {
      score,
      max: 10,
      percent: (score / 10) * 100,
      interpretation: band(score, [
        { max: 0, label: 'No pain' },
        { max: 3, label: 'Mild pain' },
        { max: 6, label: 'Moderate pain' },
        { max: 10, label: 'Severe pain' },
      ]),
    };
  },
};

// Oswestry Disability Index (ODI) — 10 sections, 0–5 each, reported as %.
const ODI_SECTIONS = [
  ['Pain intensity', ['No pain', 'Very mild pain', 'Moderate pain', 'Fairly severe pain', 'Very severe pain', 'Worst imaginable pain']],
  ['Personal care (washing, dressing)', ['Normal, no extra pain', 'Normal but painful', 'Slow and careful due to pain', 'Need some help', 'Need help most days', 'Cannot do, stay in bed']],
  ['Lifting', ['Can lift heavy weights, no pain', 'Heavy weights but painful', 'Pain stops heavy lifting from floor', 'Only light–medium if well placed', 'Only very light weights', 'Cannot lift or carry anything']],
  ['Walking', ['Any distance, no pain', 'Pain limits to over 1.5 km', 'Limits to under 800 m', 'Limits to under 400 m', 'Only with a stick/crutch', 'In bed most of the time']],
  ['Sitting', ['Any chair as long as I like', 'Only my favourite chair', 'Pain limits to 1 hour', 'Limits to under 30 min', 'Limits to under 10 min', 'Pain prevents sitting at all']],
  ['Standing', ['As long as I want, no pain', 'As long as I want but painful', 'Pain limits to 1 hour', 'Limits to under 30 min', 'Limits to under 10 min', 'Pain prevents standing at all']],
  ['Sleeping', ['Never disturbed by pain', 'Occasionally disturbed', 'Under 6 hours of sleep', 'Under 4 hours', 'Under 2 hours', 'Pain prevents sleep entirely']],
  ['Sex life (if applicable)', ['Normal, no pain', 'Normal but painful', 'Nearly normal, very painful', 'Severely restricted', 'Nearly absent', 'Prevented entirely']],
  ['Social life', ['Normal, no pain', 'Normal but increases pain', 'No effect apart from energetic activities', 'Restricted, go out less', 'Restricted to home', 'No social life due to pain']],
  ['Travelling', ['Anywhere, no pain', 'Anywhere but painful', 'Pain limits journeys over 2 hours', 'Limits to under 1 hour', 'Limits to short necessary trips under 30 min', 'Only to receive treatment']],
];

const ODI = {
  id: 'odi',
  name: 'Oswestry Disability Index',
  short: 'ODI',
  region: 'Lower back',
  description: 'How your back or leg pain affects daily activities. 10 short sections.',
  estMinutes: 5,
  questions: ODI_SECTIONS.map(([text, opts]) => ({
    text,
    options: opts.map((label, value) => ({ label, value })),
  })),
  score(answers) {
    const answered = answers.filter((a) => a != null);
    const sum = answered.reduce((s, a) => s + a, 0);
    const max = answered.length * 5 || 50;
    const percent = max ? Math.round((sum / max) * 100) : 0;
    return {
      score: percent,
      max: 100,
      percent,
      interpretation: band(percent, [
        { max: 20, label: 'Minimal disability' },
        { max: 40, label: 'Moderate disability' },
        { max: 60, label: 'Severe disability' },
        { max: 80, label: 'Crippled' },
        { max: 100, label: 'Bed-bound / exaggerated' },
      ]),
    };
  },
};

export const INSTRUMENTS = [NPRS, ODI];

export const getInstrument = (id) => INSTRUMENTS.find((i) => i.id === id);

// Lower is better for all instruments here (pain / disability).
export const isLowerBetter = () => true;
